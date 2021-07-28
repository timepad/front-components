import * as React from 'react';

/*
    Как использовать
    const Example = React.forwardRef(function Example(props, ref) {
        const localRef = React.useRef();
        return <div ref={mergeRefs([localRef, ref])} />;
    });
*/

export default function mergeRefs<T = any>(
    refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>,
): React.RefCallback<T> {
    return (value) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(value);
            } else if (ref != null) {
                (ref as React.MutableRefObject<T | null>).current = value;
            }
        });
    };
}
