# VSC Market Letter — Presentation Layer

**Companion to:** Spec v4 (data architecture) + Dictionary v1.0 (methodology).

**Purpose:** the reader experience. Locks how the internal 10-section data model renders as 7 continuous visual zones on the page. The sophistication stays behind the curtain; the reading stays simple.

---

## Two rules that govern everything

**Rule 1 — Numbers first. Visual diagnosis second. Explanation third.**

Never paragraph → paragraph → paragraph → numbers buried at the bottom. Every zone leads with data or a status indicator; prose follows to interpret it, not to introduce it.

**Rule 2 — The reader should understand 70% of the letter without reading a full paragraph.**

Skim mode is a first-class experience, not a fallback. If the letter fails Rule 2, cut prose. Do not add prose to fix confusion — add clearer numbers or a better indicator.

These two rules are the acceptance test for every future letter and every future template change.

---

## The 10 → 7 mapping

The data model keeps its 10 sections. The reader experiences 7. Three joins collapse visually:

| # | Visual Zone | Data sections | What it does for the reader |
|---|---|---|---|
| 1 | **The Month in One Glance** | 01 Header | Thesis + regime tags + one sentence. 10-second read of the whole month. |
| 2 | **Market Snapshot** | 02 Snapshot | 5 asset cards. Where each major market ended. |
| 3 | **Market Health** | 03 Market Health | 5-factor diagnostic + Overall. How healthy the market actually was. |
| 4 | **What Changed** | 04 What Changed | June → July. Market factors + VSC posture, both derived. |
| 5 | **What Happened** | 05 + 06 | Four narrative blocks + one optional chart, as one continuous flow. |
| 6 | **VSC View** | 07 + 08 | Diagnosis → Action, one continuous section with a "Therefore" pivot. |
| 7 | **VSC Month + What's Next** | 09 + 10 | Return / trades / lesson + forward conditions, one closing block. |

---

## Zone 5 — What Happened (05 + 06 collapse)

The four narrative blocks (INDEX / BREADTH / LEADERSHIP / FLOWS-RISK) render first. Directly below them, if a chart is present, the chart with its "What matters:" caption. **One heading, one flow.** Not "What Happened" and then a separate "Chart" heading.

If no chart, the zone ends after the four blocks. The reader doesn't notice anything missing.

```
────────────────────────
WHAT HAPPENED

INDEX                     BREADTH
Headline resilience       Participation
continued.                deteriorated.
Nifty held up             Fewer stocks were
reasonably well.          sustaining breakouts.

LEADERSHIP                FLOWS / RISK
Leadership remained       Risk appetite remained
narrow.                   selective.
IT ↑ Defence ↑            Institutional participation
Metals ↓ PSU Banks ↓      held; retail thinned.

[chart]

What matters: The headline index remained stable while
              participation underneath it deteriorated.
```

---

## Zone 6 — VSC View (07 + 08 collapse)

The signature "diagnosis becomes action" moment. Renders as one titled block **"VSC VIEW"** with a visual "Therefore" divider that turns the top half into the bottom half.

```
────────────────────────
VSC VIEW

Environment       Defensive        ← from Section 07 (canonical: overallEnvironment.label)
Opportunity       Narrow
Setup Quality     Weak
Risk              Reduced

An intact index trend did not justify normal exposure
when opportunity quality was deteriorating.
                                                        ← Section 07 conclusion (accent green)

──────────────  Therefore  ──────────────

Exposure                Reduced                         ← from Section 08
Position sizing         Below normal
Preferred               High-quality relative-strength setups
Avoid                   Marginal breakouts
Increase risk when      Breadth + follow-through improve
```

**Why this join matters:** the diagnosis (top) and the action (bottom) are the same thought, split by a philosophical hinge word ("Therefore"). Separating them into two independent sections loses the causal link that makes the letter feel like reasoning rather than reporting.

The conclusion sentence (from Section 07's `conclusion` field) renders as the bridge — accent green, italicised, sitting between the diagnosis grid and the Therefore divider.

---

## Zone 7 — VSC Month + What's Next (09 + 10 collapse)

The closing block. Two beats separated by a soft divider — what happened for VSC this month, and what would change VSC's stance next month.

```
────────────────────────
VSC — JULY

+5.82%          [n]              Reduced
Monthly Return  Trades           Exposure

Worked:    Waiting for higher-quality opportunities.
Didn't:    Several potential breakouts lacked follow-through.
Lesson:    A resilient index is not the same as a healthy opportunity set.

──────────────  Looking into August  ──────────────

If breadth expands                    →  more constructive
If breakout quality improves          →  increase participation
If leadership broadens                →  normalise exposure
If conditions remain weak             →  protect capital

Current stance: Defensive until the evidence changes.
```

**Why this join matters:** the reflection ("what happened for us this month") and the forward frame ("what would change our stance") are the same conversation. A regular reader wants to close the letter with a single sense of where VSC stands and what would move it. Two independent sections dilute that.

---

## Visual balance target

Applies to each zone independently, not just the letter as a whole:

- **60–70%** cards, numbers, status chips, arrows, chart.
- **30–40%** written prose.

If any single zone tips past 40% prose, cut prose before adding data. The exception is Zone 5 (What Happened) where the four narrative blocks are prose by design — but even each block caps at 37 words.

---

## What is unchanged from v4 + Dictionary v1.0

- **Data model:** all 10 sections, all canonical sources, all literal unions, all derived-not-stored fields.
- **Dictionary:** all methodologies, thresholds, override protocol, Observation vs Interpretation classification.
- **Section order:** same as Spec v4 (01 through 10).
- **Word ceilings:** every section still caps at its Spec v4 budget.
- **Backfill sequence:** 07 → 06 → 05 → 04 → 03 → 02 → 01, unchanged.
- **Publication date handling:** unchanged.

The Presentation Layer only merges three joins visually. Nothing about how the data is stored, computed, or governed changes.

---

## The complete brief

Three documents together = the full build spec:

1. **`MARKET-LETTER-TEMPLATE-SPEC-v4.md`** — data architecture, types, field semantics, canonical sources.
2. **`MARKET-LETTER-DATA-DICTIONARY-v1.0.md`** — methodology, thresholds, vocabularies, Observation vs Interpretation.
3. **`MARKET-LETTER-PRESENTATION-LAYER.md`** — this document. The 7-zone reader experience, the two rules.

Hand all three to Claude Code as one brief when ready. Build sequence stays:

1. Data model + literal unions
2. Template component (with the 7-zone visual joins baked in — Zones 5, 6, 7 are each single components internally, not two)
3. Letter 007 real content
4. Visual polish pass
5. Backfill Letter 006

Nothing else to design. This is the lock.
