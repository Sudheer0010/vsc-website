## 2026-08-28 - [Context-Aware ARIA Labels for Wrappers]
**Learning:** When a button wraps a complex element like an image to act as a trigger (e.g., an Image Lightbox), a static aria-label (like 'Enlarge image') is insufficient. The screen reader loses the context of *what* is being enlarged if the child's alt text is overridden by a static button label.
**Action:** Dynamically construct the wrapper's aria-label to include the child's description (e.g., `aria-label={\`Enlarge image: ${alt}\`}`) so context and action are both preserved.
