## 2026-09-05 - Accessibility for trigger buttons
**Learning:** Any trigger button that opens a dialog or enlarged view (e.g., Image Lightbox) must have an explicit `aria-label`. If the button wraps contextual content like an image, the screen reader might ignore the original context if a generic label is used.
**Action:** The `aria-label` must dynamically incorporate the child content (e.g., `aria-label={"Enlarge image: " + alt}`) to prevent the screen reader from losing context.
