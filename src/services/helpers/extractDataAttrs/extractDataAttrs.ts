export type IDataAttr<T> = {key: T} & Record<string, any>;

export const extractDataAttrs = <T>(name: T, attrs?: Array<IDataAttr<T>>) => {
    if (!attrs) return;
    // eslint-disable-next-line no-unused-vars
    const {key, ...rest} = (attrs?.find((attr) => attr.key === name) || {}) as IDataAttr<T>;
    return {...rest};
};
