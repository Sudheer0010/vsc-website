# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: self-directed retail traders and investors — often less experienced —
here to learn systematic market thinking (trend reading, risk, position
sizing) rather than to receive tips or calls. They arrive uncertain whether
systematic trading is learnable and whether this particular process is
credible, not already sold on joining anything paid.

Secondary: visitors closer to a purchase decision who use the same free
research as proof before going further — existing portfolio holders
evaluating VSC Advantage, or traders who already run their own book
evaluating Inner Circle. These are downstream of the same free content, not
a separate entry point.

## Product Purpose

VSC Capital & Advisory is Sudheer Vobhilineni's individual systematic-trading
research practice. It exists to teach and publish a rules-based decision
process for Indian equity swing trading — market environment reading,
opportunity screening, setup grading, position sizing, and trade management —
so a visitor can learn to make repeatable, evidence-based capital decisions
instead of relying on tips, conviction, or prediction. Success is a visitor
who can articulate *why* a decision was made, not just what happened.

## Positioning

The five frameworks (the Decision Pipeline) are published in full — not just
the conclusions they produce. A tips or signals channel can share a call; it
cannot show the reasoning system that produced it, because it usually
doesn't have one, or won't publish it. The differentiator is that the actual
architecture — what a setup must satisfy at every stage, and why — is
public, versioned, and dated, and the monthly market letters show that same
architecture applied in real time.

## Operating Context

- Research is free and public: the five framework pages (`/frameworks`), the
  monthly Market Letter archive (`/letters`), and Research Notes.
- Three paid/gated offerings sit downstream, unpriced publicly and framed as
  concentric rings of access rather than tiers: Learning Hub (open,
  structured learning), VSC Advantage (by application, portfolio-level
  guidance), Inner Circle (by invitation, a closed research desk for people
  managing their own book).
- Visitors' actual stated confusions (from the FAQ) cluster around: whether
  trading is learnable / not gambling, what capital preservation means in
  practice, whether this suits beginners vs. existing investors, and —
  repeatedly — whether VSC gives tips or manages money (it does neither).
- The site is content-led: framework pages, market letters, and notes are
  the primary surface; the offerings pages exist to convert credibility
  already earned by the free research, not to compete for cold attention.

## Capabilities and Constraints

- SEBI Research Analyst registration is **in process, not yet granted**.
  Until granted: no personalized investment advice, no recommendations, no
  PMS/fund management — every page publishes method and education only,
  never a call to act on a specific security. Stated on the homepage, the
  compliance band, the privacy page, the FAQ, and inline on framework pages;
  must not be contradicted anywhere new.
- No guaranteed-returns language, ever (explicit FAQ commitment).
- MSME registered (UDYAM-AP-17-0067701, NIC 66190) — the one specific
  credential the site claims. Do not invent others.
- Voice: first-person singular throughout — "I," never "we." This is one
  person's practice, not a firm with a team.
- Never fabricate specifics: trade details, performance figures,
  testimonials, or case-study content not actually in the record.
  Established practice this session — when historical data doesn't support a
  claim (six of seven market letters predate the current letter format), the
  field is left absent rather than invented.
- Offering pricing is deliberately unpublished ("Pricing: To be announced"
  on all three) and is described as shared plainly once fit is confirmed,
  not gated behind a form.

## Brand Commitments

- Full name: "VSC Capital & Advisory"; short form "VSC Capital" (titles /
  meta); shorthand "VSC" in body copy and offering names ("VSC Inner
  Circle," "VSC Advantage," "VSC Learning Hub").
- Visual-system authority is `docs/DESIGN_PRINCIPLES.md` — confirmed by the
  user as authoritative for the current "Daylight Growth" implementation
  (light paper palette, green primary, clay for risk, no gold/blue).
  **`docs/BRAND_GUIDELINES.md` is stale**: it documents an earlier dark-navy
  / warm-gold palette that predates the Daylight Growth redesign already
  shipped across this codebase, and conflicts with what's actually
  implemented. Future design work should not treat it as current.
- Tone, per `docs/BRAND_GUIDELINES.md`'s copy rules (still applicable
  independent of the stale palette section): calm, direct, measured; never
  salesy — no "Buy Now," "Act Fast," "Unlock Returns," "Limited Spots," or
  equivalents.

## Evidence on Hand

- Seven published Market Letters (Jan–Jul 2026), each dated, numbered, never
  edited after publish.
- Five published framework pages forming the Decision Pipeline (Market
  Environment, Opportunity Universe, Setup Grading, Sizing, Trade
  Management), each versioned with a revision history.
- FAQ: 19 questions across 6 categories, documenting real visitor
  objections.
- No testimonials, case studies, audited performance track record, or press
  exist anywhere on the site. Do not add any without the user supplying
  them.
- Framework Review data (opportunity counts, grade distributions, capital
  deployed) is only fully tracked from the July 2026 letter forward; earlier
  letters carry only what can be verified from their original published
  text.

## Product Principles

1. Publish the process, not the prediction — frameworks and letters explain
   reasoning, never forecast outcomes.
2. The record is public and permanent — dated, versioned, never edited after
   the fact.
3. Free research earns the right to a paid conversation — the offerings
   convert credibility already demonstrated, not cold interest.
4. State absence honestly rather than inventing an answer — a missing figure
   is more honest than a fabricated one.
5. One person, one voice — first-person singular, no institutional "we."

## Accessibility & Inclusion

No product-specific accessibility requirement has been established by the
user. Standard web accessibility practice (semantic HTML, ARIA on custom
interactive components, colour contrast) has been applied throughout this
session's build work — e.g. `role="img"` plus `title`/`desc` on every inline
SVG exhibit, `aria-expanded` on the expandable framework pipeline — and
should continue as the default bar.
