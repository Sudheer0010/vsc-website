# VSC Reading Tempo Specification

> **Tempo Principle**: We do not design motion. We design **Reading Tempo**. Every animation exists strictly in service of reading — never movement.

---

## 1. The Reading Tempo Arc

Modeled after the measured reading pacing of Howard Marks memos:

$$\text{Pause (0.3s)} \longrightarrow \text{Line Draw (0.8s)} \longrightarrow \text{Headline Fade (0.6s)} \longrightarrow \text{Think}$$

---

## 2. Timing & Easing Curves

- **Ease Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` (Custom editorial ease-out).
- **Line Draw Duration**: `0.8s`.
- **Headline Entrance**: `0.6s` duration, maximum `10px` upward float.
- **Body Copy**: **Silent entry.** Body text enters instantly without motion artifacts to optimize reading focus.

---

## 3. Interaction Tempo (Hovers & Active States)

- **Hover Lifts**: Maximum `2px`–`3px` smooth lift (`240ms` transition).
- **Active State Transition**: `180ms` color & border shift.
- **Zero Impatient Motion**: Bounces, spins, exaggerated scales, or quick flashes are strictly forbidden.

---

## 4. Reduced Motion Compliance

- When `prefers-reduced-motion: reduce` is active:
  - All durations set to `0s`.
  - All elements render immediately in their final visible state (`opacity: 1`, `transform: none`).
