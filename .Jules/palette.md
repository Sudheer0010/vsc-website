## 2024-05-18 - [Accessibility: Image Lightbox Trigger Labels]
**Learning:** Wrapping an image with a button without dynamically including its alt text in the button's `aria-label` causes screen readers to ignore the original context.
**Action:** Any trigger button that opens an enlarged view of an image must have an explicit `aria-label` that dynamically incorporates the child content (e.g., `aria-label={`Enlarge image: ${alt}`}`).
