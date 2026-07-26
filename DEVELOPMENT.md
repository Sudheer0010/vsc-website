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
