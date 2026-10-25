
## 2024-11-20 - [ARIA label for Image Lightbox Trigger]
**Learning:** For components like Image Lightbox, the trigger button wrapping the image needs an explicit `aria-label` describing the action (e.g., `Enlarge image: ${alt}`) because screen readers may not automatically interpret the `alt` text of the child image as the button's action name, especially when visual cues like `cursor-zoom-in` are purely CSS-based.
**Action:** When creating wrapper buttons for interactive media elements (like images or videos), always explicitly declare the action in an `aria-label` that dynamically incorporates the media's context (e.g., its `alt` text).
