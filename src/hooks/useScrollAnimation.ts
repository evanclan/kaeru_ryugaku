"use client";

import { Variants } from "framer-motion";

// Scroll reveal animation variants
export const scrollRevealVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
        },
    },
};

// Slide from left variant
export const slideFromLeftVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -60,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// Slide from right variant
export const slideFromRightVariants: Variants = {
    hidden: {
        opacity: 0,
        x: 40,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// Pop in with spring (for badges, icons)
export const popInVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 20,
        },
    },
};

// Staggered container for children
export const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

// Fast stagger for country cards
export const fastStaggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.05,
        },
    },
};

// Card item reveal
export const cardRevealVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// Timeline draw animation for FlowSection
export const timelineDrawVariants: Variants = {
    hidden: {
        scaleX: 0,
        originX: 0,
    },
    visible: {
        scaleX: 1,
        transition: {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// Step bubble pop-in for timeline (sequential)
export const stepBubbleVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 350,
            damping: 25,
        },
    },
};

// FAQ cascade from left
export const cascadeLeftVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -25,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// FAQ cascade from right
export const cascadeRightVariants: Variants = {
    hidden: {
        opacity: 0,
        x: 25,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// Testimonial fan-in
export const fanInVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
        rotateX: -10,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// Star twinkle animation
export const starTwinkleVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 15,
        },
    },
};

// Section header animation
export const sectionHeaderVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};
