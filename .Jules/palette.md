## 2023-10-25 - Explicit ARIA Labels on Placeholder-Only Inputs
**Learning:** Found multiple instances where form inputs (newsletter signup, search fields) relied entirely on their `placeholder` attribute for context. Screen readers often do not treat placeholders as reliable labels, making these inputs inaccessible to assistive technologies.
**Action:** Always ensure that standalone inputs without visible `<label>` elements are explicitly labeled using the `aria-label` attribute.
