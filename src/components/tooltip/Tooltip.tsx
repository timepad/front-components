import * as React from 'react';
import {FC, HTMLAttributes, ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

import './ctooltip.less';
import {usePopper} from 'react-popper';

export interface ITooltip extends HTMLAttributes<HTMLSpanElement> {
    active?: boolean;
    message?: ReactNode;
    transition?: number;
}

const titleClasses = component('tooltip', 'title')();

export const Tooltip: FC<ITooltip> = ({
    transition = 300,
    message = '',
    children,
    active = false,
    className,
    ...restProps
}) => {
    const [isActive, setIsActive] = useState<boolean>(active);
    useEffect(() => {
        if (active !== isActive) setIsActive(active);
        //eslint-disable-next-line
    }, [active]);

    const [referenceElement, setReferenceElement] = useState<HTMLSpanElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: 'top-start',
    });

    const ref = useRef<HTMLSpanElement>(null);
    const onClickOutside = (e: MouseEvent): void => {
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

    const divClasses = useMemo<string>(() => {
        return cx(component('tooltip')(), className);
    }, [className]);
    const messageClasses = useMemo<string>(() => {
        return component('tooltip', 'message')({['is-active']: isActive});
    }, [isActive]);

    return (
        <span
            {...restProps}
            style={{...restProps.style, transition: 'all ease ' + transition + 'ms'}}
            className={divClasses}
            ref={ref}
        >
            <div ref={setReferenceElement} className={titleClasses} onClick={() => setIsActive(true)}>
                {children}
            </div>

            <div
                ref={setPopperElement}
                className={messageClasses}
                style={styles.popper}
                {...attributes.popper}
                onClick={() => setIsActive(true)}
            >
                {message}
            </div>
        </span>
    );
};
