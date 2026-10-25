## 2024-10-02 - [Dynamic ARIA labels for wrappers]
**Learning:** When a button purely acts as a wrapper around contextual content (like an image) and acts as a trigger to enlarge it, a static `aria-label` like "Enlarge image" loses the underlying context for screen readers.
**Action:** Use dynamic template literals to incorporate the child content's descriptive attributes (e.g., `aria-label={\`Enlarge image: ${alt}\`}`) into the wrapper's ARIA label.
