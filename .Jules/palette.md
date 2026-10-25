## 2025-02-28 - Image Lightbox Accessibility
**Learning:** Standalone image trigger buttons (like click-to-enlarge) must dynamically incorporate the child image's `alt` text into their own `aria-label`. Otherwise, the screen reader announces "button" but strips the original image context, causing information loss.
**Action:** Always combine the button's action description with the child content's description (e.g., `aria-label={\`Enlarge image: ${alt}\`}`) for contextual image triggers.
