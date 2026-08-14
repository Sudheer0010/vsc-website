# Website Changes — Implementation Spec

Hand this to Codex as a single task document. Each section is one unit of work.
Do them in order. Each should be testable before moving to the next.

---

## Task 1: Email Capture Component

Create a reusable email capture component. It will be used in five places
across the site with slightly different context lines.

### Props

```typescript
interface EmailCaptureProps {
  context?: string;       // optional line shown above the form
  variant?: 'default' | 'minimal' | 'footer';
  className?: string;
}
```

### Structure

```
[context line, if provided]

Market observations and one monthly letter.
How the market is behaving, what it means for process,
and where the reading breaks down. No tips. No noise.

[email input] [Subscribe button]

We respect your attention. Unsubscribe anytime.
```

### States

- **Default:** form visible
- **Loading:** button shows a subtle spinner, input disabled
- **Success:** form replaced with "You're in. Check your inbox." — no confetti, no animation, just the text
- **Error:** inline message below the input: "Something went wrong. Try again."

### Design rules

- Match the existing site's type sizes, colours, and spacing exactly
- The proposition text uses the site's body text style, slightly muted
- Input field: full width on mobile, ~380px on desktop, single line
- Button: site's existing button style. Text: "Subscribe"
- No border or background on the component itself — it sits flush within the page
- The "unsubscribe" line is the smallest text size on the site, muted

### Backend

For now, the form should POST to an API route `/api/subscribe` with `{ email }`.
Create the route as a stub that:
1. Validates the email format
2. Returns 200 with `{ success: true }`
3. Logs the email to console (actual email platform integration comes later)
4. Returns 400 for invalid email
5. Has rate limiting: max 3 submissions per IP per hour

The stub will be replaced with a real MailerLite or Buttondown integration later.
Don't install either platform's SDK yet.

---

## Task 2: Place the Email Capture in Five Locations

### Placement 1 — End of every Research Note

After the framework link section, before any related-notes module.

Context line: `"This note is part of an ongoing research series."`

### Placement 2 — End of every Framework page

After the framework content ends.

Context line: `"Frameworks are revised as the market teaches us something. Subscribers get the revision and the reason."`

### Placement 3 — Homepage

One quiet horizontal band in the lower portion of the homepage, above the
footer. Not a hero section, not competing with the main positioning.

Context line: none — the proposition text carries it.

### Placement 4 — `/letter` page (new page, see Task 3)

Uses the default variant with no context line.

### Placement 5 — Footer

Uses the `footer` variant: just the email input, the button, and the
proposition in one compact line. No context line. No "unsubscribe" line.
Present on every page.

### Important

- The component must appear ONCE per page even if multiple placements could
  render (e.g., a research note page should show the end-of-note placement,
  the footer placement, but NOT duplicate the end-of-note block)
- Never put the capture in the middle of content. Always at the end.
- Never make it sticky, floating, or overlaying content.

---

## Task 3: Create the `/letter` Page

This is the canonical subscribe destination. LinkedIn posts will link here.

### URL
`/letter`

### Structure

```
VSC Market Letter
[one-line description: "A monthly letter on what the market did,
what the process observed, and what surprised us."]

---

[Last 3 market letters displayed as cards/excerpts]
Each card shows:
  - Month and year
  - The one-sentence thesis (if available in the letter metadata)
  - First 2-3 sentences of the letter body
  - "Read the full letter →" link to the letter page

---

[Email capture component — default variant, no context line]

---

[Optional: "What arrives" section]
"Subscribers receive:
• Each month's Market Letter on the first working day
• Research Notes as they're published (2–4 per month)
• Framework revisions when they happen

That's it. Roughly 3–5 emails per month."
```

### Design

- Clean, minimal, consistent with the rest of the site
- The letter excerpts are the selling — people should be able to read enough
  to judge quality before subscribing
- No testimonials, no social proof counters, no urgency
- Mobile-first layout

---

## Task 4: Related Notes Module

A component that appears at the end of every Research Note, showing 2–3 other
notes the reader might want.

### Structure

```
Related Notes
---
[Note card] [Note card] [Note card]

Each card:
  - Title
  - Date
  - One-line description or first sentence
  - Framework tag (which framework this note feeds)
  - Links to the full note
```

### Selection logic

Prioritise notes that share the same framework tag. If fewer than 3 share the
tag, fill with the most recent notes. Never show the current note.

### Placement

After the email capture block at the end of the note. The reading flow is:

```
Note content
  → Framework link (already exists)
  → Email capture
  → Related notes
```

---

## Task 5: "Seen in Practice" Module on Framework Pages

A section at the bottom of every Framework page showing Research Notes that
applied this framework.

### Structure

```
Seen in Practice
---
[Note entry] — one per line or as compact cards
Each shows:
  - Note title
  - Date
  - One sentence: what this note demonstrated about the framework
  - Link to the note

Maximum 5 entries. Most recent first.
```

### Data

This requires a way to tag research notes with their framework reference. If
notes already have framework metadata, use it. If not, add a `framework` field
to the note's frontmatter/metadata that accepts one of:
`01-market-environment`, `02-opportunity-universe`, `03-setup-grading`,
`04-sizing`, `05-trade-management`.

### Placement

After the framework content, before the email capture block. The reading flow
on a framework page is:

```
Framework content
  → Seen in Practice (notes that used this framework)
  → Email capture
```

---

## Task 6: "Data as of" Indicator

Not for the dashboard (that project is shelved). This is for the Market Letter
archive and Research Notes archive pages.

Add a small, muted line at the top of the notes archive and letters archive
showing when the most recent piece was published:

```
Latest: [title] — [date]
```

This tells a returning visitor immediately whether there's something new since
their last visit, without them scanning the full list.

---

## Task 7: "Start Here" Curated Reading Path

Create a `/start` page (or section accessible from the homepage and navigation)
that gives a new visitor a guided sequence.

### Structure

```
Start Here
---
If you're new to VSC, these five pieces explain how we think
and what this research is for.

1. [Framework 01 — Market Environment]
   "Before deciding what to buy, decide whether conditions
   favour buying at all."

2. [Framework 04 — Sizing]
   "The position size is the smallest number that satisfies
   three constraints simultaneously."

3. [Best Research Note — title]
   "An example of VSC thinking applied to a specific market
   behaviour."

4. [Most recent Market Letter — title]
   "What the process observed and did last month."

5. [Framework 05 — Trade Management]
   "The market earns every adjustment."

Each entry: title, one-sentence description, link.
```

### Placement

- Linked from homepage (a subtle "New here? Start here →" line)
- Linked from the About page
- Accessible from navigation if there's a natural place

### Important

The sequence is manually curated, not auto-generated. These five pieces should
be the strongest representation of VSC's thinking. They can be updated manually
when better pieces exist.

---

## Implementation Notes

### Order of work

1. Email capture component (Task 1) — everything else depends on this
2. Placements (Task 2) — the component needs to be live
3. `/letter` page (Task 3) — the first link we'll share on LinkedIn
4. Related notes module (Task 4) — improves depth of visit
5. Seen in practice (Task 5) — connects frameworks to notes
6. Latest indicator (Task 6) — quick win
7. Start here (Task 7) — can wait until there are more notes

### What NOT to build

- Login / sign-in / Google auth — not needed, adds friction
- Comments section — too early, no moderation capacity
- Search — not enough content yet to justify
- Newsletter archive page separate from the letters page — redundant
- Social share buttons — they don't work for this audience
- Cookie consent banner — not needed if using privacy-friendly analytics
  (confirm based on your analytics setup)
- Dark/light mode toggle — the site has a design; keep it
