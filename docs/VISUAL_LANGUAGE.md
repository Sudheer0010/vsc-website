# VSC Visual Language System

> **Atlas Alignment**: Strict visual standards governing color, typography, borders, shadows, glassmorphism, border radii, iconography, and art direction.

---

## 1. Color System

| Color Token | Hex Code | Usage | Rule |
| :--- | :--- | :--- | :--- |
| **Deep Charcoal Base** | `#060810` | Primary background, root canvas | Uncompromising dark foundation |
| **Elevated Paper Navy** | `#0B0F1E` | Elevated panels, briefing matrices, forms | Subtle surface layer contrast |
| **Warm Gold Accent** | `#C9A84C` | Research line, coordinate tags, active indicators | **Restrained emphasis only** |
| **Off-White Display** | `#F4F1EC` | Headings, primary serif copy | Crisp, high readability |
| **Muted Slate Body** | `#A7A7AD` | Body copy, secondary paragraphs | Measured editorial tone |

### Gold Usage Rules
- **Allowed**: Research Line, monospaced coordinate tags, small indicator dots (1.5px), hairline border accents.
- **Forbidden**: Large background fills, full text blocks, bright yellow glows, or dominant call-to-action blocks.

---

## 2. Borders & Division Rules

- **Thickness**: Strict 1px hairline borders (`rgba(255, 255, 255, 0.05)` or `rgba(201, 168, 76, 0.15)`).
- **Style**: Hairline rules separating chapters, metadata dividers, and briefing matrices.
- **Sharpness**: Clean, crisp borders. Thick or decorative borders strictly forbidden.

---

## 3. Shadows, Glassmorphism & Blur

- **Shadows**: Soft, deep ambient shadows (`0 10px 30px rgba(0, 0, 0, 0.18)`). No bright neon glows or colored drop-shadows.
- **Glassmorphism**: Reserved exclusively for fixed navigation overlays (`rgba(12, 16, 30, 0.72)`).
- **Blur Limit**: Maximum 18px backdrop blur (`backdrop-filter: blur(18px)`). High-blur glass surfaces forbidden.

---

## 4. Border Radius Scale

- **8px**: Input fields, small filter chips.
- **12px**: Inner briefing panels, block quotes.
- **16px**: Editorial cards, matrix containers.
- **18px**: Watch-bezel navigation capsule.

---

## 5. Iconography

- **Style**: Outlined stroke icons only.
- **Stroke Width**: Strict `1.5px` stroke thickness.
- **Color**: Muted slate (`rgba(255,255,255,0.3)`) or gold accent (`#C9A84C`).
- **Filled Icons**: Strictly forbidden.

---

## 6. Photography Art Direction

- **Atmosphere**: Natural light with an editorial, research-oriented atmosphere. Architectural research desk, leather notebook, printed reports, coffee — human, serious, disciplined.
- **Forbidden**: Studio stock photos, superficial corporate smile photos, fake trading terminal graphics, AI-generated financial charts.

---

## 7. Illustration

- **Rule**: **Strictly Forbidden.** VSC uses publication typography, architectural whitespace, and art-directed photography instead of illustrations.
