## 2024-11-28 - Dynamic ARIA Labels on Content Wrappers
**Learning:** Trigger buttons that open dialogs or enlarged views (like Image Lightbox) and wrap contextual content (like images) need dynamic `aria-label` attributes that incorporate the child content's description (e.g. `aria-label={\`Enlarge image: ${alt}\`}`). Otherwise, the screen reader ignores the original context and announces a generic action.
**Action:** Ensure any trigger button that wraps content has an explicit `aria-label` that dynamically incorporates the wrapped content's purpose or description.
