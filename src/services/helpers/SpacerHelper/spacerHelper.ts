export const getSizeForSpacer = (className: string, size?: number, plusHalf?: boolean): string => {
    if (size || size === 0 || plusHalf) {
        return className + `-${size ?? 1}${plusHalf ? '-5' : ''}`;
    } else {
        return className;
    }
};
