import {Styles} from 'services/const/styles';
import {useWindowWidth} from './useWindowSize';

export const useMobileWidthCheck = (): boolean => {
    const windowWidth = useWindowWidth();
    return windowWidth <= Styles['rsp-mobile-portrait-max'];
};
