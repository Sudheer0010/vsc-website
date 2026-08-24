"use client";

import { useMemo, useState } from "react";

const DEFAULTS = {
  entry: "1000",
  stop: "950",
  target: "1150",
  quantity: "100",
};

function formatINR(value: number, decimals = 0) {
  return `₹${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

function formatNumber(value: number) {
  return Number(value).toLocaleString("en-IN");
}

function formatPct(value: number) {
  return `${Number(value).toFixed(1)}%`;
}

function clampPos(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type Result =
  | { state: "empty"; message: string }
  | {
      state: "ready";
      entry: number;
      stop: number;
      target: number;
      risk: number;
      reward: number;
      ratio: number;
      breakeven: number;
      stopPct: number;
      rewardPct: number;
      entryPos: number;
      hasQty: boolean;
      quantity: number | null;
      plannedRisk: number | null;
      potentialReward: number | null;
    };

export function RiskRewardCalculator() {
  const [entry, setEntry] = useState(DEFAULTS.entry);
  const [stop, setStop] = useState(DEFAULTS.stop);
  const [target, setTarget] = useState(DEFAULTS.target);
  const [quantity, setQuantity] = useState(DEFAULTS.quantity);

  const E = Number.parseFloat(entry);
  const S = Number.parseFloat(stop);
  const T = Number.parseFloat(target);
  const qRaw = quantity.trim();
  const Q = qRaw === "" ? null : Number(qRaw);

  const stopInvalid = Number.isFinite(E) && Number.isFinite(S) && S >= E;
  const targetInvalid = Number.isFinite(E) && Number.isFinite(T) && T <= E;
  const qtyInvalid = qRaw !== "" && (!Number.isFinite(Q) || Q === null || Q <= 0 || !Number.isInteger(Q));

  const result = useMemo<Result>(() => {
    const baseValid = E > 0 && S > 0 && T > 0 && !stopInvalid && !targetInvalid;

    if (!baseValid) {
      return { state: "empty", message: "Enter valid trade levels to calculate the payoff structure." };
    }

    const risk = E - S;
    const reward = T - E;
    const ratio = reward / risk;
    const breakeven = 100 / (1 + ratio);
    const stopPct = (risk / E) * 100;
    const rewardPct = (reward / E) * 100;
    const total = risk + reward;
    const entryPos = clampPos((risk / total) * 100, 8, 92);
    const hasQty = Q !== null && !qtyInvalid;

    return {
      state: "ready",
      entry: E,
      stop: S,
      target: T,
      risk,
      reward,
      ratio,
      breakeven,
      stopPct,
      rewardPct,
      entryPos,
      hasQty,
      quantity: hasQty ? Q : null,
      plannedRisk: hasQty ? risk * (Q as number) : null,
      potentialReward: hasQty ? reward * (Q as number) : null,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [E, S, T, Q, stopInvalid, targetInvalid, qtyInvalid]);

  const loadExample = () => {
    setEntry(DEFAULTS.entry);
    setStop(DEFAULTS.stop);
    setTarget(DEFAULTS.target);
    setQuantity(DEFAULTS.quantity);
  };

  const clearAll = () => {
    setEntry("");
    setStop("");
    setTarget("");
    setQuantity("");
  };

  const inputClass =
    "w-full min-w-0 appearance-none bg-transparent font-ui text-[16px] font-medium text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
  const inputWrapClass =
    "flex min-h-12 items-center gap-2 rounded-vsc-lg border border-rule bg-surface-warm px-4 py-3 transition-[border-color,box-shadow] duration-150 focus-within:border-growth focus-within:shadow-[0_0_0_3px_rgba(15,122,64,0.08)]";

  const priceLabel = (value: number) => formatINR(value, value % 1 ? 2 : 0);

  return (
    <section aria-label="VSC risk reward ratio calculator" className="overflow-hidden rounded-vsc-xl border border-rule bg-surface shadow-lift-2">
      <div className="grid lg:grid-cols-[0.93fr_1.07fr]">
        <div className="border-b border-rule p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <p className="mb-5 text-[13px] font-semibold text-ink-faint">Trade parameters</p>

          <div className="space-y-5">
            <div>
              <label htmlFor="rr-entry" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Planned entry price
              </label>
              <div className={inputWrapClass}>
                <span className="shrink-0 text-[15px] font-medium text-ink-faint">₹</span>
                <input
                  id="rr-entry"
                  className={inputClass}
                  type="number"
                  min="0.01"
                  step="0.01"
                  inputMode="decimal"
                  value={entry}
                  onChange={(event) => setEntry(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="rr-stop" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Planned stop-loss
              </label>
              <div className={inputWrapClass}>
                <span className="shrink-0 text-[15px] font-medium text-ink-faint">₹</span>
                <input
                  id="rr-stop"
                  className={inputClass}
                  type="number"
                  min="0.01"
                  step="0.01"
                  inputMode="decimal"
                  value={stop}
                  aria-describedby="rr-stop-help rr-stop-error"
                  aria-invalid={stopInvalid}
                  onChange={(event) => setStop(event.target.value)}
                />
              </div>
              <p id="rr-stop-help" className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                For a long equity trade, the stop must be below the entry.
              </p>
              {stopInvalid && (
                <p id="rr-stop-error" className="mt-1.5 text-[13px] text-clay">
                  Stop-loss must be below the planned entry.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="rr-target" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Planned target
              </label>
              <div className={inputWrapClass}>
                <span className="shrink-0 text-[15px] font-medium text-ink-faint">₹</span>
                <input
                  id="rr-target"
                  className={inputClass}
                  type="number"
                  min="0.01"
                  step="0.01"
                  inputMode="decimal"
                  value={target}
                  aria-describedby="rr-target-help rr-target-error"
                  aria-invalid={targetInvalid}
                  onChange={(event) => setTarget(event.target.value)}
                />
              </div>
              <p id="rr-target-help" className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                For this long-equity calculator, the target must be above the entry.
              </p>
              {targetInvalid && (
                <p id="rr-target-error" className="mt-1.5 text-[13px] text-clay">
                  Target must be above the planned entry.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="rr-quantity" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Quantity <span className="font-normal text-ink-faint">— optional</span>
              </label>
              <div className={inputWrapClass}>
                <input
                  id="rr-quantity"
                  className={inputClass}
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  placeholder="e.g. 100"
                  value={quantity}
                  aria-describedby="rr-qty-help rr-qty-error"
                  aria-invalid={qtyInvalid}
                  onChange={(event) => setQuantity(event.target.value)}
                />
              </div>
              <p id="rr-qty-help" className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                Add whole shares to see planned rupee risk and potential reward.
              </p>
              {qtyInvalid && (
                <p id="rr-qty-error" className="mt-1.5 text-[13px] text-clay">
                  Quantity must be a positive whole number.
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-5">
            <button type="button" onClick={loadExample} className="min-h-11 text-[14px] font-semibold text-growth hover:text-growth-deep">
              Load example
            </button>
            <button type="button" onClick={clearAll} className="min-h-11 text-[14px] font-semibold text-ink-muted hover:text-ink">
              Clear
            </button>
          </div>
        </div>

        <div className="flex min-h-full flex-col p-5 sm:p-7" aria-live="polite">
          <div className="mb-2 flex items-start justify-between gap-4">
            <p className="text-[13px] font-semibold text-ink-faint">Payoff structure</p>
            <span className="rounded-full bg-growth-tint px-2.5 py-1 text-[12px] font-semibold text-growth">Long equity</span>
          </div>

          {result.state === "empty" ? (
            <p className="py-3 text-[15px] text-ink-faint">{result.message}</p>
          ) : (
            <>
              <p className="text-[14px] text-ink-muted">Reward : Risk</p>
              <div className="mt-1 flex items-baseline gap-2">
                <strong className="font-display text-[44px] font-semibold leading-none tracking-[-0.04em] text-growth sm:text-[52px]">
                  {result.ratio.toFixed(2)}
                </strong>
                <span className="text-[16px] font-medium text-ink-muted">: 1</span>
              </div>
              <p className="mt-2 max-w-[520px] text-[13px] text-ink-faint">
                This ratio describes the planned payoff structure — not the probability of reaching the target.
              </p>

              <div className="my-5 grid grid-cols-3 gap-x-4 gap-y-4 border-y border-rule py-5">
                <Metric label="Risk / share" value={formatINR(result.risk, 2)} tone="clay" />
                <Metric label="Reward / share" value={formatINR(result.reward, 2)} tone="growth" />
                <Metric label="Breakeven win rate*" value={formatPct(result.breakeven)} />
              </div>

              {result.hasQty && (
                <div className="mb-5 grid grid-cols-2 gap-x-4 gap-y-3 rounded-vsc-md border border-rule bg-surface-warm p-4">
                  <p className="col-span-2 text-[11px] font-semibold text-ink-faint">
                    At {formatNumber(result.quantity as number)} {result.quantity === 1 ? "share" : "shares"}
                  </p>
                  <div>
                    <div className="text-[12px] text-ink-faint">Planned risk at stop</div>
                    <div className="mt-0.5 text-[15px] font-semibold text-clay">{formatINR(result.plannedRisk as number)}</div>
                  </div>
                  <div>
                    <div className="text-[12px] text-ink-faint">Potential reward at target</div>
                    <div className="mt-0.5 text-[15px] font-semibold text-growth">{formatINR(result.potentialReward as number)}</div>
                  </div>
                </div>
              )}

              <div className="mt-1">
                <p className="mb-2.5 text-[12px] text-ink-faint">Price map</p>
                <div className="relative mx-0.5 h-[66px]">
                  <div className="absolute inset-x-0 top-[34px] h-1.5 rounded-full bg-rule" aria-hidden="true" />
                  <div
                    className="absolute top-[34px] h-1.5 rounded-l-full bg-clay"
                    style={{ width: `${result.entryPos}%` }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute top-[34px] h-1.5 rounded-r-full bg-growth"
                    style={{ left: `${result.entryPos}%`, width: `${100 - result.entryPos}%` }}
                    aria-hidden="true"
                  />
                  <div className="absolute left-0 top-[19px] h-[35px] w-px bg-rule-strong" aria-hidden="true" />
                  <div
                    className="absolute top-[15px] h-[43px] w-px -translate-x-1/2 bg-ink"
                    style={{ left: `${result.entryPos}%` }}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 top-[19px] h-[35px] w-px bg-rule-strong" aria-hidden="true" />

                  <div className="absolute left-0 top-0 whitespace-nowrap text-[11px] text-ink-faint">
                    <strong className="block text-[12px] font-semibold text-clay">{priceLabel(result.stop)}</strong>
                    STOP
                  </div>
                  <div
                    className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[11px] text-ink-faint"
                    style={{ left: `${result.entryPos}%` }}
                  >
                    <strong className="block text-[12px] font-semibold text-ink">{priceLabel(result.entry)}</strong>
                    ENTRY
                  </div>
                  <div className="absolute right-0 top-0 -translate-x-full whitespace-nowrap text-right text-[11px] text-ink-faint">
                    <strong className="block text-[12px] font-semibold text-growth">{priceLabel(result.target)}</strong>
                    TARGET
                  </div>
                </div>
                <div className="mt-0.5 grid grid-cols-2 gap-3 text-[11px] text-ink-faint">
                  <span>
                    <strong className="font-semibold text-ink-muted">{formatINR(result.risk, 2)} risk</strong> · {formatPct(result.stopPct)} below entry
                  </span>
                  <span className="text-right">
                    <strong className="font-semibold text-ink-muted">{formatINR(result.reward, 2)} reward</strong> · {formatPct(result.rewardPct)} above entry
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "clay" | "growth";
}) {
  return (
    <div>
      <div className="mb-0.5 text-[12px] text-ink-faint">{label}</div>
      <div className={`text-[16px] font-semibold ${tone === "clay" ? "text-clay" : tone === "growth" ? "text-growth" : "text-ink"}`}>{value}</div>
    </div>
  );
}
