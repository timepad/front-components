import * as React from 'react';
import {FC, HTMLAttributes, useCallback, useContext, useEffect, useMemo, useRef} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {TooltipContext} from './Tooltip';

export interface ITooltipMessage extends HTMLAttributes<HTMLSpanElement> {
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
    const calculateXPosition = useCallback((): void => {
        const span = messageRef.current;
        if (span) {
            const xOffset = span.getClientRects()[0].left;
            if (xOffset < 0) {
                span.style.transform = 'translateX(0)';
                span.style.left = '0';
            }
        }
    }, [messageRef]);
    useEffect(() => {
        calculateXPosition();
        window.addEventListener('resize', calculateXPosition);
        return () => {
            window.removeEventListener('resize', calculateXPosition);
        };
    }, [messageRef, calculateXPosition]);
    const calculateYPosition = useCallback((): void => {
        const span = messageRef.current;
        const parent = span?.closest('.ctooltip');

        if (span && parent) {
            const messageHeight = span.clientHeight;
            const {top} = parent.getClientRects()[0];
            const offsetVal = top + 25;
            if (messageHeight < offsetVal) {
                span.style.top = `${-messageHeight}px`;
            }
        }
    }, [messageRef]);
    useEffect(() => {
        calculateYPosition();
        document.addEventListener('scroll', calculateYPosition);
        return () => {
            document.removeEventListener('scroll', calculateYPosition);
        };
    }, [messageRef, calculateYPosition]);

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
