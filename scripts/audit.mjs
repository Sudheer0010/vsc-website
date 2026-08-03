#!/usr/bin/env node
/**
 * VSC site check — turns the audit's acceptance criteria into a repeatable test.
 *
 *   npm i -D playwright && npx playwright install chromium
 *   npm run build && npm run start &        # or: npm run dev
 *   node scripts/audit.mjs                  # defaults to http://localhost:3000
 *   node scripts/audit.mjs http://localhost:3100
 *
 * Exits non-zero if any check fails, so it works as a CI gate or a Claude Code
 * verification step. Thresholds match docs/ACTIONS.md.
 */

import { chromium } from 'playwright';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const BASE = process.argv[2] || 'http://localhost:3000';

const ROUTES = [
  '/', '/about', '/offerings', '/offerings/learning-hub',
  '/offerings/advantage', '/offerings/inner-circle',
  '/blog', '/faq', '/enquire',
];

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 390, height: 844, name: 'mobile' },
];

// Thresholds — edit these as standards tighten.
const MIN_CONTRAST_NORMAL = 4.5;   // WCAG AA
const MIN_CONTRAST_LARGE = 3.0;    // >=24px, or >=18.66px bold
const MIN_FONT_PX = 12;            // ACTIONS.md S2
const MIN_TAP_PX = 24;             // WCAG 2.2 AA, ACTIONS.md S4

const failures = [];
const warnings = [];
const fail = (rule, detail) => failures.push({ rule, detail });
const warn = (rule, detail) => warnings.push({ rule, detail });

/* ------------------------------------------------------------------ *
 * 1. Static source checks — no browser needed
 * ------------------------------------------------------------------ */

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (['node_modules', '.next', '.git', 'scripts'].includes(entry)) continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (['.ts', '.tsx', '.js', '.jsx'].includes(extname(p))) out.push(p);
  }
  return out;
}

function staticChecks() {
  let files;
  try {
    files = walk(process.cwd());
  } catch {
    warn('static', 'could not walk source tree; run from the repo root');
    return;
  }

  // M1 — no published return figures
  const returnHits = [];
  // M7 — no hardcoded read-times
  const readTimeHits = [];

  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    src.split('\n').forEach((line, i) => {
      if (/Monthly Return/.test(line)) returnHits.push(`${f}:${i + 1}`);
      if (/["'`]\s*\d+\s*(MIN READ|min read|minute read)/i.test(line)) {
        readTimeHits.push(`${f}:${i + 1}  ${line.trim().slice(0, 70)}`);
      }
    });
  }

  if (returnHits.length) fail('M1 published returns', returnHits.join('\n    '));
  if (readTimeHits.length) fail('M7 hardcoded read-time', readTimeHits.join('\n    '));

  // M5 — a letter route must exist
  const hasSlugRoute = files.some((f) => /app[\\/]blog[\\/]\[.*\][\\/]page\.tsx?$/.test(f));
  if (!hasSlugRoute) fail('M5 letter routes', 'no app/blog/[slug]/page.tsx found');

  // M9 — single contact address
  const emails = new Set();
  for (const f of files) {
    for (const m of readFileSync(f, 'utf8').matchAll(/[\w.+-]+@vsccapital\.in/g)) emails.add(m[0]);
  }
  if (emails.size > 1) fail('M9 contact addresses', [...emails].join(', '));

  // M3 — legal routes
  for (const route of ['privacy', 'terms', 'disclaimer']) {
    if (!files.some((f) => f.includes(join('app', route)))) {
      fail('M3 legal pages', `app/${route}/page.tsx missing`);
    }
  }
}

/* ------------------------------------------------------------------ *
 * 2. Rendered checks — contrast, type size, tap targets, overflow
 * ------------------------------------------------------------------ */

const PAGE_PROBE = `(() => {
  const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); };
    return 0.2126*f(c[0]) + 0.7152*f(c[1]) + 0.0722*f(c[2]); };
  const parse = (s) => { const m = s && s.match(/rgba?\\(([^)]+)\\)/); if (!m) return null;
    const p = m[1].split(',').map(parseFloat); return { c: [p[0],p[1],p[2]], a: p.length > 3 ? p[3] : 1 }; };
  const effBg = (el) => { let e = el;
    while (e) { const b = parse(getComputedStyle(e).backgroundColor); if (b && b.a >= 0.95) return b.c; e = e.parentElement; }
    return [255,255,255]; };
  const ratio = (a,b) => { const L1 = lum(a), L2 = lum(b), hi = Math.max(L1,L2), lo = Math.min(L1,L2); return (hi+0.05)/(lo+0.05); };

  const contrast = [], tiny = [], taps = [];

  // effective opacity: an ancestor fading a whole block still hides this node
  const effOpacity = (el) => { let o = 1, e = el;
    while (e && e !== document.documentElement) { o *= parseFloat(getComputedStyle(e).opacity); e = e.parentElement; }
    return o; };

  document.querySelectorAll('*').forEach((el) => {
    if (el.children.length || !el.textContent.trim()) return;
    if (el.closest('[aria-hidden="true"]')) return;              // decorative
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    if (effOpacity(el) < 0.1) return;   // mid scroll-reveal, not yet shown
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const fg = parse(cs.color); if (!fg) return;
    const bg = effBg(el);
    const col = fg.a < 1 ? [0,1,2].map(i => fg.c[i]*fg.a + bg[i]*(1-fg.a)) : fg.c;
    const fs = parseFloat(cs.fontSize), fw = parseInt(cs.fontWeight) || 400;
    const large = fs >= 24 || (fs >= 18.66 && fw >= 700);
    const cr = ratio(col, bg);
    const need = large ? ${MIN_CONTRAST_LARGE} : ${MIN_CONTRAST_NORMAL};
    const label = el.textContent.trim().slice(0, 44);
    if (cr < need - 0.01) contrast.push({ label, fs: Math.round(fs*10)/10, cr: Math.round(cr*100)/100, need });
    if (fs < ${MIN_FONT_PX}) tiny.push({ label, fs: Math.round(fs*10)/10 });
  });

  document.querySelectorAll('a[href],button,summary,input,select,textarea,[role=button]').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 1 && r.height < 1) return;
    if (r.height < ${MIN_TAP_PX} || r.width < ${MIN_TAP_PX}) {
      taps.push({ label: (el.textContent || el.getAttribute('aria-label') || el.name || '').trim().slice(0,30),
                  w: Math.round(r.width), h: Math.round(r.height) });
    }
  });

  const imgsNoAlt = [...document.querySelectorAll('img')]
    .filter(i => { const a = i.getAttribute('alt'); return a === null || a.trim() === ''; })
    .map(i => i.getAttribute('src') || '(inline)');

  return {
    contrast, tiny, taps, imgsNoAlt,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    h1: document.querySelectorAll('h1').length,
    title: document.title,
    lang: document.documentElement.lang,
  };
})()`;

async function renderedChecks() {
  // CHROMIUM_PATH lets you point at an existing Chrome/Chromium instead of
  // Playwright's download (useful in CI images that pre-bundle a browser).
  const launchOpts = process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : {};
  let browser;
  try {
    browser = await chromium.launch(launchOpts);
  } catch (e) {
    console.error('\n  Could not launch Chromium. Run:  npx playwright install chromium');
    console.error(`  (or set CHROMIUM_PATH to an existing binary)\n  ${e.message.split('\n')[0]}\n`);
    process.exit(2);
  }
  try {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.name === 'mobile',
        hasTouch: vp.name === 'mobile',
        reducedMotion: 'reduce',
      });

      for (const route of ROUTES) {
        const page = await ctx.newPage();
        let res;
        try {
          res = await page.goto(BASE + route, { waitUntil: 'load', timeout: 30000 });
        } catch (e) {
          fail('unreachable', `${route} — ${e.message.split('\n')[0]}`);
          await page.close();
          continue;
        }
        if (res && res.status() >= 400) fail('http', `${route} returned ${res.status()}`);

        await page.waitForTimeout(1500);
        // trigger scroll-reveal content so we measure what a real visitor sees
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForTimeout(900);
        await page.evaluate('window.scrollTo(0, 0)');
        await page.waitForTimeout(600);

        const r = await page.evaluate(PAGE_PROBE);
        const tag = `${route} @${vp.width}`;

        if (r.overflow) fail('horizontal overflow', `${tag} — ${r.scrollW}px in ${r.clientW}px`);
        if (r.contrast.length) {
          const worst = r.contrast.sort((a, b) => a.cr - b.cr).slice(0, 4)
            .map(c => `${c.cr}:1 (needs ${c.need}) ${c.fs}px "${c.label}"`).join('\n    ');
          fail('contrast', `${tag} — ${r.contrast.length} node(s)\n    ${worst}`);
        }
        if (r.tiny.length) {
          const sample = r.tiny.slice(0, 3).map(t => `${t.fs}px "${t.label}"`).join(' · ');
          fail('font size', `${tag} — ${r.tiny.length} node(s) under ${MIN_FONT_PX}px · ${sample}`);
        }
        if (vp.name === 'mobile' && r.taps.length) {
          const sample = r.taps.slice(0, 3).map(t => `${t.w}×${t.h} "${t.label}"`).join(' · ');
          fail('tap target', `${tag} — ${r.taps.length} under ${MIN_TAP_PX}px · ${sample}`);
        }
        if (vp.name === 'desktop') {
          if (r.imgsNoAlt.length) warn('alt text', `${route} — ${r.imgsNoAlt.join(', ')}`);
          if (r.h1 !== 1) warn('heading', `${route} — ${r.h1} h1 elements`);
          if (!r.lang) warn('lang', `${route} — missing lang on <html>`);
        }
        await page.close();
      }
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
}

/* ------------------------------------------------------------------ *
 * run
 * ------------------------------------------------------------------ */

console.log(`\nVSC site check — ${BASE}\n${'─'.repeat(60)}`);
staticChecks();
await renderedChecks();

if (warnings.length) {
  console.log(`\n  ${warnings.length} warning(s)\n`);
  for (const w of warnings) console.log(`  ~ ${w.rule}: ${w.detail}`);
}

if (failures.length === 0) {
  console.log(`\n  PASS — all checks clear.\n`);
  process.exit(0);
}

console.log(`\n  ${failures.length} failure(s)\n`);
const grouped = {};
for (const f of failures) (grouped[f.rule] ||= []).push(f.detail);
for (const [rule, details] of Object.entries(grouped)) {
  console.log(`  ✗ ${rule}`);
  for (const d of details) console.log(`    ${d}`);
  console.log('');
}
process.exit(1);
