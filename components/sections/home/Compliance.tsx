import React from "react";

export function Compliance() {
  return (
    <section id="compliance" className="w-full py-10 bg-[#060810]/40 border-t border-white/5 select-none z-10 text-center">
      <div className="container max-w-[1200px] px-6">
        <div className="max-w-[850px] mx-auto flex flex-col gap-4 text-center">
          <p className="font-mono text-[10px] text-white/30 leading-relaxed max-w-[700px] mx-auto">
            VSC Capital & Advisory is currently in the process of applying for SEBI Research Analyst (RA) registration. Until registration is granted, all content, execution setups, and communications are strictly for educational and research purposes only. Nothing on this platform constitutes personalized investment advice or a solicitation to buy or sell any securities.
          </p>
          <div className="font-mono text-[9px] text-accent-gold/45 tracking-[0.15em] uppercase font-semibold">
            MSME REGISTERED: UDYAM-AP-17-0067701 (NIC: 66190)
          </div>
        </div>
      </div>
    </section>
  );
}
