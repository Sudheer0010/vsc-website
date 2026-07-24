export const MOTION = {
  durations: {
    fast: 0.25,
    normal: 0.45,
    slow: 0.8,
    page: 1.2
  },
  easings: {
    premium: "cubic-bezier(0.16, 1, 0.3, 1)",
    standard: "ease-in-out"
  },
  animations: {
    fadeUp: {
      initial: { opacity: 0, y: 40, filter: 'blur(8px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    cardHover: {
      transform: "translateY(-4px)",
      borderColor: "rgba(201, 168, 76, 0.35)",
    }
  }
};
