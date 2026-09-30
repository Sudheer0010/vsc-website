## 2023-10-24 - Dynamic ARIA Labels for Wrapper Buttons
**Learning:** When a button wraps contextual content like an image, the screen reader may ignore the original context if the button itself lacks an accessible name or if its `aria-label` is too generic.
**Action:** Always dynamically incorporate the child content's description (e.g., the image's `alt` text) into the wrapper button's `aria-label` (e.g., `aria-label={\`Enlarge image: ${alt}\`}`) to prevent context loss for screen reader users.
