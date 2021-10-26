function arrayMoveMutable<T>(array: Array<T>, fromIndex: number, toIndex: number): void {
    const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

    if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

        const [item] = array.splice(fromIndex, 1);
        array.splice(endIndex, 0, item);
    }
}

function arrayMoveImmutable<T>(array: Array<T>, fromIndex: number, toIndex: number): Array<T> {
    const newArray = [...array];
    arrayMoveMutable(newArray, fromIndex, toIndex);
    return newArray;
}

export {arrayMoveMutable, arrayMoveImmutable};
