## 2026-09-01 - Dynamic ARIA labels for image triggers
**Learning:** Any trigger button that opens a dialog or enlarged view for an image must have an explicit aria-label that dynamically incorporates the child content (e.g., aria-label={"Enlarge image: " + alt}) to prevent the screen reader from ignoring the original context.
**Action:** Add dynamic aria-label to buttons wrapping images and hide decorative icons inside.
