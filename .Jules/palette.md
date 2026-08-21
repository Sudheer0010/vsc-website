## 2024-05-19 - Explicitly Label Dialog Trigger Buttons
**Learning:** Any trigger button that opens a dialog or enlarged view (e.g., Image Lightbox) must have an explicit `aria-label` describing its action. Relying solely on child image `alt` attributes for screen reader support is insufficient for a clear interactive experience.
**Action:** Always provide an explicit `aria-label` for trigger buttons and mark purely decorative elements inside the button with `aria-hidden="true"`.
