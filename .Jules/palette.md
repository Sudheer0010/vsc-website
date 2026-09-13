## 2026-09-13 - Context-Aware ARIA Labels for Image Buttons
**Learning:** When a button's primary function is to trigger an action (like a lightbox) on a child image, placing an empty `aria-label` or generic label on the button causes screen readers to ignore the rich context of the image's `alt` text. The button itself must carry the context.
**Action:** Dynamically incorporate the child image's `alt` text into the wrapper button's `aria-label` (e.g., `aria-label={Enlarge image: ${alt}}`) so context is announced when focusing the trigger.
