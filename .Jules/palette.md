## 2025-02-23 - Focus Styles
**Learning:** Global focus-visible ring is applied via CSS, no need to add inline focus-visible rings everywhere. Components should rely on global styles unless a custom ring is needed.
**Action:** Remove existing focus ring classes when they overlap with the global ring or ensure any newly added focus state uses the standard.
## 2025-02-23 - Standalone Form Inputs
**Learning:** Some standalone form inputs (like email newsletter signups and search fields) rely entirely on placeholders for visual context. While visually clean, these inputs fail accessibility guidelines for screen readers when they lack an associated label or `aria-label`. Additionally, submit buttons handling async actions were lacking visual disabled feedback.
**Action:** Always ensure inputs without explicit labels have descriptive `aria-label`s. Add `disabled:opacity-50 disabled:cursor-not-allowed` to buttons that transition to a disabled state during form submission to provide immediate visual feedback.
