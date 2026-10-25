## 2024-10-14 - Accessible Image Lightbox Triggers
**Learning:** When a button's primary visual content is an image, and that button acts as a trigger (e.g. to open a lightbox), the button must have an explicit `aria-label` that includes the image's context. Otherwise, screen readers will announce it as a generic, contextless button, ignoring the informative image inside.
**Action:** Always dynamically incorporate child context, such as image `alt` text, into the `aria-label` of trigger buttons wrapping informative content (e.g. `aria-label={\`Enlarge image: ${alt}\`}`).
