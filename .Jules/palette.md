## 2024-10-08 - Image Lightbox Trigger Accessibility
**Learning:** Any trigger button that opens a dialog or enlarged view (like Image Lightbox) must have an explicit aria-label. If the button wraps contextual content like an image, the aria-label must dynamically incorporate the child content (e.g., `aria-label={\`Enlarge image: ${alt}\`}`) to prevent the screen reader from ignoring the original context.
**Action:** Always add descriptive, dynamic aria-labels to buttons that wrap contextual content (like images) and trigger visual expansions.
