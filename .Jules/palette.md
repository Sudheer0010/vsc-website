## 2024-05-24 - Dynamic ARIA labels for Image Lightboxes
**Learning:** When a button's primary purpose is to enlarge an image, its accessible name shouldn't just be the image's `alt` text. The `alt` text describes the image, not the action. Screen readers will just read "[Alt text], button".
**Action:** When a trigger button wraps an image to enlarge it, dynamically construct the `aria-label` to incorporate the child content's context AND the action (e.g. `aria-label={\`Enlarge image: ${alt}\`}`) to ensure screen readers convey both the action and the context.
