"use client";

import React, { useEffect } from "react";
import { marketLetters } from "@/data/market-letters";

interface MarketLetterModalProps {
  isOpen: boolean;
  monthKey: string;
  onClose: () => void;
}

export default function MarketLetterModal({
  isOpen,
  monthKey,
  onClose,
}: MarketLetterModalProps) {
  const letter = marketLetters[monthKey];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !letter) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay active"
      id="marketLetterModal"
      onClick={handleOverlayClick}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close Modal">
          &times;
        </button>
        <div id="marketLetterContent">
          <div className="market-letter-header">
            <div className="header-pre">{letter.year} RESEARCH ARCHIVES</div>
            <h2>{letter.month} REPORT</h2>
          </div>

          {/* Metrics Row */}
          <div className="market-letter-metrics">
            {Object.keys(letter.metrics).map((key) => {
              const value = letter.metrics[key];
              const isMarketType = key === "Market Type";
              const isLoss = value.includes("-");
              
              let classNames = "metric-card-value";
              if (isMarketType) classNames += " market-type";
              else if (isLoss) classNames += " loss";

              return (
                <div className="metric-card" key={key}>
                  <div className="metric-card-label">{key}</div>
                  <div className={classNames}>{value}</div>
                </div>
              );
            })}
          </div>

          {/* Two-Column Grid */}
          <div className="market-letter-grid">
            {/* Column 1: Context & Outlook */}
            <div className="market-letter-col">
              {letter.sections["Market Environment"] && (
                <div className="market-letter-section">
                  <div className="market-letter-section-title">Market Environment</div>
                  <div className="market-letter-section-content">
                    {letter.sections["Market Environment"]}
                  </div>
                </div>
              )}
              {letter.sections["Looking Ahead"] && (
                <div className="market-letter-section">
                  <div className="market-letter-section-title">Looking Ahead</div>
                  <div className="market-letter-section-content">
                    {letter.sections["Looking Ahead"]}
                  </div>
                </div>
              )}
            </div>

            {/* Column 2: Execution & Adjustments */}
            <div className="market-letter-col">
              {letter.sections["What Worked"] && (
                <div className="market-letter-section">
                  <div className="market-letter-section-title">What Worked</div>
                  <div className="market-letter-section-content">
                    <ul>
                      {letter.sections["What Worked"].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {letter.sections["Adjustment"] && (
                <div className="market-letter-section">
                  <div className="market-letter-section-title">Tactical Adjustment</div>
                  <div className="market-letter-section-content">
                    {letter.sections["Adjustment"]}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
