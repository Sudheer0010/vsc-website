## 2025-05-15 - Missing dynamic ARIA labels on Image Lightbox triggers
**Learning:** Found that ImageLightbox triggers do not have an `aria-label` dynamic to the wrapped image, causing screen readers to miss contextual information about what they are enlarging.
**Action:** Add dynamically constructed `aria-label` to trigger buttons in Image Lightbox components.
