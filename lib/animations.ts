// Animation Constants and Keyframe Variants

// Gate Opening Animation
const gateOpening = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: '100%' },
};

// Portal Entering Animation
const portalEntering = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
};

// Shadow Rise Animation
const shadowRise = {
    initial: { y: '100%' },
    animate: { y: '0%' },
};

// Glitch Effects Animation
const glitchEffect = {
    hidden: { opacity: 0, filter: 'hue-rotate(-180deg)' },
    visible: { opacity: 1, filter: 'hue-rotate(0deg)' },
};

// Typewriter Animation
const typewriterAnimation = {
    hidden: { width: '0', opacity: 1 },
    visible: { width: '100%', transition: { duration: 0.5 } },
};

export { gateOpening, portalEntering, shadowRise, glitchEffect, typewriterAnimation };