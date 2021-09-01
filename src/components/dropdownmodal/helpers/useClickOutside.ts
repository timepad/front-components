// НЕ ИСПОЛЬЗОВАТЬ БУДЕТ УДАЛЕН!
import {useEffect} from 'react';

const useClickOutside = (ref: HTMLElement | null, handler: (event: MouseEvent) => void, target?: HTMLElement): void => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref || ref.contains(event.target as Node | null) || target?.contains(event.target as Node | null)) {
                return;
            }

            handler(event as MouseEvent);
        };

        const hardClose = (e: Event) => {
            handler(e as MouseEvent);
        };

        document.addEventListener('dropdown-close', hardClose);
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
            document.addEventListener('dropdown-close', hardClose);
        };
    }, [ref, handler, target]);
};

export {useClickOutside};
