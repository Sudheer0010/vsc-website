# VSC Website — Action List

Derived from the review panel audit (rev 2), run against commit state of
`github.com/Sudheer0010/vsc-website` as rendered and measured on 2 Aug 2026.

Sorted **Must-fix → Should-fix → Later**. Content actions come first inside each
tier, because content decisions block the code.

---

## How to use this with Claude Code

This file is written to be executed one item at a time.

```
# in the repo root
claude

> Read docs/ACTIONS.md. Implement M4 only. Do not touch anything else.
> Run `npm run build` and show me the diff.
```

Rules that make this go well:

1. **One item per branch, one item per session.** These touch overlapping files
   (`globals.css` appears in four items). Batching them produces conflicts and a
   diff you can't review.
2. **`npm run build` is the gate.** Your `AGENTS.md` already requires zero
   TypeScript and ESLint errors — hold Claude Code to it before you merge.
3. **Owner tags are binding.** `[YOU]` items are decisions only you can make.
   Claude Code should stop and ask rather than invent a value. If it drafts a
   founder bio or a price, that's a failure, not initiative.
4. **`[LEGAL]` items need a human professional**, not a model. Claude Code can
   scaffold the page and the routing; the words need a securities lawyer who
   knows your SEBI application.
5. Paste the acceptance criteria into the prompt. They're written to be checkable.

---

# MUST-FIX

Objective defects. Nothing here is a matter of taste. Ship these before any
redesign work starts — a new experience built on top of these carries them
forward at higher cost.

---

### M1 · Remove or rework the published performance returns
**`[YOU]` `[LEGAL]` `[CONTENT]` — blocks nothing, blocked by nothing, do it first**

Seven months of monthly returns are published and rendered in gold: `+12.42%`,
`+11.82%`, `−1.56%`, `0.00%`, `+23.42%`, `+5.82%`, `+5.82%` — compounding to
**+71.0% over seven months**. No capital base, no live-vs-simulated statement, no
costs, no benchmark, no drawdown, no verification. Published by an entity whose
own footer says SEBI RA registration is pending and everything is "strictly
educational."

**Files** — `data/market-letters.ts` (source), `components/sections/blog/MarketLetterArchive.tsx:124`
(archive cards), `components/cards/MarketLetterModal.tsx:99` (modal metrics row)

**Your decision, one of three:**

- **(a) Remove the return figures, keep everything else.** The qualitative
  sections — Market Environment / What Worked / Adjustment / Looking Ahead — are
  the strongest writing on the site and lose nothing without a percentage on top.
  Fastest and lowest risk.
- **(b) Keep them and publish a full methodology page.** Capital base,
  live-vs-simulated, costs and brokerage, benchmark comparison, max drawdown, who
  calculated them. Only viable if all of that is true and documented.
- **(c) Replace returns with process metrics.** Trades taken, months in cash,
  average hold, largest single loss, win rate. These demonstrate discipline —
  which is what you actually sell — and carry far less regulatory weight.

**Recommendation:** (c), with (a) as the immediate step today while you build it.
"0 trades in April" is more persuasive evidence of your process than "+23.42% in
May" is of your skill.

**Acceptance** — no percentage return figure appears anywhere in rendered output;
`grep -r "Monthly Return" components/ app/` returns nothing, or returns only
references guarded behind a documented methodology page.

---

### M2 · Align advisory language with registration status
**`[YOU]` `[LEGAL]` `[CONTENT]`**

The company is "VSC Capital & Advisory." `VSC Advantage` is labelled "Professional
Portfolio Advisory" and lists "Direct Research Desk Advisory," "one-on-one
strategic portfolio reviews," "custom risk gate adjustments" and "real-time
alerts." The footer disclaimer says none of that is advice. Prominent copy and
fine print describe two different businesses.

**Files** — `app/layout.tsx` (metadata/title), `app/offerings/advantage/page.tsx`,
`components/sections/offerings/*`, `data/site-config.ts`, footer component

**Do** — reword product copy to describe the framework rather than the service
until registration lands. Then move the registration status *up*: a visible,
confident line near the top of the homepage rather than footer fine print.
Handled well this becomes a trust asset — almost nobody in the category
volunteers it.

**Acceptance** — no page describes a service the current registration status
doesn't permit; registration status appears above the fold on `/`; a lawyer has
read the wording.

---

### M3 · Publish Privacy Policy, Terms, and a standalone Disclaimer
**`[LEGAL]` `[CONTENT]` + `[CODE]`**

`/privacy` and `/disclaimer` both 404. No privacy link anywhere. The enquiry form
collects name, email, phone/WhatsApp, capital bracket and experience level.
India's DPDP Act 2023 creates notice-and-consent obligations; financial-context
data raises the stakes.

**Files** — new: `app/privacy/page.tsx`, `app/terms/page.tsx`,
`app/disclaimer/page.tsx`; edit footer component and `app/enquire/page.tsx`

**Do** — Claude Code scaffolds three routes matching your existing page layout
conventions and adds footer links. **A professional writes the actual text.** Add
one line under the submit button: *"We use your details only to reply to this
enquiry. We don't sell data or add you to a list."* + policy link.

**Acceptance** — all three routes return 200 and appear in the build output;
footer links present on every page; privacy line renders under the submit button.

---

### M4 · Fix the invisible mobile CTA
**`[CODE]` — 15 minutes, do this today**

`.drawer-links a` (`app/globals.css:550`) overrides `.nav-cta` (`:416`) on
specificity. The mobile drawer's "Enquire Now" renders `#94A3B8` on `#C9A84C` —
measured contrast **1.12:1**. Your primary conversion button, on the viewport
most of your LinkedIn traffic uses, is effectively invisible.

**Files** — `app/globals.css`

```css
/* after the .drawer-links rules */
.drawer-links a.nav-cta { color: #060810; font-size: 13px; }
```

Also raise the drawer panel's background opacity — the hero currently reads
straight through the menu items.

**Acceptance** — at 390px with the drawer open, computed contrast of the CTA text
against its background is ≥ 4.5:1; no hero content is legible through the drawer
panel.

---

### M5 · Give every market letter a real URL
**`[CODE]`**

Letters open in a modal. The URL never changes; no `app/blog/[slug]` route exists
in the build. Consequence: no letter can be shared, linked, bookmarked or cited;
Google indexes none of it; a LinkedIn post can only link to `/blog`. The overlay
also has no `role="dialog"` and no `aria-modal`.

**Files** — new: `app/blog/[slug]/page.tsx`; edit `app/blog/page.tsx`,
`components/cards/MarketLetterModal.tsx`, `public/sitemap.xml`

**Do** — statically generate one page per letter from `data/market-letters.ts`,
each with `generateMetadata`, an OG image, a byline and a date. Keep the modal as
an intercepting route if you like the interaction, but the canonical letter must
live at a URL. Add each letter to the sitemap.

**Acceptance** — `npm run build` lists a route per letter; each is reachable
directly, renders full content server-side, and appears in `sitemap.xml`;
`curl` on a letter URL returns the body text.

---

### M6 · Put a named human on the site
**`[YOU]` `[CONTENT]`**

No name, photo, biography, credential or years-in-market appears on `/` or
`/about`. The About page runs fourteen headings of first-person narrative without
naming who "us" is. "Sudheer" survives only inside an email address in the
footer. Meanwhile the form asks strangers for their phone number and capital
bracket. Trust cannot rise above roughly 5/10 while this is true.

**Files** — `app/page.tsx`, `app/about/page.tsx`, `public/images/`

**You supply** — name, photograph, years trading Indian equities, city, and (if
you're willing) one specific loss and what rule it produced. Claude Code cannot
generate any of this and must not try.

**Acceptance** — founder name and photograph appear on `/`; `/about` contains at
least three dated, specific facts rather than aphorisms.

---

### M7 · Compute read-times or delete them
**`[CODE]`**

No read-time on the site is derived from content. The homepage string is a
literal (`2 MIN READ`). The blog uses a ternary:
`m === "JUL" ? "12" : m === "FEB" ? "10" : "8"`. The July letter runs roughly 200
words and is labelled a twelve-minute read — off by a factor of about twenty, and
it sits directly above the metrics row from M1.

**Files** — `components/sections/home/ResearchDeskAndTestimonials.tsx:86`,
`components/sections/blog/FeaturedPublication.tsx:33`,
`components/sections/blog/MarketLetterArchive.tsx:148`,
`components/cards/MarketLetterModal.tsx:93`

**Do** — compute from the letter body at build time (words ÷ 220, min 1), or
remove read-times entirely. Given letter length, removing is the more honest fix.

**Acceptance** — no hardcoded read-time string or ternary remains; `grep -rn "min read\|MIN READ\|minute read" components/` returns only computed values or nothing.

---

### M8 · Resolve the risk-per-trade contradiction
**`[YOU]` `[CONTENT]`**

Homepage says **"Maximum 2% Risk Per Trade."** Every market letter reports
**"Risk / Trade: 1.5%."** One of these is wrong, on the number that is the single
most concrete claim you make.

**Files** — `app/page.tsx` or the home section component, `data/market-letters.ts`

**Acceptance** — one value appears everywhere.

---

### M9 · One contact address
**`[CODE]`**

`/enquire` shows `contact@vsccapital.in` in the body and `sudheer@vsccapital.in`
in the footer, on the same page.

**Files** — `data/site-config.ts`, `app/enquire/page.tsx`, footer component

**Acceptance** — one address, sourced from a single constant.

---

# SHOULD-FIX

Quality and conversion. None of these are emergencies; all of them are cheap
relative to their effect, and most are prerequisites for the redesign looking
good rather than merely different.

---

### S1 · Raise the muted text tokens to clear WCAG AA
**`[CODE]`** — `--text-muted` measures ~3.7:1 and `--text-secondary` ~3.8:1 on
`#070A12`. AA needs 4.5:1. This single change fixes **84 sub-AA text nodes** across
the site — including your legal disclaimer, currently the least readable text you
publish. Target roughly `rgba(255,255,255,.62)` and `rgba(255,255,255,.78)`.
**Files** — `app/globals.css`
**Acceptance** — zero text nodes below 4.5:1 (3:1 for ≥24px) on `/`, `/blog`, `/enquire`.

### S2 · Set a minimum type size
**`[CODE]`** — `/blog` renders 13 nodes at 9px, 43 at 10px, 12 at 11px. Set a 12px
floor for anything a human reads and 14px for paragraph text.
**Acceptance** — no text node below 12px in rendered output.

### S3 · Move running prose off DM Mono
**`[CODE]` `[CONTENT]`** — DM Mono is applied to **115 text nodes on the homepage
and 151 on `/blog`**; Syne, your designated UI font, to six. The site is set in a
monospace typeface. Reserve mono for numbers, dates, tickers, eyebrows and metric
labels. This does more for "premium" than any other single change.
**Files** — `tailwind.config.ts`, `app/globals.css`, component classNames
**Acceptance** — no `<p>` of running prose resolves to a monospace family.

### S4 · Fix tap targets
**`[CODE]`** — footer links are 16px tall, carousel dots 6×6px, FAQ category
buttons 22px. WCAG 2.2 wants ≥24px; platforms want 44px. Add padding to expand hit
areas without changing visual size.
**Acceptance** — no interactive element under 24×24px at 390px.

### S5 · Make the letter modal accessible
**`[CODE]`** — no `role="dialog"`, no `aria-modal`, no focus trap, no
Escape-to-close. Do this alongside M5.
**Acceptance** — modal announces as a dialog, traps focus, closes on Escape,
returns focus to the trigger.

### S6 · Fill or delete the empty FAQ categories
**`[YOU]` `[CONTENT]`** — three questions are answered; five category headers
(Trading Philosophy, Risk Framework, Learning Hub, Advisory, Strategic
Discussions) render empty. Those five are exactly what a prospect most wants
answered. Write 12–15 answers weighted to the uncomfortable ones — what it costs,
are you registered, what happens on the call, what if I only have ₹50,000, what
are your returns (answer: we don't publish returns, and here's why).
**Files** — `data/faq.ts`
**Acceptance** — no category header renders with zero questions.

### S7 · Fix or replace the testimonial
**`[YOU]` `[CONTENT]`** — one quote, attributed to "Shivam Thakur, Market
Participant." That is not a designation anyone holds, and the prose is in your
marketing register rather than a trader's. If Shivam is real, re-collect it with
his actual occupation, city, and one specific behaviour that changed
("I stopped adding to losing positions" beats "reframed my approach to capital
preservation"). If not, replace the block with an honest "we're new" statement.

### S8 · Publish pricing, a band, or a named silence
**`[YOU]` `[CONTENT]`** — three products, zero prices, one shared enquiry form.
Every buyer must convert to a sales conversation to learn the most basic
qualifying fact. If you've run fewer than ~10 paid engagements, use the named
silence: *"We price per cohort. Next cohort opens January — ask and we'll send
the number the same day."*

### S9 · Date the regime banner or remove it
**`[YOU]` `[CODE]`** — `RESEARCH DESK ACTIVE • REGIME: RISK-MANAGED ALLOCATION`
has no timestamp and no history. If you maintain it by hand, date it and link a
log — that becomes the only falsifiable public record you own. If you don't,
delete it. The current version is the worst of both.

### S10 · Standardise CTA vocabulary
**`[CODE]` `[CONTENT]`** — seven labels for three actions: "Connect With Us,"
"Enquire Now," "Contact Us," "Enquire," "The Research Journal," "Read Market
Letter," "EXPLORE," "Get your queries answered." Plus "Blog" in the header and
"RESEARCH & BLOG" in the footer. One verb per action, everywhere. Also makes your
analytics interpretable for the first time.

### S11 · Reduce the enquiry form to two required fields
**`[CODE]` `[CONTENT]`** — currently name, email, **phone**, **capital bracket**
required. Required phone plus required wealth declaration is the signature of a
lead-qualification funnel, and your three reassurance chips are visibly doing
defensive work because of it. Make phone and capital optional with honest labels.
Move the open question to the top. Add the actual next step in copy:
*"We'll reply by email within one working day. No call unless you ask for one."*
**Note** — if your close rate on current enquiries is already above ~1 in 4, skip
this; the form is qualifying correctly and you'd be optimising the wrong metric.

### S12 · Collapse the duplicate token layers
**`[CODE]`** — `styles/tokens.ts` says `bgPrimary: #060810`; `tailwind.config.ts`
says `#070A12`. `tokens.ts` says `textSecondary: rgba(255,255,255,.7)`;
`globals.css` says `--text-secondary: #94A3B8`. That second duplication is what
shipped M4. Make CSS custom properties the single source and generate the rest,
or delete `tokens.ts` if nothing imports it.

### S13 · Global `:focus-visible` ring
**`[CODE]`** — 5 of 12 sampled interactive elements resolve to `outline: none` or
`outline: auto 0px`. Keyboard users can't see where they are.

### S14 · Define jargon on first use
**`[CONTENT]`** — you name "Retail Investors" and offer a "Beginner (<1 year)"
option, then write "quantitative risk gates," "regime-based rebalancing,"
"volatility matrices," "codebase & parameter research." Nothing is defined. You're
filtering out your stated primary audience with vocabulary in the same document
that invites them in.

### S15 · Replace the stock hero photograph
**`[CONTENT]`** — the multi-monitor trading-desk stock photo depicts the
*aesthetics* of a trading operation instead of showing anything of yours. Flat
colour beats stock. Something you actually made beats both.

---

# LATER

Structural and creative work. Sequenced after the above, because each of these is
more expensive to do twice.

- **L1 · The interactive editorial redesign.** The real Project 2. Reference set
  is Reuters/NYT/Bloomberg visual investigations and annual-report interactives —
  not Apple product pages, and not fade-in scroll. Scope separately.
- **L2 · Public regime log.** Every call, dated, with its predecessor. Only start
  it if you'll maintain it monthly; an abandoned track record reads as a hidden
  one.
- **L3 · A running "what we got wrong" page.** The highest-trust artefact
  available to any research firm, and the natural extension of your own
  "Continuous Review" principle.
- **L4 · Methodology page with one worked calculation.** "Quantitative" is
  currently an adjective. One position-sizing example worked end to end turns it
  into a demonstration.
- **L5 · Publish monthly without missing a month.** Consistency is the trust
  mechanism. Worth more than any redesign in this document.
- **L6 · Differentiate the three offerings.** Currently three identical 6×4
  module grids, so three different products read as one thing described three
  times. Each needs its own shape, its own proof, its own free sample.
- **L7 · Rebuild `/about` around a person and a chronology.** Depends on M6.
- **L8 · Reinstate advisory positioning when registration is granted.** The
  registration number in your footer will be worth more than every design change
  on this list combined.

---

## Suggested order

```
Today          M4 · M9 · M8 · M7          (code, under 2 hours total)
This week      M1 · M2 · M3               (decisions + lawyer, then code)
Next           M5 · S5 · M6               (routes + a11y + founder)
Then           S1 · S2 · S3 · S4 · S12 · S13   (one design-system pass)
Then           S6 · S7 · S8 · S9 · S10 · S11 · S14 · S15
Later          L1 …
```

`M4`, `M9`, `M8` and `M7` are pure code with no decisions attached — hand them to
Claude Code now and they're done before you've finished reading `M1`.
