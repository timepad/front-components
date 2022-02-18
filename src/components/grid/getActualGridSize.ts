type ActualGridSizeType = 12 | 6 | 2;

export const getActualGridSize = (): ActualGridSizeType => {
    const mobile = 2;
    const tablet = 6;
    const desktop = 12;

    if (window.innerWidth < 599) {
        return mobile;
    } else if (window.innerWidth >= 600 && window.innerWidth < 1023) {
        return tablet;
    } else {
        return desktop;
    }
};
