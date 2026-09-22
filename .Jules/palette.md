## 2024-05-19 - Trigger buttons wrapping images must have an explicit aria-label
**Learning:** When a button wraps an image to act as a trigger for an enlarged view (like a lightbox), screen readers may ignore the image's alt text if the button lacks an `aria-label`. The user loses the context of what the button does or what it's enlarging.
**Action:** Any trigger button that opens a dialog or enlarged view and wraps contextual content must have an explicit `aria-label` that dynamically incorporates the child content's description (e.g., `aria-label={\`Enlarge image: ${alt}\`}`).
