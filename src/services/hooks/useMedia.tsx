import {Media} from '../const/styles';
import useEvent from './useEvent';
import {useCallback, useState} from 'react';

const win = typeof window === 'undefined' ? null : window;
const emptyObj = {};

export const useMedia = <T extends CustomMedia>(additionalMaxWidth?: T): MediaObject<T> => {
    const [media, setMedia] = useState<MediaObject<T> | typeof emptyObj>(emptyObj);

    const updateState = useCallback((array: [string, string | number | undefined][]) => {
        array.forEach(([mediaKey, mediaQuery]) => {
            const query = typeof mediaQuery === 'number' ? `(max-width: ${mediaQuery}px)` : mediaQuery;
            setMedia((prevState) => ({
                ...prevState,
                [mediaKey]: query ? window.matchMedia(query).matches : query,
            }));
        });
    }, []);

    const checkMediaQueries = () => {
        const mediaMatrix = Object.entries(Media) as [keyof typeof Media, string][];

        updateState(mediaMatrix);
        if (additionalMaxWidth) {
            updateState(Object.entries(additionalMaxWidth));
        }
    };
    if (media === emptyObj) {
        checkMediaQueries();
    }
    function debounce(func: () => void, ms: number) {
        let timeout: number;
        return () => {
            clearTimeout(timeout);
            // Такое приведение типов необходимо, поскольку есть проблема с @types/node в otp. Проще обнулить тип на этом этапе.
            timeout = setTimeout(func, ms) as unknown as number;
        };
    }
    useEvent(win, 'resize', debounce(checkMediaQueries, 300));
    useEvent(win, 'orientationchange', debounce(checkMediaQueries, 300));
    return media as MediaObject<T>;
};

type MediaObject<T> = Record<keyof typeof Media, boolean> & Record<keyof T, boolean | undefined>;

type CustomMedia = Record<string, number | undefined>;
