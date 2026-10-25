## 2026-10-21 - Dynamic ARIA labels for image triggers
**Learning:** When a trigger button (like an Image Lightbox) wraps contextual content such as an image, applying a static aria-label or omitting it can cause screen readers to ignore the original context (the image's alt text).
**Action:** Always dynamically incorporate the child content's context into the button's aria-label (e.g., aria-label={`Enlarge image: ${alt}`}).
