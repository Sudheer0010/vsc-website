## 2026-09-07 - [Contextual Wrapping in ARIA Labels]
**Learning:** When a trigger button (like a lightbox zoom) wraps contextual content such as an image, simply adding `aria-haspopup="dialog"` is insufficient. The `aria-label` on the button must dynamically incorporate the child content (e.g., `Enlarge image: ${alt}`) otherwise the screen reader will ignore the wrapped original context.
**Action:** Ensure that UI elements which act as interactable wrappers for primary content always mirror or describe their child's context in their own ARIA labels.
