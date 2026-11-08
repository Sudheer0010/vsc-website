## 2026-11-08 - Dynamic ARIA Labels on Trigger Buttons

**Learning:** When a trigger button (like an Image Lightbox trigger) wraps contextual content such as an image, simply adding `aria-haspopup` is insufficient. Screen readers will often ignore the wrapped image's alt text or context if the button itself lacks a descriptive label.
**Action:** Always dynamically incorporate the wrapped child content's context into the button's `aria-label` (e.g., `aria-label={\`Enlarge image: ${alt}\`}`) and explicitly track the expanded state using `aria-expanded`.
