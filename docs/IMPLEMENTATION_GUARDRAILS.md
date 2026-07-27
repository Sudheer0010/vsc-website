# VSC Implementation Guardrails

> **Purpose**: Technical standards protecting implementation quality, accessibility, performance, SEO, and form reliability during the VSC Renaissance.

---

## 1. Performance Guardrails

- **Lighthouse Performance Target**: **95+** across desktop and mobile viewports.
- **Client JS Bundle Budget**: `< 100KB` initial gzipped JavaScript (zero unnecessary animation dependencies).
- **Largest Contentful Paint (LCP)**: `< 1.2s`.
- **Cumulative Layout Shift (CLS)**: **`0.00`** (strictly reserve image bounds and dynamic containers).
- **Maximum Animation Duration**: **`0.8s`** maximum (Tempo curve `cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 2. Accessibility Guardrails (WCAG AA Minimum)

- **Contrast Ratios**: Minimum 4.5:1 for body copy (`#A7A7AD` on `#060810`), 7:1 for display headings (`#F4F1EC`).
- **Keyboard Navigation**: 100% operable via `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Escape`. Visible gold focus rings (`ring-[#C9A84C]/50 outline-none`).
- **Screen Reader Standards**: Semantic HTML5 elements (`<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`), explicit `aria-expanded`, `aria-controls`, and `aria-label` attributes.
- **Reduced Motion**: Mandatory `prefers-reduced-motion: reduce` compliance across all client motion wrappers (instant 0s static rendering).

---

## 3. Engineering Architecture & Conventions

- **Server Components by Default**: Pages and static layout sections must be React Server Components (RSC). Use `"use client"` **only** when managing local state, event listeners, or Framer Motion hooks.
- **Component File Structure**: Keep VSC design system components cleanly organized under `components/ui/vsc/`.
- **Naming Conventions**: PascalCase for components (`EditorialHeading.tsx`, `ResearchLine.tsx`), camelCase for utility functions and hooks.
- **Zero Inline CSS Strings**: All styling must use predefined Tailwind CSS tokens or modular CSS in `globals.css`. Embedded `<style dangerouslySetInnerHTML>` is strictly forbidden.

---

## 4. SEO & Metadata Standards

- **Heading Hierarchy**: Exactly **one `<h1>` per page** representing the primary chapter thesis. Logical `<h2>` and `<h3>` nested hierarchy.
- **Canonical URLs**: Explicit `alternates.canonical` defined for every route.
- **Open Graph Metadata**: High-resolution OG image metadata (`1200x630`), Twitter card summary definitions.
- **Structured Data**: JSON-LD schema annotations for Organization (`VSC Capital & Advisory`) and Articles.

---

## 5. Form & Netlify Compatibility

- **Progressive Enhancement**: Native HTML `<form action="/thank-you" method="POST">` fallbacks.
- **Static Detection Sync**: All form fields in React components must match `public/__forms.html` definitions for Netlify build-time discovery.
- **AJAX State Handling**: Client-side submit handlers perform `fetch` POST to `/` with urlencoded form data, displaying inline confirmation (`NewsletterCTA`) or navigating to `/thank-you` (`DiscussionForm`).
- **Error Handling**: Graceful fallback to standard HTML submit if AJAX fetch fails.
