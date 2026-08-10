## 2024-03-24 - Accessibility labels for standalone inputs
**Learning:** Found that standalone form inputs (like the newsletter signup and FAQ search) which rely purely on placeholder text for visual context are missing explicit ARIA labels. This causes screen readers to have less context about the purpose of the input.
**Action:** Always add explicit `aria-label` attributes to any `<input>` fields that lack an associated `<label>` tag, especially when placeholders are the only visual context provided.
