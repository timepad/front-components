import {useDebounce} from './useDebounceCallback';
import useEvent from './useEvent';

const emptyObj = {};

export interface IDebouncedWindowSizeOptions {
    initialWidth?: number;
    initialHeight?: number;
    wait?: number;
    leading?: boolean;
}

const win = typeof window === 'undefined' ? null : window;
const getSize = () => [document.documentElement.clientWidth, document.documentElement.clientHeight] as const;

export const useWindowSize = (options: IDebouncedWindowSizeOptions = emptyObj): readonly [number, number] => {
    const {wait, leading, initialWidth = 0, initialHeight = 0} = options;
    const [size, setDebouncedSize] = useDebounce<readonly [number, number]>(
        /* istanbul ignore next */
        typeof document === 'undefined' ? [initialWidth, initialHeight] : getSize,
        wait,
        leading,
    );
    const setSize = (): void => setDebouncedSize(getSize);

    useEvent(win, 'resize', setSize);
    useEvent(win, 'orientationchange', setSize);

    return size;
};

export const useWindowHeight = (options?: Omit<IDebouncedWindowSizeOptions, 'initialWidth'>): number =>
    useWindowSize(options)[1];

export const useWindowWidth = (options?: Omit<IDebouncedWindowSizeOptions, 'initialHeight'>): number =>
    useWindowSize(options)[0];
