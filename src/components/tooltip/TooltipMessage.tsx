import * as React from 'react';
import {FC, HTMLAttributes, useCallback, useContext, useEffect, useMemo, useRef} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {TooltipContext} from './Tooltip';

export interface ITooltipMessage extends HTMLAttributes<HTMLDivElement> {
    width?: number;
    direction?: 'top' | 'bottom';
    transition?: number;
}

export const TooltipMessage: FC<ITooltipMessage> = ({
    direction = 'top',
    width = 300,
    children,
    className,
    transition = 300,
    ...restProps
}) => {
    const {isActive, setIsActive} = useContext(TooltipContext);

    const spanClasses = useMemo<string>(() => {
        return cx(
            component(
                'tooltip',
                'message',
            )({['is-active']: isActive, ['top']: direction === 'top', ['bottom']: direction === 'bottom'}),
            className,
        );
    }, [className, isActive, direction]);

    const messageRef = useRef<HTMLSpanElement>(null);
    const calculatePosition = useCallback((): void => {
        const div = messageRef.current;
        if (div) {
            const xOffset = div.getClientRects()[0].left;
            if (xOffset < 0) {
                div.style.transform = 'translateX(0)';
                div.style.left = '0';
            }
        }
    }, [messageRef]);
    useEffect(() => {
        calculatePosition();
        window.addEventListener('resize', calculatePosition);
        return () => {
            window.removeEventListener('resize', calculatePosition);
        };
    }, [messageRef, calculatePosition]);

    return (
        <span
            {...restProps}
            className={spanClasses}
            ref={messageRef}
            style={{...restProps.style, width: `${width}px`, transition: `opacity ease ${transition}ms`}}
            onClick={() => setIsActive(true)}
        >
            {children}
        </span>
    );
};
