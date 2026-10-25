## 2024-05-18 - Missing ARIA Label on Image Lightbox Trigger Button
**Learning:** Found an accessibility issue pattern specific to this app where icon-only buttons or interactive elements like the Image Lightbox trigger lacked an explicit `aria-label`, relying only on visual cues or child image `alt` attributes. This made it less clear for screen reader users what the button action does before clicking it.
**Action:** Always ensure any trigger button that opens a dialog or enlarged view has an explicit `aria-label` describing its action, such as "Enlarge image: [image description]".
