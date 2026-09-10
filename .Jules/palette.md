## 2026-09-10 - Missing Region Roles on Motion Collapsibles
**Learning:** Found that custom framer-motion collapsibles use aria-expanded and aria-controls on triggers but often miss the 'role="region"' on the animated content block, which makes it hard for screen readers to announce the expanded section as a distinct region.
**Action:** Always verify that the element targeted by aria-controls explicitly declares role="region".
