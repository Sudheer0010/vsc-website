## 2026-11-03 - Dynamic ARIA Labels on Content-Wrapping Buttons
**Learning:** When a button wraps contextual content like an image to trigger a lightbox or dialog, screen readers may ignore the child image's context if the button lacks an explicit aria-label.
**Action:** Always provide an explicit `aria-label` (e.g., dynamically incorporating the child's alt text like `Enlarge image: ${alt}`) and an `aria-expanded` attribute on trigger buttons that open enlarged views.
