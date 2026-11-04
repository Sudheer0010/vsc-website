## 2026-11-04 - [Accessible Image Lightbox]
**Learning:** Any trigger button that opens an enlarged view of an image must dynamically incorporate the child content (e.g., aria-label={`Enlarge image: ${alt}`}) to prevent the screen reader from ignoring the original context, and must track its state using aria-expanded.
**Action:** Always add contextual aria-labels and aria-expanded state attributes to buttons wrapping contextual content like images.
