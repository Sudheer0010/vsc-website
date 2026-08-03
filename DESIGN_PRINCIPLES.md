# VSC Design Principles — Daylight Growth

This document defines the permanent design system rulebook for **VSC Capital & Advisory**. Every component, style, page layout, animation, and interaction must obey these guidelines to preserve the identity described below.

This replaces the prior "Institutional / Gold-on-Navy" rulebook in full. That system — dark navy backgrounds, gold accents, serif display type, glassmorphism, uppercase mono labels — is the default look any AI generates when asked for "premium financial website." It is exactly what this document forbids.

---

## 0. What VSC Should Feel Like

Intelligent, hopeful, confident, modern, human, alive. Premium without trying too hard.

Not corporate, cold, heavy, dark, muted, or "luxury for the sake of luxury." A visitor should think *"these people think differently,"* not *"this is another premium finance template."* If the logo were removed, the page should still be recognisably VSC — through the [step-rule mark](components/ui/vsc/StepRule.tsx), the paper-and-ink palette, and the reading-first type, not through decoration.

---

## 1. Colour — Daylight Growth

**Backgrounds are light.** The canvas (`--canvas`, `#FBFAF6`) is warm paper, never white-white and never dark. Depth comes from a brighter surface sitting *above* the canvas plus a warm-tinted shadow (`--lift-1/2/3`) — the way real paper on a desk behaves — not from blur or an inset gradient sheen. Dark sections are permitted only where they carry real meaning (a code block, a quoted data table on black), never as the default section background.

**Green is the signal, not the decoration.** `--growth` (`#0F7A40`) replaces gold as the accent. It marks the one action or figure on a section that matters — a CTA, a key number, an active nav state — and nothing else. It is never a background wash across an entire section, never a border on every card, never a bullet-point colour by default. If more than roughly one element per section is green, something is being decorated rather than signalled.

**Every text colour token clears WCAG AA (4.5:1) on canvas.** `ink`, `ink-soft`, `ink-muted`, `growth`, `clay` are all verified. `ink-faint` and `sprout`/`clay-bright` are graphic-only — captions and chart marks, never body copy or a token anyone could accidentally set a paragraph in.

**Reference:** [`app/globals.css`](app/globals.css) `:root` block is the single source of truth. [`tailwind.config.ts`](tailwind.config.ts) mirrors it with meaning-based names (`growth`, `clay`, `ink`, not `green-600`). Never hardcode a hex in a component — if the palette needs a new value, add it to both files first.

---

## 2. Typography — Reading First

Body copy is **17px**, not 13–14px. This is a research firm; people are meant to read paragraphs here, and small type is the fastest way to make that unpleasant.

- **Display** (`--font-display`, Bricolage Grotesque): headlines only. A humanist grotesque with real character, chosen so headlines are recognisable rather than default-serif "premium." Bold weights, tight tracking (`-0.02em` to `-0.035em`), never used for body copy.
- **UI/body** (`--font-ui`, Instrument Sans): everything you read for more than a sentence — paragraphs, labels, nav, buttons. Chosen to disappear, not to look expensive.
- **Mono** (`--font-mono`, Geist Mono): **numerals only** — tabular figures, prices, dates in data tables. Never a label font. Thin uppercase mono labels with wide letter-spacing are one of the clearest tells of a generated finance site; this system does not use them.

Paragraph measure is capped at `--measure` (68ch / `max-w-measure`). Eyebrows (`.eyebrow` / `.tag`) are sentence case at 13px with a short green underline mark, not tracked-out uppercase.

---

## 3. The Signature Mark

The **step-rule** — three ascending bars ([`StepRule.tsx`](components/ui/vsc/StepRule.tsx), also expressed as CSS in `.step-rule`) — is the one graphic motif that should read as "VSC" without the logotype attached. It stands for measured, stepwise growth, which is what the firm actually does. Use it at section joins, beside pull quotes, and inside the footer's easter egg. It is allowed to recur often, because it means something specific — everything else on the page has to earn its place individually.

Do not invent a second competing motif (no radial glows, no gold hairline dividers, no grid-overlay backgrounds as decoration) without updating this document first.

---

## 4. Space & Layout

- Sections use `--section-pad` (`clamp(72px, 9vw, 128px) 0`) — generous, but not the old 120px-everywhere rule; let content density inform the exact figure.
- Container max-width is `1200px` (`--container`); most homepage content sits inside `max-w-[1120px]` for a slightly tighter reading column.
- Section joins are a single hairline (`.vsc-section::after`, `var(--rule)`) full-bleed — not a glowing gradient seam.
- No lorem-ipsum, no placeholder sections. Every section answers exactly one question and stops (see §6).

---

## 5. Motion — Physical, Not Decorative

Motion communicates an idea or it doesn't run. The default entrance is [`Reveal`](components/ui/vsc/Reveal.tsx) — a small spring (14px travel, `stiffness: 140, damping: 20`) — not a fade. A fade is a dissolve: the element was never anywhere, then it's at full opacity. A spring is an arrival: it has mass, travels a short distance, settles. Reading a page built on springs feels like moving through a space; a page built on fades feels like flipping slides.

- No bouncing, spinning, or high-velocity transitions.
- Every hover communicates interactivity: buttons lift 2px and darken to `--growth-deep`; cards lift 3–4px and gain shadow (`--lift-3`); links underline or shift colour, nothing more elaborate.
- `.fade-up` still exists in `globals.css` for pages not yet migrated off it. New work uses `Reveal`, not `.fade-up`.
- `prefers-reduced-motion: reduce` collapses all animation/transition durations to near-zero globally (see the media query at the bottom of `globals.css`) — this is enforced once, centrally, not per-component.

---

## 6. Layout Philosophy — Show, Don't Table

Reduce text. Increase understanding. Where the old system explained a concept with a paragraph or a ✕/✓ comparison table, prefer:

- **A drawn shape** over an adjective list — see [`DrawdownStory.tsx`](components/sections/home/DrawdownStory.tsx), which replaced a four-row "Most Investors vs VSC" table with two schematic capital curves. A reader doesn't have to take "disciplined execution" on faith when they can see where one line keeps falling and the other flattens.
- **A thing you operate** over a thing you read — see [`ExposureInstrument.tsx`](components/sections/home/ExposureInstrument.tsx), where the hero's central claim (exposure should answer to risk, in discrete steps not a smooth curve) is a slider you drag, not a sentence you're asked to believe.
- **A walked sequence** over a wall of cards — see [`ProcessStepper.tsx`](components/sections/home/ProcessStepper.tsx): one stage viewable at a time, real `tablist`/`tabpanel` semantics, keyboard-navigable, rather than five simultaneous cards competing for attention.

Every section states one message and gets out of the way. If a section needs a sub-heading to explain what its own heading meant, the section is doing too much.

---

## 7. Accessibility & Standards

- Full keyboard focus ring enforced globally via `:focus-visible` in `globals.css` (`outline: 2px solid var(--growth)`) — components should not redeclare their own focus styles unless genuinely custom.
- Interactive custom controls (the exposure slider, the process stepper) implement real ARIA roles (`role="tablist"`, `aria-live`, `aria-describedby`) and full keyboard support (arrow keys, Home/End), not just mouse handlers.
- Minimum 44–48px touch targets on all interactive elements.
- `color-scheme: light` is set explicitly in `globals.css` — this is an intentionally light-only system, not a dark theme with a light variant bolted on.

---

## 8. Rollout Status

The token layer (`globals.css`, `tailwind.config.ts`), fonts (`app/layout.tsx`), and the homepage (`app/page.tsx` and its section components) are fully on Daylight Growth as of this revision. Pages not yet re-composed (About, Offerings, Blog, FAQ, Enquire) have had their colours mechanically retargeted onto the new tokens so they remain legible and coherent — but their *layouts* still reflect the old card-heavy, gold-bordered composition and should be treated as due for the same section-level rework described in §6 when next touched. Deprecated colour aliases (`accent-gold`, `bg-primary`, `text-secondary`, etc.) exist in both token files specifically to keep those pages working in the meantime; do not use them in new components, and remove them once every page has moved off them.
