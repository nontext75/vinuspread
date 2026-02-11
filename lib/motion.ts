import { Variants } from 'framer-motion';

export type MotionType = 'fade' | 'slide-up' | 'reveal' | 'zoom' | 'none';

export const motionPresets: Record<MotionType, Variants> = {
    'fade': {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
    },
    'slide-up': {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
    },
    'reveal': {
        hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        visible: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } }
    },
    'zoom': {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
    },
    'none': {
        hidden: { opacity: 1 },
        visible: { opacity: 1 }
    }
};
