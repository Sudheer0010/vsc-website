## 2023-11-20 - Contextual ARIA labels on Image Lightboxes
**Learning:** Adding a static `aria-label` to an image wrapper button can override and hide the underlying image's `alt` text from screen readers, causing a loss of context.
**Action:** When adding an `aria-label` to a button that wraps an image (like a Lightbox trigger), dynamically incorporate the image's `alt` text into the label (e.g., `aria-label={\`Enlarge image: ${alt}\`}`) to preserve context while announcing the interaction.
