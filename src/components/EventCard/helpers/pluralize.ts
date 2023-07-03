export const pluralize = (value: number, variants: string[]) => {
    value = value % 100;
    return value <= 14 && value >= 11
        ? variants[2]
        : (value %= 10) < 5
        ? value > 2
            ? variants[1]
            : value === 1
            ? variants[0]
            : value === 0
            ? variants[2]
            : variants[1] //value === 2
        : variants[2];
};
