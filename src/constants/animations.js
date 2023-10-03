// Framer-motion animations variants

export const FADE = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 0.15,
  },
};

export const SLIDE_UP = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 20,
    opacity: 0,
  },
  transition: {
    duration: 0.15,
  },
};

export const CONTAINER = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
  transition: {
    duration: 0.6,
  },
};

export const NAVBAR_MENU = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    y: 60,
    opacity: 0,
  },
  transition: {
    easing: "easeInOut",
    duration: 0.2,
  },
};

export const SLIDERIGHT = {
  initial: {
    x: -60,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};
