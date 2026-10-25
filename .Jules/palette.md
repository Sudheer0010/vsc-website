
## 2026-09-04 - [Dynamic Aria Labels on Image Wrappers]
**Learning:** When a button wraps contextual content like an image to trigger an action (like opening a lightbox), providing a static `aria-label` (e.g., "Enlarge image") overrides the content inside the button for screen readers. This means the screen reader user loses the context of *what* image they are enlarging (the `alt` text is ignored).
**Action:** Any trigger button that opens an enlarged view of an image must dynamically incorporate the child image's `alt` text into its `aria-label` (e.g., `aria-label={`Enlarge image: ${alt}`}`) to preserve context.
