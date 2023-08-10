export type IDataAttr<T> = {key: T; 'data-analytics'?: string; 'data-qa'?: string};

// export const extractDataAttrs =
//     <T>(name: T) =>
//     (attrs: Array<IDataAttr<T>>): Omit<IDataAttr<T>, 'key'> | undefined => {
//         if (!attrs?.length) return;
//         // eslint-disable-next-line no-unused-vars
//         const {key, ...rest} = attrs?.find((attr) => attr?.key === name) as IDataAttr<T>;
//         return {...rest};
//     };

export const extractDataAttrs = <T>(name: T, attrs?: Array<IDataAttr<T>>) => {
    if (!attrs) return;
    // eslint-disable-next-line no-unused-vars
    const {key, ...rest} = attrs?.find((attr) => attr.key === name) as IDataAttr<T>;
    return {...rest};
};
