import React, {forwardRef, useLayoutEffect, useRef} from 'react';
import {calculateNodeHeight, getSizingData, noop, useComposedRef, useWindowResizeListener, SizingData} from './utils';

export type TextareaHeightChangeMeta = {
    rowHeight: number;
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface ITextareaProps extends TextareaProps {
    maxRows?: number;
    minRows?: number;
    onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;
    cacheMeasurements?: boolean;
}

// Этот код взят из библиотеки react-textarea-autosize (адаптированный под наши компоненты)

const Textarea: React.ForwardRefRenderFunction<HTMLTextAreaElement, ITextareaProps> = (
    {cacheMeasurements, maxRows, minRows, onChange = noop, onHeightChange = noop, ...props},
    userRef,
) => {
    if (process.env.NODE_ENV !== 'production' && props.style) {
        if ('maxHeight' in props.style) {
            throw new Error('Using `style.maxHeight` for <Textarea /> is not supported. Please use `maxRows`.');
        }
        if ('minHeight' in props.style) {
            throw new Error('Using `style.minHeight` for <Textarea /> is not supported. Please use `minRows`.');
        }
    }
    const isControlled = props.value !== undefined;
    const libRef = useRef<HTMLTextAreaElement | null>(null);
    const ref = useComposedRef(libRef, userRef);
    const heightRef = useRef(0);
    const measurementsCacheRef = React.useRef<SizingData>();

    const resizeTextarea = () => {
        if (typeof document !== 'undefined') {
            const node = libRef.current!;
            const nodeSizingData =
                cacheMeasurements && measurementsCacheRef.current ? measurementsCacheRef.current : getSizingData(node);

            if (!nodeSizingData) {
                return;
            }

            measurementsCacheRef.current = nodeSizingData;

            const [height, rowHeight] = calculateNodeHeight(
                nodeSizingData,
                node.value || node.placeholder || 'x',
                minRows,
                maxRows,
            );

            if (heightRef.current !== height) {
                heightRef.current = height;
                node.style.setProperty('height', `${height}px`, 'important');
                onHeightChange(height, {rowHeight});
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isControlled) {
            resizeTextarea();
        }
        onChange(event);
    };

    useLayoutEffect(resizeTextarea);
    useWindowResizeListener(resizeTextarea);

    return <textarea {...props} onChange={handleChange} ref={ref} />;
};

export default /* #__PURE__ */ forwardRef(Textarea);
