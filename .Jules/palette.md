## 2026-11-06 - Add dynamic ARIA label to ImageLightbox trigger
**Learning:** Trigger buttons that wrap contextual content (like images) need dynamic `aria-label` attributes incorporating the child content (e.g., `Enlarge image: ${alt}`) so the screen reader context isn't lost, along with `aria-expanded` tracking the modal state.
**Action:** Always verify if a trigger button for a dialog/lightbox has dynamic labels if it wraps images or other rich content.
