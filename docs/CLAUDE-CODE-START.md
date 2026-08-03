# Starting with Claude Code on vsc-website

A practical setup for working through `docs/ACTIONS.md`. Written for the repo as
it stands — Next.js 16, Tailwind, one developer.

---

## 1 · Install

Claude Code is a native binary. It does **not** need Node to run (your project
does, but that's separate).

```bash
# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# or, if you prefer a package manager
brew install --cask claude-code
winget install Anthropic.ClaudeCode
```

Check it landed:

```bash
claude --version
```

Then start it from the repo root — always the repo root, never a subfolder:

```bash
cd path/to/vsc-website
claude
```

First run walks you through signing in. A Pro or Max subscription covers usage;
an API key bills per token instead.

---

## 2 · What your repo already gives it

You're better set up than most. `CLAUDE.md` in your root contains `@AGENTS.md`,
which is import syntax — so `AGENTS.md` loads automatically at session start.
That file already tells Claude Code two important things: that this Next.js
version differs from its training data and it must read
`node_modules/next/dist/docs/` before writing, and that `npm run build` must pass
with zero TypeScript and ESLint errors.

Leave both files alone. Add one line to `AGENTS.md` so every session knows the
work queue exists:

```markdown
## Current work
Tasks are tracked in `docs/ACTIONS.md`, identified as M1–M9 and S1–S15.
Implement one task per session. Never batch tasks — they share files.
```

Verify it's loading with `/context` once you're in — you'll see your CLAUDE.md
listed with its token count.

---

## 3 · Three files to add before you start

### `docs/ACTIONS.md`
The work queue. Already written.

### `scripts/audit.mjs`
Turns the audit's acceptance criteria into a command. It checks contrast, type
size, tap targets, horizontal overflow, and greps the source for published
returns, hardcoded read-times, duplicate contact addresses and missing routes.
Exits non-zero on failure, so Claude Code can verify its own work instead of
telling you it's done.

```bash
npm i -D playwright
npx playwright install chromium
```

Add to `package.json`:

```json
"scripts": {
  "check": "node scripts/audit.mjs http://localhost:3000"
}
```

Run it once now, before you change anything, so you have a baseline:

```bash
npm run build && npm run start &
npm run check
```

It will fail loudly. That's the point — every failure is an item in
`ACTIONS.md`, and the list shrinks as you work.

### `.claude/settings.json`
Pre-approve the safe commands so you aren't clicking "allow" fifty times, and
block the ones you want to run yourself.

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run build)",
      "Bash(npm run lint)",
      "Bash(npm run check)",
      "Bash(git diff *)",
      "Bash(git status *)",
      "Bash(git log *)"
    ],
    "deny": [
      "Bash(git push *)",
      "Bash(rm -rf *)",
      "Bash(npm publish *)"
    ]
  }
}
```

Denying `git push` matters. You want to read every diff before anything reaches
production.

---

## 4 · A custom command for the workflow

Save as `.claude/commands/vsc-task.md`. Then `/vsc-task M4` runs the whole loop
with the rules attached, every time, without you retyping them.

The file is supplied alongside this guide.

---

## 5 · The loop

Same six steps for every task.

```bash
git checkout -b fix/m4-mobile-cta
claude
```

Then, in the session:

```
/vsc-task M4
```

Claude Code will propose a plan before touching anything. **Read the plan.** If
it lists files outside the task's `Files` line, say so and make it narrow the
scope — that's the single most common failure mode.

After it reports done:

```
/diff
```

Read the actual diff, not the summary. Then leave the session and verify
yourself:

```bash
npm run build
npm run check
git commit -am "M4: fix mobile drawer CTA contrast"
```

Push when you're satisfied. Then `/clear` before the next task — a fresh context
per task is both cheaper and more accurate than one long session that remembers
five unrelated jobs.

---

## 6 · Your first session, verbatim

Start with **M4**. It's fifteen minutes, it's pure CSS, no decisions are
involved, and it repairs your primary mobile conversion path.

```
> /vsc-task M4
```

If you'd rather not install the custom command yet, paste this instead:

```
Read docs/ACTIONS.md and implement task M4 only.

Context: .drawer-links a at app/globals.css:550 overrides .nav-cta at :416 on
specificity, so the mobile drawer's Enquire Now button renders #94A3B8 on
#C9A84C — 1.12:1 contrast. Also raise the drawer panel background opacity; the
hero currently reads through the menu items.

Constraints:
- Touch only app/globals.css.
- Do not refactor anything else you notice.
- Run `npm run build` and confirm zero errors.
- Then show me `git diff` and stop.
```

Expect a two-line change. If the diff is longer than about fifteen lines,
something went wrong — `/rewind` and try again with tighter wording.

---

## 7 · The four tasks that need nothing from you

Do these first, in one afternoon. No decisions, no lawyer, no content.

| Task | What | Rough time |
|------|------|-----------|
| **M4** | Mobile CTA contrast | 15 min |
| **M9** | One contact address, sourced from a single constant | 15 min |
| **M8** | Pick 2% or 1.5% and make it consistent | 20 min |
| **M7** | Compute read-times or delete them | 45 min |

Separate branch each. `npm run check` after each. By the end of the day four
items are closed and you've learned the loop on changes that can't hurt you.

---

## 8 · Where Claude Code must stop and ask

The `[YOU]` and `[LEGAL]` tags in `ACTIONS.md` are not advisory.

- **M6 — founder identity.** If it drafts a biography, that's a failure. It
  cannot know your years in markets, your worst drawdown, or your city.
- **M3 — privacy, terms, disclaimer.** It scaffolds the routes. A securities
  lawyer writes the words. Model-generated legal text on a site with a pending
  SEBI application is a bad trade at any price.
- **M1 and M2 — returns and advisory language.** Same reason. It can execute the
  schema change once you've decided; it should not decide.
- **S8 — pricing.** It doesn't know your numbers and shouldn't guess a band.

If it produces content for any of these unprompted, `/rewind` and re-scope. A
model filling a gap with plausible text is exactly how a fabricated founder story
ends up on a financial services site.

---

## 9 · Undoing things

Claude Code checkpoints your files before each prompt automatically.

- `/rewind`, or press **Esc twice** with an empty input, opens the menu.
- You can restore code only, conversation only, or both.
- **Bash-driven changes are not checkpointed** — only edits Claude made through
  its own file tools. That's why every task gets its own branch: git is the real
  safety net, `/rewind` is the convenience.

---

## 10 · Keeping it cheap and accurate

| Command | When |
|---------|------|
| `/clear` | Between tasks. Free, and it stops old context confusing new work. |
| `/context` | When responses drift — shows what's eating the window. |
| `/compact` | Long single task that must keep going. `/compact focus on the diff` |
| `/usage` | Check cost before you `/clear` — clearing resets the counter. |
| `/model` | Drop to Sonnet for mechanical tasks like M7 and M9. |
| `Shift+Tab` | Cycle permission modes. Useful once you trust a task. |

Two habits do most of the work: one task per session, and `/clear` between them.

---

## 11 · Suggested first two weeks

```
Day 1     M4 · M9 · M8 · M7            code only, no decisions
Day 2     run `npm run check`, confirm four failure classes are gone
Week 1    M1 step 1 (delete Monthly Return) — five minutes, do it early
          brief the lawyer on M1 / M2 / M3 in one conversation
          write your M6 founder facts on paper before opening Claude Code
Week 2    M5 + S5 together (letter routes + modal accessibility)
          S1 · S2 · S3 · S12 · S13 as one design-system pass
```

`npm run check` should be closer to passing at the end of each week. When it goes
green, the credibility project is done and the redesign conversation can start on
solid ground.

---

## One thing worth saying

Claude Code is very good at the mechanical items on this list and genuinely
unreliable at knowing when it should stop. It will happily "improve" a component
you didn't ask it to touch, and it will write a confident paragraph about your
trading history if you leave it room. The narrow-scope prompt and the one-task
branch aren't bureaucracy — they're the whole technique.
