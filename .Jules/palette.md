## 2025-05-18 - Missing ARIA labels in FAQ Accordion Component
**Learning:** Found an accessibility issue pattern specific to this app's components, where the FAQ accordion toggle buttons lack `aria-expanded` and `aria-controls` attributes. The search input is also missing `aria-label`. These elements fail screen reader accessibility.
**Action:** Adding proper ARIA attributes (`aria-expanded`, `aria-controls`) to accordion toggles and `aria-label` to search inputs, clear button in the FAQ.
