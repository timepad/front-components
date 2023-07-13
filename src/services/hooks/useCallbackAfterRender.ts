import {useRef, useLayoutEffect} from 'react';

/**
 * Run code in returned callback.
 */
type Callback = (callback: () => void) => void;

export function useCallbackAfterRender(): Callback {
    const lastRun = useRef<(() => void) | null>(null);

    useLayoutEffect(() => {
        lastRun.current?.();
        lastRun.current = null;
    });

    return (callback) => {
        lastRun.current = callback; // schedule callback after render
    };
}
