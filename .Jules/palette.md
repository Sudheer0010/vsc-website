## 2024-10-24 - Explicit ARIA Labels for Dialog Trigger Buttons
**Learning:** For trigger buttons that open dialogs or enlarged views (like ImageLightbox), relying solely on a child image's `alt` attribute for screen reader context is insufficient and can lead to confusing navigation. These buttons need explicit context describing the *action* they perform.
**Action:** Always add an explicit `aria-label` (e.g., `aria-label="Enlarge image: [alt text]"`) to such buttons rather than assuming the child content provides enough context.
