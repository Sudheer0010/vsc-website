## 2026-10-07 - Image Lightbox Accessibility
**Learning:** When a button wraps a context-rich element like an image, its `aria-label` entirely overrides the child content for screen readers. Simply adding an empty or generic aria-label will hide the image's `alt` text.
**Action:** Always dynamically incorporate the context of the child element (e.g., `aria-label={\`Enlarge image: ${alt}\`}`) to ensure screen readers don't ignore the original context.
