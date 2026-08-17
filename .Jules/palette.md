
## 2024-05-18 - Missing ARIA Labels on Click-to-Enlarge Image Buttons
**Learning:** Lightbox or click-to-enlarge image buttons that rely entirely on the child image's `alt` attribute do not consistently announce their *interactive* purpose (e.g. "Button, Enlarge Image: [description]") to screen readers, and instead often just announce the image content as if it's static.
**Action:** Any trigger button that opens a dialog or enlarged view must have an explicit `aria-label` describing its action. Decorative/indicator icons inside these buttons should be marked with `aria-hidden="true"`.
