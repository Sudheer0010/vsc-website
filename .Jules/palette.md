## 2026-09-02 - Contextual Image Wrapper Buttons
**Learning:** ImageLightbox uses an unstyled button wrapper to trigger an enlarged image view. Without an explicit dynamic ARIA label referencing the image alt text, screen readers simply announce 'button' or ignore context, leading to poor accessibility on image-heavy pages.
**Action:** Any trigger button that opens an enlarged view (like ImageLightbox) wrapping contextual content must have an explicit aria-label dynamically incorporating the child content to maintain context.
