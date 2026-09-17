## 2024-05-23 - Contextual ARIA labels on wrapper buttons
**Learning:** When a button wraps contextual content like an image (e.g., an Image Lightbox trigger), assigning a static ARIA label to the button hides the child image context from screen readers.
**Action:** Use dynamic `aria-label` attributes that incorporate the child content description, such as `aria-label={\`Enlarge image: ${alt}\`}`.
