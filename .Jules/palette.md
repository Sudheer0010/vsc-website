## 2026-11-01 - Image Lightbox Accessibility
**Learning:** When a button triggers an enlarged view and wraps contextual content like an image, its `aria-label` must dynamically incorporate the child content (e.g., `aria-label={\`Enlarge image: ${alt}\`}`) to prevent the screen reader from ignoring the original context. It also must have an explicit `aria-expanded` attribute.
**Action:** Always add dynamic `aria-label`s and state-tracking `aria-expanded` attributes to trigger buttons for lightboxes/dialogs, ensuring focus rings are customized for accessibility.
