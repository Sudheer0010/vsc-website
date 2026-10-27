## 2026-10-27 - Dynamic ARIA Labels on Wrapper Buttons
**Learning:** Any trigger button that opens a dialog (e.g., Image Lightbox) and wraps contextual content like an image must dynamically incorporate the child content (e.g., aria-label={`Enlarge image: ${alt}`}) to prevent the screen reader from ignoring the original context, and must track state using aria-expanded.
**Action:** Always ensure image wrappers that function as buttons preserve the image's alt text in their aria-label.
