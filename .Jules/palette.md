## 2026-09-24 - Contextual Image Lightbox Buttons
**Learning:** When building trigger buttons that wrap rich context (like an image) and open a dialog or enlarged view (e.g., Image Lightbox), screen readers may fail to read out the content or its original context if the button doesn't have an explicit label. An explicit `aria-label` must be provided.
**Action:** Dynamically incorporate the child content (e.g., `aria-label={\`Enlarge image: ${alt}\`}`) to prevent the screen reader from ignoring the original context.
