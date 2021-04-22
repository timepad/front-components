import {Variants, Transition} from 'framer-motion';

export enum Variant {
    hidden = 'hidden',
    visible = 'visible',
}

export const blurVariants: Variants = {
    hidden: {
        opacity: 0,
        backdropFilter: 'blur(0px)',
    },
    visible: {
        opacity: 1,
        backdropFilter: 'blur(24px)',
    },
};

export const listItem: Variants = {
    hidden: {opacity: 0, height: 0},
    visible: {
        height: 'auto',
        opacity: 1,
    },
};

export const discountedPriceVariants: Variants = {
    hidden: {width: 0, opacity: 0, marginRight: 0},
    visible: {width: 'auto', opacity: 1, marginRight: '5px'},
};

export const snackbarVariants: Variants = {
    [Variant.hidden]: {opacity: 0, bottom: 24},
    [Variant.visible]: {opacity: 1, bottom: 32},
};

export const fastAndBouncyTransition: Transition = {type: 'spring', damping: 15, stiffness: 250};

export const easeIn = [0.4, 0, 1, 0.6];
export const easeOut = [0, 0.4, 0.6, 1];
export const easeInOut = [0.4, 0, 0.6, 1];

export const durationBlink = 0.13;
export const durationNormal = 0.3;
export const durationAccented = 0.53;

export const transitionBlink: Transition = {duration: durationBlink};
export const transitionBlinkEaseOut: Transition = {duration: durationBlink, ease: easeOut};
export const transitionNormalEaseOut: Transition = {duration: durationNormal, ease: easeOut};
export const transitionAccentedEaseOut: Transition = {duration: durationAccented, ease: easeOut};
