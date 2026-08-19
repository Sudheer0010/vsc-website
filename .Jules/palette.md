## 2024-05-18 - Missing ARIA label on Image Lightbox trigger
**Learning:** Any trigger button that opens a dialog or enlarged view (e.g., Image Lightbox) must have an explicit `aria-label` describing its action, rather than relying solely on child image `alt` attributes for screen reader support. This is a common pattern for custom accessible dialogs.
**Action:** When implementing custom trigger buttons for modals/lightboxes in this codebase, ensure an explicit `aria-label` is always provided instead of relying on nested image alt text.
