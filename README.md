# VSC Capital & Advisory — Website

Public research site for VSC Capital & Advisory: five published trading frameworks, a monthly Market Letter archive, and Research Notes. See [PRODUCT.md](PRODUCT.md) for the full product and business context.

Built with Next.js 16 (App Router), React 19, and Tailwind CSS.

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Windows, double-clicking `start-dev.bat` does the same (installs dependencies if needed, starts the dev server, opens the browser). See [DEVELOPMENT.md](DEVELOPMENT.md) for VS Code tasks and launch configurations.

## Where to look

- [ARCHITECTURE.md](ARCHITECTURE.md) — technical map: stack, routes, data model, component layers
- [DEVELOPMENT.md](DEVELOPMENT.md) — local dev workflow
- [AGENTS.md](AGENTS.md) — rules for AI coding agents working in this repo (also loaded via [CLAUDE.md](CLAUDE.md))
- [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) — visual system authority
- [PRODUCT.md](PRODUCT.md) — product and business facts

## Verification commands

```bash
npm run typecheck    # tsc --noEmit
npm run lint          # eslint
npm run test          # vitest run
npm run build         # next build
npm run check         # all four, in order — required before calling any change done
```
