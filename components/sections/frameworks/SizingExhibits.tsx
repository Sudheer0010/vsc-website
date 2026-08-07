/**
 * Five exhibits for the Sizing framework page. All HTML/CSS, not SVG —
 * every exhibit here is a card or a table, not a spatial diagram, so real
 * HTML reflows and reads better than SVG text (which doesn't wrap). The
 * previous version's converging-arrows diagram (three inputs merging into
 * one box) was cut in the simplification pass: the three questions it
 * illustrated are now the hero exhibit itself, stated directly rather
 * than diagrammed.
 */

/* ------------------------------------------------------------------ */
/* 1. Three Questions — hero. The whole framework at a glance, before    */
/*    any math appears. Parallel, not sequential — no arrows between     */
/*    the three questions.                                              */
/* ------------------------------------------------------------------ */

const THREE_QUESTIONS: { n: number; question: string }[] = [
  { n: 1, question: "Can I afford the risk?" },
  { n: 2, question: "Does this setup deserve that much capital?" },
  { n: 3, question: "Do I still have room in the portfolio?" },
];

export function ThreeQuestionsExhibit() {
  return (
    <div className="rounded-vsc-xl border border-rule bg-canvas-sunk p-6 sm:p-10">
      <div className="flex flex-col gap-6 sm:gap-7">
        {THREE_QUESTIONS.map((item) => (
          <div key={item.n} className="flex items-start gap-4">
            <span className="font-mono text-[15px] font-bold text-growth">{item.n}.</span>
            <div>
              <p className="text-[19px] leading-snug text-ink sm:text-[21px]">{item.question}</p>
              <p className="mt-1.5 font-mono text-[12px] text-ink-faint">→ a maximum size</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t border-rule-strong pt-6 text-center sm:mt-10 sm:pt-7">
        <span className="font-mono text-[16px] font-bold uppercase tracking-[0.06em] text-growth sm:text-[18px]">
          The Smallest Number Wins
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. The Stop Determines The Size — a table with a bar behind each     */
/*    position-size figure, proportional to its value. Demoted from     */
/*    hero; now sits under question 1.                                  */
/* ------------------------------------------------------------------ */

const STOP_SIZE_ROWS: { stop: string; size: number; label: string }[] = [
  { stop: "2%", size: 50, label: "50%" },
  { stop: "3%", size: 33, label: "33%" },
  { stop: "4%", size: 25, label: "25%" },
  { stop: "6%", size: 17, label: "17%" },
  { stop: "8%", size: 12.5, label: "12.5%" },
];
const MAX_SIZE = 50;

export function StopSizeExhibit() {
  return (
    <div className="rounded-vsc-xl border border-rule bg-canvas-sunk p-6 sm:p-8">
      <span className="block font-mono text-[13px] font-bold uppercase tracking-[0.06em] text-ink">
        The Stop Determines The Size
      </span>

      <div className="mt-6 flex items-center justify-between border-b border-rule-strong pb-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
          Stop distance
        </span>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
          Position size
        </span>
      </div>

      <div className="flex flex-col">
        {STOP_SIZE_ROWS.map((row, i) => (
          <div
            key={row.stop}
            className={`flex items-center justify-between py-3 ${i > 0 ? "border-t border-rule" : ""}`}
          >
            <span className="font-mono text-[18px] font-semibold text-ink">{row.stop}</span>
            <div className="relative flex h-9 min-w-[150px] items-center justify-end overflow-hidden rounded-vsc-sm">
              <div
                className="absolute inset-y-0 right-0 bg-growth-tint"
                style={{ width: `${(row.size / MAX_SIZE) * 100}%` }}
                aria-hidden="true"
              />
              <span className="relative z-10 pr-3 font-mono text-[18px] font-bold text-growth">
                {row.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-[13px] text-ink">
        Position size = risk budget ÷ stop distance
      </p>
      <p className="mt-2 font-mono text-[11px] italic text-ink-faint">
        Illustrated at 1% account risk per trade.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Grade Ceilings — three cards, HTML.                               */
/* ------------------------------------------------------------------ */

const GRADE_CEILINGS: { grade: "A" | "B" | "C"; name: string; pct: string }[] = [
  { grade: "A", name: "Exceptional", pct: "25%" },
  { grade: "B", name: "Strong", pct: "15%" },
  { grade: "C", name: "Acceptable", pct: "10%" },
];

export function GradeCeilingsExhibit() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {GRADE_CEILINGS.map((g) => {
        const isA = g.grade === "A";
        const isB = g.grade === "B";
        return (
          <div
            key={g.grade}
            className={`overflow-hidden rounded-vsc-lg border ${
              isA ? "border-growth" : isB ? "border-growth/30" : "border-rule"
            }`}
          >
            <div className={`px-5 py-3 text-center ${isA ? "bg-growth" : isB ? "bg-growth-tint" : "bg-canvas-sunk"}`}>
              <span
                className={`font-mono text-[20px] font-bold ${
                  isA ? "text-canvas" : isB ? "text-growth" : "text-ink"
                }`}
              >
                {g.grade}
              </span>
            </div>
            <div
              className={`flex flex-col items-center gap-1 px-5 py-6 text-center ${
                isA || isB ? "bg-growth-tint" : "bg-canvas-sunk"
              }`}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">{g.name}</span>
              <span className="mt-2 font-mono text-[28px] font-bold text-ink">≤ {g.pct}</span>
              <span className="font-mono text-[11px] text-ink-faint">of account</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Environment Risk Budget — a small linking table, HTML.            */
/* ------------------------------------------------------------------ */

const RISK_BUDGET_ROWS: { env: string; pct: string; tone: "growth" | "cream" | "clay" }[] = [
  { env: "Aggressive", pct: "6%", tone: "growth" },
  { env: "Neutral", pct: "4%", tone: "cream" },
  { env: "Defensive", pct: "2%", tone: "clay" },
];

export function EnvironmentRiskBudgetExhibit() {
  return (
    <div className="rounded-vsc-xl border border-rule bg-canvas-sunk p-6 sm:p-8">
      <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-ink">
        <span>Market Environment</span>
        <span className="text-ink-faint" aria-hidden="true">→</span>
        <span>Max Aggregate Open Risk</span>
      </div>

      <div className="flex flex-col gap-2">
        {RISK_BUDGET_ROWS.map((row) => (
          <div
            key={row.env}
            className={`flex items-center justify-between rounded-vsc-md px-4 py-3 ${
              row.tone === "growth" ? "bg-growth-tint" : row.tone === "clay" ? "bg-clay-tint" : "bg-canvas"
            }`}
          >
            <span className="text-[15px] text-ink">{row.env}</span>
            <span className="font-mono text-[18px] font-bold text-ink">{row.pct}</span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[13px] italic leading-relaxed text-ink-faint">
        Aggregate open risk = the sum of what every open position loses if every stop is
        hit.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. The Smallest Number Wins — three worked-example cards, HTML.      */
/* ------------------------------------------------------------------ */

interface WorkedExampleRow {
  label: string;
  value: string;
  binding: boolean;
}

interface WorkedExample {
  header: string;
  rows: WorkedExampleRow[];
  final: string;
}

const WORKED_EXAMPLES: WorkedExample[] = [
  {
    header: "A-grade setup · 8% stop · aggressive market",
    rows: [
      { label: "Can I afford it", value: "12.5%", binding: true },
      { label: "Does it deserve it", value: "25%", binding: false },
      { label: "Is there room", value: "25%", binding: false },
    ],
    final: "12.5%",
  },
  {
    header: "C-grade setup · 2% stop · aggressive market",
    rows: [
      { label: "Can I afford it", value: "50%", binding: false },
      { label: "Does it deserve it", value: "10%", binding: true },
      { label: "Is there room", value: "25%", binding: false },
    ],
    final: "10%",
  },
  {
    header: "A-grade setup · 3% stop · defensive market",
    rows: [
      { label: "Can I afford it", value: "33%", binding: false },
      { label: "Does it deserve it", value: "25%", binding: false },
      { label: "Is there room", value: "6%", binding: true },
    ],
    final: "6%",
  },
];

function WorkedExampleCard({ example }: { example: WorkedExample }) {
  return (
    <div className="rounded-vsc-lg border border-rule bg-canvas-sunk p-6">
      <span className="block font-mono text-[11px] leading-relaxed text-ink-faint">{example.header}</span>
      <div className="mt-5 flex flex-col gap-2.5">
        {example.rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3">
            <span className={`text-[14px] ${row.binding ? "font-semibold text-growth" : "text-ink-faint"}`}>
              {row.label}
            </span>
            <span
              className={`flex shrink-0 items-center gap-1.5 font-mono text-[14px] ${
                row.binding ? "font-bold text-growth" : "text-ink-faint"
              }`}
            >
              {row.value}
              {row.binding && <span aria-hidden="true">←</span>}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-rule pt-4">
        <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-ink-faint">Final</span>
        <span className="font-mono text-[24px] font-bold text-growth">{example.final}</span>
      </div>
    </div>
  );
}

export function SmallestNumberWinsExhibit() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {WORKED_EXAMPLES.map((ex) => (
        <WorkedExampleCard key={ex.header} example={ex} />
      ))}
    </div>
  );
}
