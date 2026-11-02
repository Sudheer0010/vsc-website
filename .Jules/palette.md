## 2026-11-02 - Image Lightbox Accessibility
**Learning:** Any trigger button that opens a dialog or enlarged view (e.g., Image Lightbox) must have an explicit aria-label and aria-expanded attribute tracking its state. If the button wraps contextual content like an image, the aria-label must dynamically incorporate the child content.
**Action:** Always add aria-expanded={isOpen} and aria-label to buttons that trigger dialogs or lightboxes, incorporating contextual alt text where appropriate.
