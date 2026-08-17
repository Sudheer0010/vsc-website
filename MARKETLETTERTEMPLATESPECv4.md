# VSC Market Letter — Template Spec v4 (FINAL)

**Reference build:** Letter 007 — July 2026 (thesis: *"Healthy indices. Weak opportunity."*)

**Status:** v4 — locked pending build. Three corrections from v3: What Changed derivation split; Header regime-tag logic aligned with example; duplicate `marketEnvironment` canonical field removed. Companion document: `MARKET-LETTER-DATA-DICTIONARY-v1.0.md`.

---

## Design philosophy

| Reading mode | Duration | Sections used | Purpose |
|---|---|---|---|
| **Skim** | 10 seconds | Header + Snapshot + Market Health | *"What kind of market was July?"* |
| **Read** | 3 minutes | + What Changed + What Happened + Chart | *"What changed and why?"* |
| **Study** | 5 minutes | + VSC Read + Playbook + Month in Review + Watching Next | *"How did VSC interpret and position?"* |

Visual target: **60–70% cards / numbers / charts / status chips. 30–40% written prose.** Editorial identity: monthly market publication with a VSC interpretation layer — not a personal journal with market context. VSC's own P&L and trades appear late.

---

## The ten sections (final order)

```
01  HEADER                    Month + thesis + regime tags
02  MARKET SNAPSHOT           Nifty · Gold · Silver · Crude · USD/INR
03  MARKET HEALTH             Trend · Breadth · Leadership · Breakouts · Volatility · Overall
04  WHAT CHANGED              June → July — market factors + VSC posture (both derived)
05  WHAT HAPPENED             Index · Breadth · Leadership · Flows/Risk
06  ONE CHART THAT MATTERS    0–1 chart
07  VSC READ                  Framework diagnosis + conclusion
08  VSC PLAYBOOK              Diagnosis → action
09  VSC MONTH IN REVIEW       Return · Trades · Worked · Didn't · Lesson
10  WATCHING NEXT             Conditions → response
```

---

## Section 01 — Header

**Purpose:** In one glance, the month, the letter number, the thesis, and the regime.

**Structure:**
```
Eyebrow:          JULY 2026 — MARKET LETTER 007         (mono)
Thesis:           Healthy indices. Weak opportunity.    (large sans, primary heading)
Sub-thesis:       [one sentence, ≤ 22 words]
Regime tags:      [MARKET REGIME]  [KEY MARKET CONDITION]  [VSC POSTURE]
Meta:             Letter 007 · Data through 31 Jul 2026 · X min read
```

**Word ceilings:**
- Thesis: ≤ 6 words, two short clauses fine.
- Sub-thesis: ≤ 22 words, one sentence only.
- Regime tags: ≤ 2 words each, all-caps mono, always exactly 3.

**Regime tag derivation — three deliberately different layers:**

| Tag | Represents | Canonical source |
|---|---|---|
| Tag 1 | **Market regime** | `overallEnvironment.label` verbatim |
| Tag 2 | **Key market condition** (editorial highlight) | Author's choice from `marketHealth`, typically the factor most responsible for the regime call |
| Tag 3 | **VSC posture** | `playbook.exposure` verbatim (translated to tag format: "Reduced" → "REDUCED EXPOSURE") |

Rationale: three tags each carry a different kind of information (the market's state, the key mechanism, VSC's response). Auto-selecting two "most-changed factors" for tags 2 and 3 would produce a header that reads as data, not diagnosis.

**Letter 007 example:**
```
JULY 2026 — MARKET LETTER 007

Healthy indices. Weak opportunity.

The index remained resilient while breadth and breakout quality deteriorated
across the month.

[DEFENSIVE]   [NARROW BREADTH]   [REDUCED EXPOSURE]

Letter 007 · Data through 31 Jul 2026 · 4 min read
```

**Removed from current page:** oversized vertical padding above the title; the standalone thesis quote in the pale-green box (thesis merges into header).

---

## Section 02 — Market Snapshot

**Purpose:** In 10 seconds, where each major market ended, what it did, how VSC reads it.

**Structure:** 5 equal cards, horizontal row (desktop) / vertical stack (mobile). No 6th card — Volatility lives in Market Health.

Each card:
```
ASSET NAME                                (mono eyebrow, fixed vocabulary)
Month-end value                           (large sans)
▲ +X.X% MTD    ▲ +XX.X% YTD              (mono, coloured by direction)
Read: [1–3 word verdict]                  (small, accent-green)
```

**Fixed vocabulary — the five assets, in this order, never substituted:**
1. NIFTY 50
2. GOLD
3. SILVER
4. CRUDE
5. USD/INR

**Data basis:** all values are month-end snapshots. Exact benchmark, unit, and formula per asset locked in `MARKET-LETTER-DATA-DICTIONARY-v1.0.md § Market Data Methodology`.

**Letter 007 example (numbers placeholder — Sudheer to supply real month-end values):**

| Asset | Month-end | MTD | YTD | Read |
|---|---|---|---|---|
| NIFTY 50 | 24,xxx | ▲ 1.2% | ▲ x.x% | Resilient |
| GOLD | ₹xx,xxx | ▲ 3.1% | ▲ xx.x% | Strong |
| SILVER | ₹xx,xxx | ▲ 6.4% | ▲ xx.x% | Leadership |
| CRUDE | $xx.xx | ▼ 2.7% | ▼ x.x% | Cooling |
| USD/INR | xx.xxxx | ▲ 0.8% | ▲ x.x% | INR weaker |

**Removed from current page:** current 3-metric stats bar (Monthly Return / Trades Taken / Environment). Return + trades move to Section 09; environment absorbed into regime tags + Section 03.

---

## Section 03 — Market Health

**Purpose:** The distinctive intellectual core. A regular reader watches these five factors evolve month by month.

**Structure:** 5-row diagnostic panel + 1 overall row.

```
FACTOR              JULY               vs JUNE   VSC READ
Trend               🟢 Healthy         →         Index structure intact
Breadth             🟠 Narrow          ↓         Participation weakening
Leadership          🟠 Concentrated    ↓         Few sectors carrying market
Breakout Quality    🔴 Poor            ↓         Follow-through unreliable
Volatility          🟢 Controlled      →         No panic environment
──────────────────────────────────────────────────
Overall             DEFENSIVE          ↓         Protect capital
```

**Colour legend:** 🟢 Healthy / constructive · 🟠 Watchful / mixed · 🔴 Deteriorated / defensive.

**Arrows in "vs Prev" column:** `↑` improved · `→` unchanged · `↓` deteriorated · `↔` re-rated in different direction.

**Word ceilings:** current state ≤ 2 words · VSC Read ≤ 6 words per row.

**Fixed vocabulary — the five factors, in this order, never renamed:**
Trend · Breadth · Leadership · Breakout Quality · Volatility

**Data basis:** measurement rule and colour thresholds per factor locked in `MARKET-LETTER-DATA-DICTIONARY-v1.0.md § Part 2`.

**Override rendering rule:** if a letter's `environmentOverride` field is present, a small footnote appears under the Overall row: *"Overall re-rated from {from} to {to} — {reason}"*. Makes editorial overrides transparent and archivable.

**Removed from current page:** the "Framework Review" accordion is absorbed into this scorecard for new-template letters. Accordion continues to render for legacy letters until backfill completes.

---

## Section 04 — What Changed (June → July)

**Purpose:** The most powerful section for a repeat reader. Two things always change in different ways — what the market did, and what VSC did about it. This section shows both, deliberately separated.

**Structure — two blocks:**

**Block A — Market factors** (derived from current + previous `marketHealth`):

```
                       JUNE            JULY
Trend                  Healthy      →  Healthy
Breadth                Healthy      →  Narrow
Leadership             Broad        →  Concentrated
Breakout Quality       Strong       →  Poor
Volatility             Controlled   →  Controlled
```

Five rows always. Uses `marketHealth[].current` from both letters. Order matches Market Health section exactly.

**Block B — VSC posture** (derived from `vscRead.riskAllocation`):

```
VSC posture: Normal → Reduced
```

Single line. Uses `vscRead.riskAllocation` from both letters. Visually separated from Block A with vertical space and a subtle divider.

**Editorial line — the only stored content:**

```
Net change: The index changed very little. The opportunity environment
changed considerably.
```

**Word ceilings:** net change ≤ 30 words.

**Data model rule:** the two comparison blocks are **entirely derived at render time** from current + previous letter data. Only `netChange` is stored (editorial interpretation). This prevents any drift between stored comparison and stored source values.

**First-letter behaviour:** if no previous letter has `marketHealth`, the entire section skips. Becomes universally rendered once Letter 006 is backfilled.

**Removed from current page:** no equivalent section. Net new.

**Why the split matters:** it visually separates *what changed in the market* from *what VSC changed because of it*. A reader instantly sees causation, not correlation.

---

## Section 05 — What Happened

**Purpose:** Market narrative in scannable blocks, not paragraphs.

**Structure:** 4 blocks, 2×2 grid on desktop.

```
BLOCK LABEL             (mono eyebrow)
[Headline sentence]     (bold sans, ≤ 12 words)
[Explanation sentence]  (body, ≤ 25 words)
```

**Fixed vocabulary — four blocks, in this order:**
1. INDEX
2. BREADTH
3. LEADERSHIP
4. FLOWS / RISK

**Word ceilings:** headline ≤ 12 words · explanation ≤ 25 words · section total ≤ 150 words.

**Letter 007 example:**

**INDEX** — Headline resilience continued. / Nifty held up reasonably well despite weakness underneath the index.

**BREADTH** — Participation deteriorated. / Fewer stocks were sustaining breakouts and momentum became increasingly selective.

**LEADERSHIP** — Leadership remained narrow. / IT ↑ · Defence ↑ · Auto → · Metals ↓ · PSU Banks ↓

**FLOWS / RISK** — Risk appetite remained selective. / Institutional participation held; retail activity thinned into month-end.

**Removed from current page:** the current "What the market was doing" / "What I did about it" / "What I'm watching" prose blocks. Content redistributes into 05, 09, 10.

---

## Section 06 — One Chart That Matters

**Rule:** Maximum one thesis chart per letter. Use none if no chart materially improves the explanation. Never force a chart because the template expects one.

**Structure (when present):**
```
[Chart title]                             (mono, small, ≤ 8 words)
[The chart itself]                        (single image)
What matters: [interpretation sentence]   (accent-green pull line, ≤ 30 words)
```

**Chart delivery:**
- File-based: `/public/research/market-letters/YYYY-MM/chart.webp` (preferred), `.png`, or `.svg`.
- Data model references path only. No remote URLs. No inline SVG blobs in TypeScript.

**Letter 007 example:**
```
Chart title:   Nifty 50 vs % of stocks above 50DMA — July 2026

[chart at /public/research/market-letters/2026-07/chart.webp]

What matters:  The headline index remained stable while participation
               underneath it deteriorated — the setup for July's defensive stance.
```

---

## Section 07 — VSC Read

**Purpose:** How the VSC framework interpreted the month, six fixed dimensions.

**Structure:** 6-row panel + one highlighted conclusion in an accent-green pull box.

```
DIMENSION                 JULY READ
Market Environment        Defensive          ← derived from overallEnvironment.label
Opportunity Universe      Narrow
Setup Quality             Weak
Risk Allocation           Reduced
Trade Frequency           Reduced
Primary Objective         Preservation

Framework conclusion: An intact index trend did not justify normal exposure
when opportunity quality was deteriorating.
```

**Word ceiling:** conclusion ≤ 30 words, one sentence.

**Canonical source rule:**
- The **Market Environment** row is NOT stored on `vscRead`. It renders `overallEnvironment.label` verbatim. One truth, no possibility of contradiction.

**Locked vocabularies (final):**

| Dimension | Locked values |
|---|---|
| Market Environment | Favourable · Constructive · Neutral · Cautious · Defensive |
| Opportunity Universe | Broad · Normal · Narrow · Very Narrow |
| Setup Quality | Strong · Normal · Weak · Poor |
| Risk Allocation | Increased · Normal · Reduced · Minimal |
| Trade Frequency | High · Normal · Reduced · Low · None |
| Primary Objective | Growth · Balanced · Preservation |

Enforced by TypeScript literal unions (see Data Model below).

Measurement rule per value locked in `MARKET-LETTER-DATA-DICTIONARY-v1.0.md § Part 3`.

---

## Section 08 — VSC Playbook

**Purpose:** How the market read translated into behaviour. Teaches readers how conditions change action.

**Structure:** 6-row table.

```
JULY PLAYBOOK
Exposure                    Reduced
Position Size               Below normal
Trade Frequency             Reduced
Preferred Setup             High-quality relative-strength continuation
Avoided                     Marginal breakouts, weak sectors
Trigger to increase risk    Better breadth + breakout follow-through
```

**Word ceilings:** first three rows ≤ 3 words · preferred/avoided ≤ 8 words · trigger ≤ 12 words.

**Canonical sources:**
- `playbook.exposure` = single source for exposure. Regime tag 3 and Section 09 exposure stat both derive from it.
- `playbook.tradeFrequency` mirrors `vscRead.tradeFrequency` verbatim (derived at render, not stored twice).

---

## Section 09 — VSC Month in Review

**Purpose:** Only NOW does the letter turn to VSC's own performance.

**Structure:** compact stat tile + three micro-sections.

```
VSC — JULY

+5.82%              [n]                 Reduced           ← derived from playbook.exposure
Monthly Return      Trades              Exposure

Worked:    [one sentence, ≤ 20 words]
Didn't:    [one sentence, ≤ 20 words]
Lesson:    [one sentence, ≤ 25 words]
```

**Data model rule:** `exposure` in this tile is derived from `playbook.exposure`, not stored separately.

**Letter 007 example — trade count TBD:** the current live page shows "12 trades" — that's Letter 006's number. Sudheer to confirm the real July trade count.

---

## Section 10 — Watching Next

**Purpose:** Forward-looking without pretending to forecast.

**Structure:** 3–4 conditional lines + current-stance closer.

```
AUGUST CONDITIONS
Breadth expands                    →  more constructive
Breakout follow-through improves   →  increase participation
Leadership broadens                →  consider normal exposure
Conditions remain narrow           →  continue protecting capital

Current stance: Defensive until the evidence changes.
```

**Word ceilings:** condition (left) ≤ 8 words · response (right) ≤ 6 words · current stance ≤ 15 words.

---

## Total word budget per letter

| Section | Max words |
|---|---|
| 01 Header | 28 |
| 02 Snapshot (5 × "read") | 15 |
| 03 Market Health (6 × 6) | 36 |
| 04 What Changed (net change) | 30 |
| 05 What Happened (4 × 37) | 148 |
| 06 One Chart | 38 |
| 07 VSC Read (values + conclusion) | 48 |
| 08 Playbook (last three rows) | 28 |
| 09 Month in Review (worked+didn't+lesson) | 65 |
| 10 Watching Next | 71 |
| **Total prose budget** | **≈ 507 words** |

---

## Data model — TypeScript with literal unions

```ts
// Locked vocabularies — enforced at compile time.
type StatusColour = 'green' | 'amber' | 'red';
type ArrowDirection = 'up' | 'down' | 'flat' | 'rerated';

type MarketEnvironmentValue =
  | 'Favourable' | 'Constructive' | 'Neutral' | 'Cautious' | 'Defensive';

type OpportunityUniverseValue =
  | 'Broad' | 'Normal' | 'Narrow' | 'Very Narrow';

type SetupQualityValue =
  | 'Strong' | 'Normal' | 'Weak' | 'Poor';

type RiskAllocationValue =
  | 'Increased' | 'Normal' | 'Reduced' | 'Minimal';

type TradeFrequencyValue =
  | 'High' | 'Normal' | 'Reduced' | 'Low' | 'None';

type PrimaryObjectiveValue =
  | 'Growth' | 'Balanced' | 'Preservation';

type HealthFactor =
  'Trend' | 'Breadth' | 'Leadership' | 'Breakout Quality' | 'Volatility';

type SnapshotAsset =
  'NIFTY 50' | 'GOLD' | 'SILVER' | 'CRUDE' | 'USD/INR';

type MarketLetter = {
  // Existing fields (thesis, letterNumber, publishedDate, readTime, etc.) preserved.

  // Publication date handling
  publishedDate: string;                         // original publish date, preserved
  dataThrough?: string;                          // e.g. "2026-07-31" — for backfilled letters
  revisedDate?: string;                          // e.g. "2026-08-05" — present only if revised

  // 01 HEADER
  subThesis?: string;                            // ≤ 22 words, one sentence
  regimeTagEditorial?: string;                   // Tag 2 — author's choice (≤ 2 words)
  // Tag 1 derived from overallEnvironment.label
  // Tag 3 derived from playbook.exposure

  // 02 MARKET SNAPSHOT
  marketSnapshot?: {
    asset: SnapshotAsset;
    monthEnd: string;                            // formatted string incl. unit
    mtdPct: number;                              // percent, signed
    ytdPct: number;                              // percent, signed
    read: string;                                // ≤ 3 words
  }[];                                            // exactly 5, in fixed order

  // 03 MARKET HEALTH
  marketHealth?: {
    factor: HealthFactor;
    current: string;                             // ≤ 2 words
    status: StatusColour;
    vsPrev: ArrowDirection;
    vscRead: string;                             // ≤ 6 words
  }[];                                            // exactly 5
  overallEnvironment?: {
    label: MarketEnvironmentValue;               // canonical source for regime
    vsPrev: ArrowDirection;
    vscRead: string;                             // ≤ 6 words
  };
  environmentOverride?: {                        // present only when Sudheer manually overrides heuristic
    from: MarketEnvironmentValue;
    to: MarketEnvironmentValue;
    reason: string;                              // ≤ 25 words, single sentence
  };

  // 04 WHAT CHANGED
  // Both comparison blocks are DERIVED from current + previous letter.
  // Nothing about the comparison itself is stored.
  netChange?: string;                            // ≤ 30 words — editorial only

  // 05 WHAT HAPPENED
  whatHappened?: {
    index: { headline: string; explanation: string };
    breadth: { headline: string; explanation: string };
    leadership: { headline: string; explanation: string };
    flowsRisk: { headline: string; explanation: string };
  };

  // 06 ONE CHART (optional)
  chart?: {
    title: string;                               // ≤ 8 words
    image: string;                               // absolute path under /public
    caption: string;                             // ≤ 30 words
  };

  // 07 VSC READ — NOTE: marketEnvironment is NOT here. It renders from overallEnvironment.label.
  vscRead?: {
    opportunityUniverse: OpportunityUniverseValue;
    setupQuality: SetupQualityValue;
    riskAllocation: RiskAllocationValue;         // canonical source, used by Section 04 Block B
    tradeFrequency: TradeFrequencyValue;         // canonical source, mirrored in playbook
    primaryObjective: PrimaryObjectiveValue;
    conclusion: string;                          // ≤ 30 words
  };

  // 08 VSC PLAYBOOK
  playbook?: {
    exposure: string;                            // canonical exposure source
    positionSize: string;
    // tradeFrequency mirrors vscRead.tradeFrequency — NOT stored.
    preferredSetup: string;                      // ≤ 8 words
    avoided: string;                             // ≤ 8 words
    triggerToIncreaseRisk: string;               // ≤ 12 words
  };

  // 09 VSC MONTH IN REVIEW
  monthInReview?: {
    monthlyReturn: string;                       // e.g. "+5.82%"
    trades: number;
    // exposure mirrors playbook.exposure — NOT stored.
    worked: string;                              // ≤ 20 words
    didnt: string;                               // ≤ 20 words
    lesson: string;                              // ≤ 25 words
  };

  // 10 WATCHING NEXT
  watchingNext?: {
    conditions: { if: string; then: string }[]; // 3–4 entries
    currentStance: string;                       // ≤ 15 words
  };
};
```

---

## Canonical sources — summary

| Concept | Canonical field | Displays elsewhere as |
|---|---|---|
| Market regime | `overallEnvironment.label` | Section 01 tag 1, Section 07 Market Environment row |
| Exposure | `playbook.exposure` | Section 01 tag 3, Section 09 exposure stat |
| Trade Frequency | `vscRead.tradeFrequency` | Section 08 tradeFrequency row |
| Risk Allocation | `vscRead.riskAllocation` | Section 04 VSC posture line |
| June/July comparison | current + previous `marketHealth` | Section 04 Block A table |
| Environment override | `environmentOverride` (when present) | Section 03 footnote under Overall row |

Every downstream display reads from the canonical source. Zero possibility of two stored fields contradicting each other.

---

## Publication date handling

**New letters (008 onward):** publish after month closes. Cadence: first 2–4 days of the following month.

**Historical rewrites (Letters 001–007 backfill):**
- Preserve original `publishedDate`.
- Add `dataThrough` and (if revised) `revisedDate`.
- Meta line renders: `Letter 007 · Data through 31 Jul 2026 · Revised Aug 2026 · X min read`.
- If no `revisedDate`: `Letter 007 · Published 24 Jul 2026 · X min read` (current behaviour).

Never falsify the original publish date. Always signal when a letter was rewritten to a new template.

---

## What gets removed from the current Letter 007 page

| Removed | Why |
|---|---|
| Oversized vertical padding above title | Header compresses per Section 01 |
| Standalone thesis quote (pale-green box) | Thesis merges into header |
| Current 3-column stats bar at top | Return + trades move to Section 09; environment into regime tags + Section 03 |
| Framework Review accordion (already conditional) | Absorbed into Sections 03 + 07 for new-template letters; still renders for legacy |
| Freeform "What the market was doing" | Replaced by Section 05 blocks |
| Freeform "What I did about it" | Split between Sections 08 and 09 |
| Freeform "What I'm watching" | Replaced by Section 10 conditional list |

**Preserved:** top-left `← Back to Research` link · previous/next letter nav · read-time auto-recalculation · footer, nav, all other pages.

---

## Historical backfill sequence

**07 → 06 → 05 → 04 → 03 → 02 → 01.** Newest to oldest.

Rationale: 07 validates the visual system; 06 tests the June→July derivation (both letters need `marketHealth`); older letters get progressively easier as the pattern matures. Do not delay 007 build waiting for backfill.

Framework Review accordion: keep conditional render throughout backfill. Once all seven letters carry `marketHealth`, delete the accordion component and compatibility branch in a cleanup PR.

---

## Trap to avoid

Once the scaffold exists, the temptation is to keep adding metrics: FII/DII flows, VIX subseries, S&P daily, Nasdaq, dollar index, bond yields, sector PE, advance/decline, market-cap breadth. Every one is defensibly interesting. Together they build a cockpit.

**Test before adding any metric:**
> *Does knowing this help the reader understand the Indian market regime this month?*

If not obvious yes, cut it. Additions displace, they don't accumulate.

---

## Build sequence (once spec approved and dictionary locked)

1. **Data model additions + literal unions** — one commit.
2. **New letter template component** with fallback rule — one commit.
3. **Letter 007 real content** — Sudheer writes; Claude Code renders — one commit.
4. **Visual polish pass** — spacing, cards, chip colours, chart treatment — one commit.
5. **Backfill Letter 006** — enables June→July derivation, becomes second reference letter — one commit.

Each is a review point. Nothing merges until Letter 007 renders end-to-end and reads correctly.
