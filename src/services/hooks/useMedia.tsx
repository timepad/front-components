import {Media} from '../const/styles';
import useEvent from './useEvent';
import {useState} from 'react';

const win = typeof window === 'undefined' ? null : window;
const emptyObj = {};

export const useMedia = (): MediaObject => {
    const [media, setMedia] = useState<MediaObject | Record<string, never>>(emptyObj);
    const checkMediaQueries = () => {
        const media = Object.entries(Media) as [keyof typeof Media, string][];
        media.forEach(([mediaKey, mediaQuery]) => {
            setMedia({
                ...media,
                [mediaKey]: window.matchMedia(mediaQuery).matches,
            });
        });
    };
    if (media === emptyObj) {
        checkMediaQueries();
    }
    function debounce(func: () => void, ms: number) {
        let timeout: number;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(func, ms);
        };
    }
    useEvent(win, 'resize', debounce(checkMediaQueries, 300));
    useEvent(win, 'orientationchange', debounce(checkMediaQueries, 300));
    return media as MediaObject;
};

type MediaObject = Record<keyof typeof Media, boolean>;
