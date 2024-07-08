import {useCallback, useRef, useState} from 'react';

export function useClientRect(): [DOMRect | undefined, (node: HTMLElement | null) => void, () => void] {
    const [rect, setRect] = useState<DOMRect>();
    const ref = useRef<HTMLElement | null>(null);
    const callbackRef = useCallback((node: HTMLElement | null) => {
        if (node !== null) {
            ref.current = node;
            setRect(node.getBoundingClientRect());
        }
    }, []);
    const updateRect = useCallback(() => {
        if (ref.current) {
            setRect(ref.current.getBoundingClientRect());
        }
    }, []);

    return [rect, callbackRef, updateRect];
}
