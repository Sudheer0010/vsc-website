## 2024-10-02 - Image Lightbox Trigger Button ARIA Label
**Learning:** When a button triggers an action (like a dialog or lightbox) but wraps contextual content (like an image), screen readers may ignore the button's action if the `aria-label` is missing. The `aria-label` must explicitly combine the action and the context, e.g. `aria-label="Enlarge image: {alt}"`.
**Action:** Always add an `aria-label` that includes both the action verb and the dynamic child context when wrapping images or informative content in generic interactive triggers.
