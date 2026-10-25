## 2024-10-09 - Image Lightbox Screen Reader Context
**Learning:** When a button acts as a trigger to open an enlarged view (like a lightbox) and purely wraps an image, screen readers will often announce it generically (e.g. just 'button') and ignore the child image's alt text, removing the context of what the user is enlarging.
**Action:** Always provide an explicit `aria-label` on the wrapping trigger button that incorporates the child content's description, e.g., `aria-label={\`Enlarge image: ${alt}\`}`.
