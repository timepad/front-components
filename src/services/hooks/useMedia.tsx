import {Media} from '../const/styles';
import useEvent from './useEvent';
import {useState} from 'react';

const win = typeof window === 'undefined' ? null : window;
const emptyObj = {};

export const useMedia = (): MediaObject => {
    const [media, setMedia] = useState<MediaObject | typeof emptyObj>(emptyObj);
    const checkMediaQueries = () => {
        const mediaMatrix = Object.entries(Media) as [keyof typeof Media, string][];
        mediaMatrix.forEach(([mediaKey, mediaQuery]) => {
            setMedia((prevState) => ({
                ...prevState,
                [mediaKey]: window.matchMedia(mediaQuery).matches,
            }));
        });
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
    return media as MediaObject;
};

type MediaObject = Record<keyof typeof Media, boolean>;
