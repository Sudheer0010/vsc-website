# VSC Market Letter — Data Dictionary v1.0

**Companion to:** `MARKET-LETTER-TEMPLATE-SPEC-v4.md`

**Status:** v1.0 — locked pending final review. All benchmarks selected, all thresholds exclusive, all vocabulary definitions written. Overall Environment now uses hard-override rules plus optional auditable manual override. New "Observation vs Interpretation" classification added.

**Rule:** every vocabulary term in the template is defined here. Ratings apply consistently until an explicit dictionary revision. Old letters are never re-rated retroactively.

---

## Part 1 — Market Data Methodology (locked)

Sources for Section 02 (Market Snapshot). No substitutions letter-to-letter. Changes require dictionary revision.

### NIFTY 50
- **Source:** NSE, official closing price
- **Snapshot value:** last trading day of the calendar month
- **Holiday rule:** last preceding trading day if month-end is a market holiday
- **MTD:** `(current month-end close ÷ previous month-end close − 1) × 100`
- **YTD:** `(current month-end close ÷ previous calendar year-end close − 1) × 100`
- **Precision:** whole numbers for index level; 2 decimals for percentages

### GOLD
- **Source:** **IBJA (India Bullion And Jewellers Association) closing rate — 999 fine gold, ₹ per 10 grams**
- **Rationale:** cash/reference benchmark, no contract-roll drift across the archive. Answers "where was gold at month-end" rather than "where was whichever contract happened to be near-month."
- **Snapshot value:** last IBJA rate published in the calendar month
- **Holiday rule:** last IBJA rate published before month-end
- **MTD / YTD:** same formula as Nifty
- **Unit:** ₹XX,XXX per 10 grams

### SILVER
- **Source:** **IBJA closing rate — 999 fine silver, ₹ per kg**
- **Rationale:** same as Gold
- **Snapshot value:** last IBJA rate published in the calendar month
- **Holiday rule:** last IBJA rate published before month-end
- **MTD / YTD:** same formula
- **Unit:** ₹XX,XXX per kg

### CRUDE
- **Source:** **Brent Crude — ICE front-month futures closing price, USD per barrel**
- **Snapshot value:** last trading day of the calendar month
- **Holiday rule:** last preceding trading day (ICE trading calendar)
- **MTD / YTD:** same formula
- **Unit:** $XX.XX per barrel

### USD/INR
- **Source:** **FBIL (Financial Benchmarks India Ltd) reference rate**
- **Snapshot value:** last FBIL reference rate publication in the calendar month
- **Holiday rule:** last published rate before month-end
- **MTD / YTD:** same formula
- **Unit:** ₹ per 1 USD, 4 decimal places (e.g. `83.4521`)

### General rules
- **Timezone:** IST for all Indian assets. USD assets recorded at native market close, compared as of the same calendar month-end.
- **Weekend handling:** if month-end falls on Saturday/Sunday, use the immediately preceding trading day.
- **Data corrections:** if a source publishes a correction after the letter is published, the letter is NOT updated silently. Material corrections → re-issue with `revisedDate`. Immaterial → leave as originally published.

---

## Part 2 — Market Health Factors

Each factor gets a colour (🟢 / 🟠 / 🔴) and a plain-language current state. Thresholds below are **mutually exclusive** — no value falls on two sides of a boundary.

### Trend

**What it measures:** whether the primary Indian equity trend is intact.

**Data:** Nifty 50 daily close vs. its 50-day moving average, and the slope of the 50-DMA over the month.

**Slope definitions:**
- **Rising:** month-end 50-DMA > prior month-end 50-DMA by ≥ 0.5%
- **Flat:** month-end 50-DMA within ±0.5% of prior month-end 50-DMA
- **Falling:** month-end 50-DMA < prior month-end 50-DMA by ≥ 0.5%

**Ratings (exclusive):**
- 🟢 **Healthy:** ≥ 70% of trading days closed above 50-DMA **AND** 50-DMA rising
- 🟠 **Watchful:** ≥ 50% and < 70% of days above 50-DMA, **OR** 50-DMA flat
- 🔴 **Deteriorated:** < 50% of days above 50-DMA, **OR** 50-DMA falling

**Language for current-state field:** Healthy · Intact · Weakening · Deteriorated · Broken.

### Breadth

**What it measures:** participation underneath the index.

**Data:** percentage of Nifty 500 stocks trading above their 50-DMA, measured at each week-end during the month. Report the month-end value.

**Ratings (exclusive):**
- 🟢 **Healthy:** month-end ≥ 60%
- 🟠 **Narrow:** month-end ≥ 40% and < 60%
- 🔴 **Very Narrow:** month-end < 40%

Direction across the month is captured separately by the `vsPrev` arrow.

**Language:** Broad · Healthy · Narrow · Narrowing · Very Narrow.

### Leadership

**What it measures:** how many sectors are demonstrably carrying the market.

**Data:** count of NSE sector indices making a new 20-day high within the last 5 trading days of the month AND trading above their 50-DMA.

**Leadership Universe (locked list — 12 NSE sector indices):**
1. NIFTY IT
2. NIFTY BANK
3. NIFTY AUTO
4. NIFTY PHARMA
5. NIFTY FMCG
6. NIFTY METAL
7. NIFTY REALTY
8. NIFTY ENERGY
9. NIFTY PSU BANK
10. NIFTY PRIVATE BANK
11. NIFTY FIN SERVICE
12. NIFTY MEDIA

If Sudheer prefers a different eligible list, edit here and lock before v1.0 ships.

**Ratings (exclusive):**
- 🟢 **Broad:** ≥ 4 sectors qualify
- 🟠 **Concentrated:** 2 or 3 sectors qualify
- 🔴 **Very Concentrated:** ≤ 1 sector qualifies

**Language:** Broad · Rotating · Concentrated · Narrow · Very Concentrated.

### Breakout Quality

**What it measures:** are breakouts sustaining, or is the market rejecting them?

**Formal candidate definition (required for the metric to be reliable):**

A stock enters the tracked breakout sample if, on a given trading day, ALL of the following are true:

1. **Universe eligibility:** the stock is in the current VSC Opportunity Universe (passes the standing liquidity + relative-strength filter).
2. **Pivot breach:** the stock closes above a predefined pivot level — the highest close of the prior 20 trading days.
3. **Volume confirmation:** breakout-day volume ≥ 1.5× the stock's 20-day average volume.
4. **Logged before outcome:** the candidate is recorded in the VSC breakout log **on breakout day, before the following session opens.**

This last point is critical. Without it, the metric is vulnerable to unconscious selection ("I remember six breakouts, four failed"). Logging discipline is what makes this metric proprietary and honest.

**Outcome measurement:** for each candidate, after 5 subsequent trading sessions:
- **Held:** stock is still trading above the breakout pivot
- **Failed:** stock has closed below the breakout pivot on any of the 5 sessions

Hold rate = (Held ÷ (Held + Failed)) × 100.

**Ratings (exclusive):**
- 🟢 **Strong:** hold rate ≥ 60%
- 🟠 **Fair:** hold rate ≥ 40% and < 60%
- 🔴 **Poor:** hold rate < 40%

**Language:** Strong · Improving · Fair · Weakening · Poor · Failing.

**Operational note:** Sudheer must be running the breakout-log discipline before this metric appears in a letter. If the log isn't yet formalised for a given month, that letter's Breakout Quality is marked N/A rather than guessed.

### Volatility

**What it measures:** is the environment orderly, or are participants in stress?

**Data:** India VIX month-end close and intra-month range.

**Ratings (exclusive):**
- 🟢 **Controlled:** month-end < 15 **AND** no daily close > 20 during the month
- 🟠 **Elevated:** month-end ≥ 15 and ≤ 20, **OR** any daily close > 20 during a month that otherwise looked controlled
- 🔴 **High:** month-end > 20, **OR** any daily close > 25 during the month

**Language:** Controlled · Calm · Elevated · Stressed · High.

### Overall Environment — hard-override heuristic

**Rule:** heuristic-driven, with named hard overrides. Manual override is permitted but must be logged in `environmentOverride` with a reason so it's auditable.

**Hard overrides (evaluated first, in order):**

1. **5 green factors** → **Favourable**
2. **4 green, 0 red** → **Constructive**
3. **≥ 3 red factors** → **Defensive**
4. **Trend 🔴 AND Breadth 🔴** → capped at **Cautious** (cannot be higher)
5. **Breakout Quality 🔴 AND Breadth 🔴** → capped at **Cautious**

**If no hard override fires, use the count table:**

| Green | Amber | Red | Overall |
|---|---|---|---|
| 4 | 1 | 0 | Constructive |
| 3 | 2 | 0 | Constructive |
| 3 | 1 | 1 | Neutral |
| 2 | 3 | 0 | Neutral |
| 2 | 2 | 1 | Neutral |
| 2 | 1 | 2 | Cautious |
| 1 | 3 | 1 | Cautious |
| 1 | 2 | 2 | Cautious |
| 0 | 3 | 2 | Cautious |
| Any remaining combos with 3+ red | | | Defensive (per hard override) |

**Manual override protocol:**

Sudheer may override the heuristic result if the mechanical rating misses something material (e.g. a factor is technically green but showing accelerating deterioration in the final week). To override:

```ts
environmentOverride: {
  from: "Neutral",
  to: "Cautious",
  reason: "Leadership deterioration accelerated in final week"
}
```

Renders as a footnote under the Overall row in Section 03. Override is public and archivable — the reader sees the machine's answer AND the human's revision, not one silently replacing the other.

**Threshold change protocol:** if the heuristic itself is revised in a future dictionary version, old letters keep their v1.0 rating. Never re-rate retroactively.

---

## Part 3 — Framework Dimensions

Locked vocabularies with measurement rules. Each value has a specific meaning; ratings are calibrated, not intuitive.

### Market Environment
Derived from `overallEnvironment.label` (see Part 2). Vocabulary is identical.

| Value | Meaning |
|---|---|
| Favourable | Broad participation, healthy trend, sustained breakouts. Full risk warranted. |
| Constructive | Trend intact, most factors healthy, minor watch items. Normal risk. |
| Neutral | Mixed conditions. Selective participation. |
| Cautious | Multiple deteriorating factors. Trend may be intact but internals weakening. Reduced participation. |
| Defensive | Three or more factors deteriorated. Capital preservation priority. Minimal-to-no new risk. |

### Opportunity Universe

**Data:** count of names currently passing the standing VSC universe filter (liquidity + relative strength).

**Ratings (exclusive, v1.0 operating thresholds — review after 6 monthly observations):**

| Value | Count |
|---|---|
| Broad | ≥ 80 names, spread across ≥ 4 sectors |
| Normal | 40–79 names, ≥ 3 sectors |
| Narrow | 15–39 names, 1–2 sectors |
| Very Narrow | < 15 names, or all in one sector |

**Review rule:** if six months of observed counts fall consistently in one band (e.g. always Broad, or always Narrow), the thresholds need recalibrating in dictionary v1.1. Never re-rate the first six letters — those keep v1.0 ratings.

### Setup Quality

**Data:** grade distribution among qualifying setups (per the Setup Grading framework — A / B / Reject).

**Ratings:**

| Value | Distribution |
|---|---|
| Strong | A-grade setups dominant. Multiple triggers meeting all confirmation criteria. |
| Normal | Roughly balanced A and B grades. |
| Weak | Mostly B-grade. A-grades absent or isolated. |
| Poor | Setups mostly reject-grade. Nothing worth taking without exception. |

### Risk Allocation

**Data:** per-position risk being taken relative to VSC's standard ceiling.

| Value | Meaning |
|---|---|
| Increased | Above standard per-trade risk. Rare — reserved for exceptional Favourable regimes with A-grade setups. |
| Normal | Standard per-position risk. |
| Reduced | Below standard — typically 0.5×–0.75× of standard. |
| Minimal | Effectively zero new risk. Any open positions are legacy holds under management. |

### Trade Frequency

**Data:** count of trades taken in the month.

**Ratings (exclusive, mutually non-overlapping):**

| Value | Trades |
|---|---|
| High | ≥ 15 |
| Normal | 8–14 |
| Reduced | 4–7 |
| Low | 1–3 |
| None | 0 |

**Note:** these bands describe frequency *relative to VSC normal*. If VSC's strategy evolves and the practical monthly rhythm changes, this dictionary changes — that's what versioning is for.

### Primary Objective

| Value | Meaning |
|---|---|
| Growth | Seeking capital appreciation as primary outcome. Environment supports risk. |
| Balanced | Growth pursued with active capital-preservation constraints. Standard operating mode. |
| Preservation | Capital preservation is the primary outcome. Growth is a byproduct of not losing. |

---

## Part 4 — Snapshot Read and Playbook language library

Short descriptive phrases used in Section 02 (Snapshot Read) and Section 08 (Playbook). Not locked vocabularies — but this library exists so the language stays consistent letter-to-letter.

### Snapshot Read (≤ 3 words)

**Directional / momentum:** Strong · Leadership · Trending · Extending · Breaking out · Resilient · Stable · Range-bound · Consolidating · Weakening · Cooling · Rolling over · Under pressure · Weak · Breaking down · Selling · Capitulating.

**Cross-asset context:** Safe-haven bid · Risk-on · Risk-off · INR weaker · INR stronger · Commodity surge · Commodity crash.

Reuse phrases from prior letters where possible so a reader recognises the language across months.

### Playbook Preferred Setup (≤ 8 words)
Common patterns:
- "High-quality relative-strength continuation"
- "Post-earnings gap-and-go with volume"
- "Sector-leader base breakouts"
- "Retest of prior breakouts, tight stops"

### Playbook Avoided (≤ 8 words)
Common patterns:
- "Marginal breakouts, weak sectors"
- "Counter-trend reversals"
- "Low-volume breakouts"
- "Lagging sector rotations"

---

## Part 5 — Observation vs Interpretation

**The design principle.** Every field on the letter belongs to one of two classes. The distinction is what makes VSC a research operation and not an opinion column.

### Observed / Calculated (no discretion at render)

These fields are mechanical. Given the underlying data and the dictionary's rules, they compute to a specific value. Two different analysts using the dictionary correctly would produce the same output.

- **Market Snapshot:** month-end values, MTD %, YTD % (all five assets)
- **Market Health:** `current` labels, `status` colours, `vsPrev` arrows (all five factors)
- **Overall Environment:** `label`, `vsPrev` (heuristic-derived from the five factor colours)
- **Opportunity Universe:** value (once count is measured and thresholds are locked)
- **Setup Quality:** value (once grade distribution is measured)
- **Trade Frequency:** value (once trade count is measured)
- **Section 04 comparison tables** (both blocks — derived from current + previous letter)
- **Section 09 stats:** monthly return, trade count
- **Read time:** auto-calculated from word count

### Interpreted (framework judgement)

These fields require human decision. They are calibrated but not mechanical. Two analysts might reasonably produce different values.

- **Section 01:** thesis, sub-thesis, `regimeTagEditorial` (Tag 2)
- **Section 02:** all `read` verdicts on the snapshot cards
- **Section 03:** all `vscRead` phrases (per factor) and `overallEnvironment.vscRead`
- **Section 03 override:** `environmentOverride.reason` when Sudheer overrides the heuristic
- **Section 04:** `netChange` sentence
- **Section 05:** all `whatHappened` headlines and explanations
- **Section 06:** chart selection, chart title, chart caption ("what matters" line)
- **Section 07:** `riskAllocation`, `primaryObjective`, `conclusion` sentence
- **Section 08:** all playbook fields
- **Section 09:** `worked`, `didnt`, `lesson` sentences
- **Section 10:** all `conditions` and `currentStance`

### Why the distinction matters

**For VSC's editorial voice:**
> *"The data is objective. The interpretation is ours."*

That is the research philosophy in one sentence. A reader can trust the observations (they're mechanically derived per a published methodology) while engaging with the interpretations (they're VSC's judgement, and the reader can agree or disagree).

**For the archive:**

Two years from now, someone reading Letter 007 will see a 🔴 Poor for Breakout Quality and know it means "hold rate < 40% among tracked candidates" — because the dictionary at the time defined it that way. They can verify. Interpretations from the same letter are Sudheer's — dated, of his moment, not machine-authored.

**For dictionary revisions:**

Observed-class fields are the ones most affected by threshold changes. When we revise the dictionary, prior letters keep their v1.0 observed values. Interpreted-class fields don't move with dictionary revisions — they were the analyst's judgement at publish time.

---

## Part 6 — Change management

**Versioning:** this document is versioned. Every material change to a threshold or vocabulary bumps the version and adds a changelog entry.

**No retroactive re-rating:** if v1.1 changes the Breadth threshold from 60/40 to 65/45, Letter 007 keeps its v1.0 rating. If clarity is needed, the letter's meta can include `Rated under dictionary v1.0`.

**Vocabulary additions:** requires a dictionary revision. New value must have a measurement rule before it can appear in a letter.

**Changelog:**

```
v1.0 — [pending final lock]
       Initial locked version.
       Sources: NSE (Nifty), IBJA (Gold, Silver), ICE Brent (Crude), FBIL (USD/INR).
       All Market Health thresholds mutually exclusive.
       Leadership Universe = 12 NSE sector indices (see Part 2).
       Breakout Quality candidate definition formalised.
       Overall Environment: hard-override heuristic + optional auditable manual override.
       Trade Frequency and Opportunity Universe bands non-overlapping.
       Observation vs Interpretation classification (Part 5) introduced.
```

---

## Ready to lock

All twelve open questions from v3 answered. All boundaries exclusive. All canonical sources declared. All observation vs interpretation classifications made.

Confirm this document as `v1.0` and the template becomes buildable. Any last edits go inline before you say "locked."
