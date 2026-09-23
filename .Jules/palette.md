## 2026-09-23 - Contextual Trigger Labels
**Learning:** When a button triggers an action (like a dialog or lightbox) for contextual child content such as an image, simply adding a static `aria-label` (e.g. 'Enlarge image') can overwrite and hide the rich context of the child content (like the image's `alt` text) from screen readers. This breaks the meaning of the button for non-visual users.
**Action:** Always dynamically incorporate the child content's context into the wrapper button's label, e.g., `aria-label={\`Enlarge image: ${alt}\`}`.
