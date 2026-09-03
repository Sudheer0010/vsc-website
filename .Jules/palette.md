## 2024-05-15 - [ARIA label for context-wrapping buttons]
**Learning:** When a button wraps a complex element like an image to act as a trigger (e.g., a lightbox), the screen reader needs to know what the button does in relation to the content, rather than just reading the child element's alt text or being an unlabeled interactive element.
**Action:** Always provide an explicit `aria-label` that dynamically incorporates the child content context, such as `aria-label={\`Enlarge image: \${alt}\`}`, to ensure the user understands both the action and its target.
