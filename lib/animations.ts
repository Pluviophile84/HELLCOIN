/**
 * Centralized Animation System
 * Standardized variants, easing curves, and durations for consistent animations.
 */

import { Variants, TargetAndTransition, Transition } from "framer-motion";

// ============================================================================
// EASING CURVES
// ============================================================================

export const EASING = {
  /** Smooth deceleration - best for UI elements entering view */
  smooth: [0.23, 1, 0.32, 1] as const,
  /** Quick and snappy - best for micro-interactions */
  snappy: [0.4, 0, 0.2, 1] as const,
  /** Gentle ease out */
  easeOut: [0, 0, 0.2, 1] as const,
  /** Standard ease in-out */
  easeInOut: [0.4, 0, 0.2, 1] as const,
} as const;

// ============================================================================
// DURATION PRESETS
// ============================================================================

export const DURATION = {
  instant: 0.2,
  fast: 0.35,
  normal: 0.5,
  medium: 0.65,
  slow: 0.8,
  slower: 1.0,
} as const;

// ============================================================================
// STAGGER PRESETS
// ============================================================================

export const STAGGER = {
  fast: 0.08,
  normal: 0.12,
  slow: 0.18,
  slower: 0.25,
} as const;

// ============================================================================
// ENTRANCE VARIANTS
// ============================================================================

/** Fade in with upward movement - standard card/section entrance */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.smooth,
    },
  },
};

/** Fade in from left */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASING.smooth,
    },
  },
};

/** Fade in from right */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASING.smooth,
    },
  },
};

// ============================================================================
// CONTAINER VARIANTS (for staggered children)
// ============================================================================

/** Standard stagger container for card grids */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER.normal,
      delayChildren: 0.1,
    },
  },
};

/** Fast stagger for dense lists or many items */
export const staggerContainerFast: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER.fast,
      delayChildren: 0.05,
    },
  },
};

// ============================================================================
// HOVER VARIANTS
// ============================================================================

/** Standard card hover - lift and subtle scale */
export const cardHover: TargetAndTransition = {
  y: -6,
  scale: 1.015,
  transition: {
    duration: DURATION.fast,
    ease: "easeOut",
  },
};

// ============================================================================
// SPECIAL ANIMATIONS
// ============================================================================

/** Slide variants for carousels/sliders */
export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.95,
  }),
};

/** Slide transition config */
export const slideTransition: Transition = {
  x: { type: "tween", duration: DURATION.medium, ease: EASING.smooth },
  opacity: { duration: DURATION.normal },
  scale: { duration: DURATION.medium, ease: EASING.smooth },
};

/** Expand/collapse for accordions */
export const expandVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  show: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: DURATION.normal, ease: EASING.easeInOut },
      opacity: { duration: DURATION.fast, delay: 0.1 },
    },
  },
};

/** Toast/notification entrance */
export const toastVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASING.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    transition: {
      duration: DURATION.fast,
      ease: EASING.easeOut,
    },
  },
};

// ============================================================================
// VIEWPORT CONFIG
// ============================================================================

// Note: viewportOnce is now a hook - see useViewportOnce in useViewportMarginRem.ts

// ============================================================================
// REDUCED MOTION HELPERS
// ============================================================================

/** Get variants respecting reduced motion preference */
export const getVariants = (
  variants: Variants,
  reduceMotion: boolean | null
): Variants | undefined => {
  if (reduceMotion) return undefined;
  return variants;
};

/** Get initial state respecting reduced motion preference */
export const getInitial = (reduceMotion: boolean | null): "hidden" | false => {
  if (reduceMotion) return false;
  return "hidden";
};

/** Get whileInView respecting reduced motion preference */
export const getWhileInView = (reduceMotion: boolean | null): "show" | undefined => {
  if (reduceMotion) return undefined;
  return "show";
};

/** Get hover animation respecting reduced motion preference */
export const getHover = (
  hoverProps: TargetAndTransition,
  reduceMotion: boolean | null
): TargetAndTransition | undefined => {
  if (reduceMotion) return undefined;
  return hoverProps;
};
