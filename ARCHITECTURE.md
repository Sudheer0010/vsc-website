# Architecture

Technical map for agents and developers. Not a handbook — see [DEVELOPMENT.md](DEVELOPMENT.md) for workflow and [PRODUCT.md](PRODUCT.md) for business facts.

## Stack

- Next.js 16.3.2, App Router
- React 19.2.4
- Tailwind CSS 3.4
- TypeScript, strict mode
- Vitest for unit tests, Playwright for browser automation

## Routes (`app/`)

App Router, one folder per route. Main taxonomy:

- `app/frameworks` — the five-framework Decision Pipeline (public research)
- `app/letters` — Market Letter archive and detail pages
- `app/letter` — subscribe/landing page
- `app/research` — Research Notes
- `app/reading` — reading desk / tools
- `app/tools` — calculator tools (position size, risk-reward, etc.)
- `app/offerings`, `app/about`, `app/faq`, `app/enquire`, `app/privacy`, `app/start` — static/marketing pages
- `app/api` — route handlers (e.g. `/api/subscribe`)
- `app/not-found.tsx`, `app/sitemap.ts` — framework-level routes

## Data layer (`data/*.ts`)

All public content — frameworks, FAQ, market letters, research notes, reading desk entries, newsletter copy, site config — is authored as typed TypeScript modules under `data/`, not fetched from a CMS or database. This is the content model: to change published content, edit the relevant `data/*.ts` file.

## Domain logic (`lib/calculators`)

Pure, side-effect-free functions (position sizing, risk-reward, drawdown recovery, portfolio risk, trading expectancy). Each has a matching `*.test.ts` file run via Vitest (`npm run test`). Treat this as the one place business math lives — UI components should call these, not reimplement the arithmetic.

## Components

- `components/ui` — primitives, including `components/ui/vengeance/` (unmodified third-party Vengeance UI components) and VSC wrapper components that adapt them to design tokens
- `components/sections` — page-section-level composites (homepage, framework pages, letters)
- `components/cards` — card-style content units
- `components/forms` — form components (enquiry, subscribe)
- `components/layout` — Navbar, Footer, shell
- `components/tools` — calculator UI
- `components/providers` — context/providers

## Design system

[DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) is the sole visual authority ("Daylight Growth"). Tokens live in `app/globals.css` (`:root`) and are mirrored in `tailwind.config.ts`. Do not hardcode colors, spacing, or type values in components.

## External boundaries

- **Netlify** — build and hosting (`netlify.toml`, `@netlify/plugin-nextjs`); also owns marketing redirects (`/go/*`)
- **MailerLite** — subscriber management (`lib/mailerlite/`, `scripts/mailerlite-baseline-publications.ts`)
- **Google Analytics** (gtag.js) — loaded in `app/layout.tsx`

No other external services are integrated.

## Not present

There is **no database, no authentication, no user accounts, and no private/server-side persistence** anywhere in this codebase. All content is static TypeScript data or statically-rendered pages. `/api/subscribe` and similar routes call external services (MailerLite) directly; they do not read or write local storage.

## Verification

`npm run check` = `typecheck && lint && test && build`, in that order. This is the required gate before any code change is considered done — see [package.json](package.json) `scripts.check`.
