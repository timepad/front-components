import {useEffect, RefObject, MutableRefObject} from 'react';

export const useOnEscape = (handler: (event: KeyboardEvent) => void, active = true): void => {
    useEffect(() => {
        if (!active) return;
        const listener = (event: KeyboardEvent) => {
            // check if key is an Escape
            if (event.key === 'Escape') handler(event);
        };
        document.addEventListener('keyup', listener);

        return () => {
            if (!active) return;
            document.removeEventListener('keyup', listener);
        };
    }, [handler, active]);
};

export const useRepositionOnResizeWindow = (handler: () => void, active = true): void => {
    useEffect(() => {
        if (!active) return;
        const listener = () => {
            handler();
        };

        window.addEventListener('resize', listener);

        return () => {
            if (!active) return;
            window.removeEventListener('resize', listener);
        };
    }, [handler, active]);
};

export const useRepositionOnResizeBlock = (
    handler: () => void,
    ref: MutableRefObject<HTMLElement | null>,
    active = true,
): void => {
    const node = ref.current;

    useEffect(() => {
        if (!active || !node) return;
        const listener = () => {
            // Need to handle error of not renderend content.
            try {
                handler();
            } catch {}
        };

        const resizeObserver = new ResizeObserver(listener);
        resizeObserver.observe(node);

        return () => {
            if (!active || !node) return;
            resizeObserver.unobserve(node);
        };
    }, [handler, node, active]);
};

// очередной хук клика за пределами, но может принимать массив ссылок на объекты
export const useOnClickOutside = (
    ref: RefObject<HTMLElement> | RefObject<HTMLElement>[],
    handler: (event: TouchEvent | MouseEvent) => void,
    active = true,
): void => {
    useEffect(() => {
        if (!active) return;
        const listener = (event: TouchEvent | MouseEvent) => {
            const refs = Array.isArray(ref) ? ref : [ref];

            let contains = false;
            refs.forEach((r) => {
                if (!r.current || r.current.contains(event.target as Node)) {
                    contains = true;
                    return;
                }
            });
            event.stopPropagation();
            if (!contains) handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            if (!active) return;
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler, active]);
};
