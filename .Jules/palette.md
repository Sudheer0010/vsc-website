## 2025-02-23 - Contextual ARIA labels on wrapper buttons
**Learning:** Any trigger button that opens a dialog or enlarged view (e.g., Image Lightbox) and wraps contextual content like an image needs an explicit `aria-label`. If omitted, screen readers may ignore the original contextual `alt` text.
**Action:** The `aria-label` must dynamically incorporate the child content (e.g., `aria-label={"Enlarge image: ${alt}"}`) to prevent the screen reader from ignoring the original context when announcing the button.
