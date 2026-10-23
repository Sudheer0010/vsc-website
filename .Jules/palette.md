## 2026-10-23 - Contextual aria-labels for image lightbox triggers
**Learning:** Any trigger button that opens a dialog or enlarged view (e.g., Image Lightbox) must have an explicit aria-label. If the button wraps contextual content like an image, the aria-label must dynamically incorporate the child content (e.g., aria-label={`Enlarge image: ${alt}`}) to prevent the screen reader from ignoring the original context.
**Action:** When creating wrappers around images that serve as triggers, make sure to add an aria-label that includes the image's alt text.
