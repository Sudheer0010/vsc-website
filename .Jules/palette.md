## 2026-10-25 - Dynamic ARIA Labels on Wrapping Buttons
**Learning:** When a button wraps contextual content like an image, simply adding a static ARIA label will cause screen readers to ignore the rich child content (like the image's alt text). A dynamic label that incorporates the child's text prevents context loss.
**Action:** Always combine the action verb with the child's contextual string (e.g., `Enlarge image: ${alt}`) for wrapping triggers.
