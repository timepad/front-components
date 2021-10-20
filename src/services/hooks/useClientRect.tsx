import {useCallback, useState} from 'react';

export function useClientRect(): [DOMRect | undefined, (node: HTMLElement | null) => void] {
    const [rect, setRect] = useState<DOMRect>();
    const ref = useCallback((node: HTMLElement | null) => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, []);
    return [rect, ref];
}
