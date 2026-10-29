## 2026-10-29 - Image Lightbox Accessibility
**Learning:** Trigger buttons that wrap contextual content (like images) and open a dialog must have an explicit aria-label incorporating the child content (e.g. `Enlarge image: ${alt}`) and aria-expanded tracking their state, otherwise screen readers may ignore the original context.
**Action:** Always add dynamic aria-label and aria-expanded attributes to lightbox/dialog trigger buttons that wrap informative images.
