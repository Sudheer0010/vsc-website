## 2024-05-17 - Dynamic ARIA Labels for Buttons Wrapping Contextual Content
**Learning:** Any trigger button that opens a dialog or enlarged view (e.g., Image Lightbox) and wraps contextual content like an image needs an explicit `aria-label`. If the button relies solely on the child content for context, the screen reader may ignore the context.
**Action:** Dynamically incorporate the child content context (e.g., `aria-label={\`Enlarge image: ${alt}\`}`) into the button's `aria-label` to ensure screen readers provide full context.
