import * as React from 'react';
import {createContext, FC, HTMLAttributes, useEffect, useMemo, useRef, useState} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {TootltipTitle} from './TooltipTitle';
import {TooltipMessage} from './TooltipMessage';

import './ctooltip.less';

export interface ITooltipContext {
    isActive: boolean;
    setIsActive: (bool: boolean) => void;
}
export const TooltipContext = createContext<ITooltipContext>({
    isActive: false,
    setIsActive: () => {
        //
    },
});
export interface ITooltip extends HTMLAttributes<HTMLSpanElement> {
    active?: boolean;
}

const BaseTooltip: FC<ITooltip> = ({children, active = false, className, ...restProps}) => {
    const divClasses = useMemo<string>(() => {
        return cx(component('tooltip')(), className);
    }, [className]);

    const [isActive, setIsActive] = useState<boolean>(active);
    useEffect(() => {
        if (active !== isActive) setIsActive(active);
        //eslint-disable-next-line
    }, [active]);

    const ref = useRef<HTMLSpanElement>(null);
    const onClickOutside = (e: Event): void => {
        const node = e?.target as Node;
        if (!ref?.current?.contains(node)) setIsActive(false);
    };
    useEffect(() => {
        if (ref.current) {
            document.addEventListener('click', onClickOutside);
        }
        return () => {
            document.removeEventListener('click', onClickOutside);
        };
    }, [ref]);

    return (
        <span {...restProps} className={divClasses} ref={ref}>
            <TooltipContext.Provider value={{isActive, setIsActive}}>{children}</TooltipContext.Provider>
        </span>
    );
};

const tooltipComponents = {
    Title: TootltipTitle,
    Message: TooltipMessage,
};

export const Tooltip = Object.assign(BaseTooltip, tooltipComponents);
