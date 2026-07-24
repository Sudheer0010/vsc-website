# VSC Design Principles

This document defines the permanent design system rulebook for **VSC Capital & Advisory**. Every component, style, page layout, animation, and interaction must strictly obey these guidelines to preserve the premium, institutional-grade brand identity.

---

## 1. Visual & Branding Philosophy

*   **Institutional over Retail**:
    *   The website must feel like a premium financial research institution (similar to premium boutique advisory firms), not a retail trading platform.
    *   Avoid loud colors, excessive badges, flashing indicators, or promotional/sales copy.
    *   Build trust first through clean presentation of philosophy, rules, and research before presenting enquiry opportunities.

*   **Gold as an Accent, Not Decoration**:
    *   Gold (`var(--accent-gold)`) must be used sparingly to draw focus to critical actions, borders, or highlights.
    *   Never use gold for large blocks of text, background panels, or decorative shapes.
    *   Backgrounds must remain dark, deep, and cohesive (`#060810`).

*   **Typography First**:
    *   Rely on type hierarchy, font weights, and letter-spacing for visual interest instead of heavy graphical elements.
    *   Titles use `Cormorant Garamond` (classic serif, light weights) to evoke tradition and high pedigree.
    *   Monospace sections (`DM Mono`) are reserved for technical metrics, mathematical constraints, and labels.
    *   UI components use clean system font definitions for legibility.

---

## 2. Space & Layout Rules

*   **Large Breathing Spaces**:
    *   Ensure generous padding (`padding: 120px 0` for desktop sections) to give elements room to breathe.
    *   Text paragraphs should have a maximum width of `480px` to `600px` for optimal readability.
    *   Maintain a strict container grid alignment (`max-width: 1200px` with left/right padding).

*   **No Placeholders / Incomplete Data**:
    *   Do not include simulated lorem-ipsum or empty layouts. All sections must serve a concrete purpose.

---

## 3. Motion & Interaction Guidelines

*   **Premium before Flashy**:
    *   All animations must be subtle, smooth, and timed to enhance presentation.
    *   Never use bouncing, spinning, or high-velocity transitions.
    *   Use ease curves (e.g., `cubic-bezier(0.16, 1, 0.3, 1)`) for premium damping.

*   **Motion Supports Understanding**:
    *   Animations must guide the reader's eye down the page hierarchy (e.g., subtle fade-up on scroll).
    *   If an animation does not help the reader absorb information or sense transition, remove it.
    *   Provide reduced-motion styling overrides (`prefers-reduced-motion`) for accessibility.

*   **Every Hover Has Purpose**:
    *   Hover effects should communicate interactivity clearly:
        *   Buttons slide gold background overlays or adjust transparency smoothly.
        *   Cards lift slightly (`translateY(-4px)`) and change border color to highlight selection.
        *   Interactive text links underline from left to right.

*   **One Interaction Language**:
    *   Ensure menu transitions, modal overlays, card expansions, and scroll fade-ups follow consistent durations (`0.3s` to `0.8s` with power easing).
