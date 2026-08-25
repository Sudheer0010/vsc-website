# VSC Capital - Local Development

This guide documents the automated local development workflows for running, testing, and formatting the codebase.

---

## Daily Workflow

1. **Open the project folder** in VS Code.
2. **Double-click** the `start-dev.bat` file in the project root.
3. **Wait ~5 seconds** for dependencies to verify and the server to start.
4. **The browser opens automatically** at `http://localhost:3000` once the server is ready.
5. **Edit code files** and press `Ctrl + S` — the browser updates instantly.

---

## Alternative VS Code Workflows

### Option A: VS Code Task (Start Dev Server)
- Open VS Code.
- Press `Ctrl + Shift + B` (runs the default Build task: `Start Development Server`).
- This boots Next.js in a dedicated panel.

### Option B: VS Code Launch Configuration (Chrome or Edge)
- Open VS Code.
- Press `F5` (or go to the Run & Debug tab and select `Launch Chrome at Localhost` or `Launch Edge at Localhost`).
- This will:
  1. Run the `Start Development Server` task automatically.
  2. Launch Chrome or Microsoft Edge once the port is active.
  3. Attach the debugger to the browser tab.

---

## Automation Configurations

The following files govern this workflow automation:
- **`start-dev.bat`**: Installs missing dependencies (`npm install`), launches Next.js dev server in the background, polls the localhost port using PowerShell, and opens the default browser.
- **`.vscode/tasks.json`**: Standardizes shell tasks (`Install Dependencies` and `Start Development Server`) running from the root directory.
- **`.vscode/launch.json`**: Maps browser testing parameters for debugger launches.
- **`.vscode/settings.json`**: Implements format-on-save, 1-second auto-save delays, ESLint fixes, import organizations, and Tailwind class sorting.

---

## UI Audit (`npm run audit:ui`)

`scripts/audit.mjs` drives a real Chromium browser over a fixed, representative
set of routes and checks things `npm run check` cannot, because they need a
rendered page rather than source text:

- text contrast (WCAG AA: 4.5:1 normal text, 3:1 large text)
- minimum rendered text size (12px floor)
- minimum mobile interactive hit area (44px, per [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) §7)
- horizontal overflow at desktop and mobile widths
- one `<h1>` per page and a `lang` attribute on `<html>` (warnings only)
- images missing `alt` text (warning only)

It is **not** part of `npm run check` — it needs a running server and a
Chromium binary, which is a different, slower shape than the static gate.

**Prerequisites (one-time):**

```powershell
npx playwright install chromium
```

**Usage** — the app must already be running locally before you audit it:

```powershell
npm run build; npm run start
```

Then, in a second terminal:

```powershell
npm run audit:ui
```

To audit a different port or a dev-mode server:

```powershell
npm run dev
```

```powershell
node scripts/audit.mjs http://localhost:3000
```

Exits non-zero on any failure, so it can also be used as a CI gate.
