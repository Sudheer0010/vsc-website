## 2024-03-05 - Placeholder-only Input Accessibility
**Learning:** Found an accessibility pattern where standalone inputs (like FAQ search or Newsletter CTA) relied entirely on placeholder text for visual context, missing explicit `aria-label` attributes. This breaks screen reader experiences.
**Action:** Always verify that inputs without an explicit `<label>` element include an `aria-label` attribute, even if they have placeholders.
