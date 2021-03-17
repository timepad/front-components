export const getSizeForSpacer = (
    className: string,
    size: number | undefined,
    plusHalf: boolean | undefined,
): string => {
    if (size || size === 0 || plusHalf) {
        return className + `-${size === 0 ? 0 : size || 1}${plusHalf ? '-5' : ''}`;
    } else {
        return className;
    }
};
