# VSC Motion System

## Principles
1. **Intentional Choreography**: Motion exists exclusively to guide eye movement and structure content hierarchy.
2. **Subtle & Restrained**: Fade reveals, slight line draws, micro hover lifts (maximum 2-3px), gentle transition curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
3. **No Repetitive Animations**: Avoid uniform fade-up animations on every text line.
4. **Accessibility First**: Respect `prefers-reduced-motion: reduce` across all motion controllers (`MotionConfig reducedMotion="user"`).
