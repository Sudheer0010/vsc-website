## 2024-09-11 - Add ARIA label to trigger button wrapping visual content
**Learning:** Any trigger button that opens a dialog or enlarged view must have an explicit `aria-label`. If the button wraps contextual content like an image, the `aria-label` must dynamically incorporate the child content (e.g., `aria-label={\`Enlarge image: \${alt}\`}`) to prevent the screen reader from ignoring the original context.
**Action:** Always add dynamic `aria-label`s to interactive elements that wrap visual content.
