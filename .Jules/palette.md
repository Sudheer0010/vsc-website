## 2026-10-30 - ImageLightbox Accessibility

**Learning:** Any trigger button that opens a dialog or enlarged view (e.g., Image Lightbox) must have an explicit `aria-label` and `aria-expanded` attribute tracking its state. If the button wraps contextual content like an image, the `aria-label` must dynamically incorporate the child content (e.g., `aria-label={`Enlarge image: ${alt}`}`) to prevent the screen reader from ignoring the original context.

**Action:** Ensure all ImageLightbox triggers and similar dialog triggers include these ARIA attributes.
