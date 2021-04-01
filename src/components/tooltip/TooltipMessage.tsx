import * as React from 'react';
import {FC, HTMLAttributes, useCallback, useContext, useEffect, useMemo, useRef} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {TooltipContext} from './Tooltip';

export interface ITooltipMessage extends HTMLAttributes<HTMLSpanElement> {
    width?: number;
    transition?: number;
}

export const TooltipMessage: FC<ITooltipMessage> = ({
    width = 300,
    children,
    className,
    transition = 300,
    ...restProps
}) => {
    const {isActive, setIsActive} = useContext(TooltipContext);

    const spanClasses = useMemo<string>(() => {
        return cx(component('tooltip', 'message')({['is-active']: isActive}), className);
    }, [className, isActive]);

    const messageRef = useRef<HTMLSpanElement>(null);
    const calculatePosition = useCallback((): void => {
        const span = messageRef.current;
        const parent = span?.closest('.ctooltip');

        if (span && parent) {
            const xOffset = span.getClientRects()[0].left;
            if (xOffset < 0) {
                span.style.transform = 'translateX(0)';
                span.style.left = '0';
            }
            const messageHeight = span.clientHeight;
            const {top} = parent.getClientRects()[0];
            const offsetVal = top + 25;
            if (messageHeight < offsetVal) {
                span.style.top = `${-messageHeight}px`;
            }
        }
    }, [messageRef]);
    useEffect(() => {
        calculatePosition();
        window.addEventListener('resize', calculatePosition);
        document.addEventListener('scroll', calculatePosition);

        return () => {
            window.removeEventListener('resize', calculatePosition);
            window.removeEventListener('scroll', calculatePosition);
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
