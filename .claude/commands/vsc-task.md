---
argument-hint: <task id, e.g. M4 or S3>
description: Implement one task from docs/ACTIONS.md with scope guards and verification
---

Implement task **$ARGUMENTS** from `docs/ACTIONS.md`. That task only.

## Before you write anything

1. Read `docs/ACTIONS.md` and locate task `$ARGUMENTS`. If no task with that id
   exists, stop and tell me.
2. Read the task's **Files** line. That is your entire permitted scope. If the
   work genuinely cannot be done within those files, stop and tell me which
   additional file you need and why — do not just widen the scope.
3. Check the task's owner tags:
   - `[YOU]` — a decision only Sudheer can make. **Stop and ask for the value.**
     Do not invent a founder biography, a price, a drawdown figure, a date, or
     any other fact about the business.
   - `[LEGAL]` — scaffold routes and structure only. **Do not write the legal
     copy.** Leave a clearly marked placeholder and say so in your summary.
4. This repo runs a Next.js version that differs from your training data. Read
   the relevant guide in `node_modules/next/dist/docs/` before writing any
   routing, metadata, or server-component code, as `AGENTS.md` requires.
5. Show me your plan and wait for approval before editing.

## While implementing

- Change the minimum necessary to satisfy the acceptance criteria. If you notice
  another problem, **list it in your summary — do not fix it.** Unrelated fixes
  in the same diff are the main reason these reviews go wrong.
- Match the existing conventions in the files you're touching: component
  structure, Tailwind class ordering, token usage. Prefer existing design tokens
  over new literal values.
- Preserve accessibility attributes and responsive behaviour that already exist.

## Before you tell me you're done

Run all three and report the actual output, not a summary:

```bash
npm run build          # must be zero TypeScript and ESLint errors
npm run check          # typecheck + lint + test + build — report the actual result
git diff --stat
```

Then give me:

1. The acceptance criteria from the task, each marked met or not met, with the
   evidence for each.
2. Anything you noticed but deliberately did not touch.
3. Anything you were unsure about.

Do not commit. Do not push. I review the diff first.
