## 2025-02-14 - Dynamic ARIA Labels for Image Wrappers
**Learning:** When a button's primary function is to trigger an enlarged view (like a Lightbox) and it wraps contextual content (like an image), the `aria-label` must dynamically incorporate the child content's context (e.g., `aria-label={\`Enlarge image: ${alt}\`}`) to prevent screen readers from completely ignoring the original contextual meaning.
**Action:** Always pass dynamic context to wrapper buttons that trigger dialogs or lightboxes instead of static labels like 'Open lightbox'.
