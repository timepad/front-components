import React, {useEffect, useRef} from 'react';
import {ReactNode, useState} from 'react';
import {usePopper} from 'react-popper';
import {VariationPlacement} from '@popperjs/core';
import cx from 'classnames';
import {Row} from './Row';
import {Button as ButtonRow} from './Button';
import {Option} from './Option';
import {Body} from './Body';
import {ToggleButton} from './ToggleButton';
import {DropDownManagerContext} from './ManagerContext';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

/*
┌───────┐ ┌───┐    ┌───┐ ┌───────┐
│   tl  │ │   │    │   │ │  tr   │
└───────┘ │rt │    │ lt│ └───────┘
┌───┐ ┌─┐ │   │    │   │ ┌─┐ ┌───┐
│   │ └─┘ └───┘    └───┘ └─┘ │   │
│ lb│ ┌───────┐    ┌───────┐ │rb │
│   │ │  br   │    │   bl  │ │   │
└───┘ └───────┘    └───────┘ └───┘
*/
type DropdownPosition = VariationPlacement;
// "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"

const useClickOutside = (ref: HTMLElement | null, handler: (event: MouseEvent) => void, target?: HTMLElement): void => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref || ref.contains(event.target as Node | null) || target?.contains(event.target as Node | null)) {
                return;
            }

            handler(event as MouseEvent);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler, target]);
};

export interface IDropdownProps {
    show?: boolean;
    white?: boolean;
    onClose?: () => void;
    parent?: React.MutableRefObject<HTMLElement | null>;
    children?: ReactNode;
    positions?: DropdownPosition;
    // enable with icons dropdown style
    withIcons?: boolean;
    doNotCloseMobileDDOnAnyClick?: boolean;
    childrenRef?: React.MutableRefObject<HTMLDivElement | null>;
    isOutSideClick?: boolean;
}

const EDGE_PADDING = 8;
//
// const TOP_SHIFT = 2;
//
// const TOP_PADDING = 16;

export const Dropdown = ({
    children,
    white,
    positions,
    withIcons,
    parent,
    show: propShow = false,
    onClose,
}: IDropdownProps): React.ReactElement => {
    const [show, setShow] = useState<boolean>(propShow);
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const target = parent?.current ? parent.current : referenceElement;
    const {styles, attributes, state} = usePopper(target, popperElement, {
        placement: positions,
        modifiers: [
            {name: 'arrow', options: {element: null}},
            {
                name: 'offset',
                options: {
                    offset: [0, EDGE_PADDING],
                },
            },
        ],
    });

    const toggleShow = () => setShow(!show);

    const onCloseHandler = () => setShow(false);

    useEffect(() => {
        if (!show) {
            onClose?.();
        }
    }, [show]);

    useEffect(() => {
        setShow(propShow);
    }, [propShow]);

    useEffect(() => {
        if (state?.modifiersData) {
            const clientHeight = document.documentElement.clientHeight;
            const modifiersData = state.modifiersData;
            const popperOffsets = modifiersData.popperOffsets;
            if (scrollRef?.current && popperOffsets) {
                const nodeDropList = scrollRef.current;
                const dorpListHeight = nodeDropList.getBoundingClientRect().height;
                if (dorpListHeight + popperOffsets.y > clientHeight) {
                    nodeDropList.style.maxHeight = `calc(100vh - ${popperOffsets.y + 16}px)`;
                }
            }
        }
    }, [state?.modifiersData]);

    useClickOutside(
        popperElement,
        () => {
            onCloseHandler();
        },
        target as HTMLElement,
    );

    const dropClassName = cx(
        component(
            'drop',
            'body',
        )({
            right: false,
            show: show,
            white: white,
            'with-icons': withIcons,
        }),
    );

    return (
        <DropDownManagerContext.Provider
            value={{
                toggle: toggleShow,
                show,
                setReferenceElement,
                setPopperElement,
                styles,
                attributes,
                onCloseHandler,
                white: !!white,
                dropClassName,
                scrollRef,
            }}
        >
            {children}
        </DropDownManagerContext.Provider>
    );
};

Dropdown.Row = Row;
Dropdown.Button = ButtonRow;
Dropdown.Option = Option;
Dropdown.Body = Body;
Dropdown.ToggleButton = ToggleButton;
