## 2024-08-08 - Standalone Inputs Accessibility

**Learning:** Standalone form inputs that rely solely on placeholders for visual context (e.g., newsletter signups, search fields) fail to convey their purpose to screen readers without an explicit label.
**Action:** Always include an explicit `aria-label` attribute for standalone form inputs that do not have an associated `<label>` element.
