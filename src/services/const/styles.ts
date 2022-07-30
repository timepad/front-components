export const Styles = {
    'rsp-mobile-max': 1024 - 0.4, //px
    'rsp-mobile-portrait-max': 736 - 0.4, //px
};

export const Media = {
    isMobilePortraitMax: `(max-width: ${Styles['rsp-mobile-portrait-max']}px)`,
    isMobileMax: `(max-width: ${Styles['rsp-mobile-max']}px)`,
};
