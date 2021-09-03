// НЕ ИСПОЛЬЗОВАТЬ БУДЕТ УДАЛЕН!
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
import {AutoPlacement} from '@popperjs/core/lib/enums';
import {useClickOutside} from './helpers/useClickOutside';

type DropdownPosition = VariationPlacement;
// "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"

export interface IDropdownProps {
    show?: boolean;
    white?: boolean;
    onClose?: () => void;
    parent?: React.MutableRefObject<HTMLElement | null>;
    children?: ReactNode;
    positions?: DropdownPosition | AutoPlacement;
    // enable with icons dropdown style
    withIcons?: boolean;
    doNotCloseMobileDDOnAnyClick?: boolean;
}

const EDGE_PADDING = 8;

export const Dropdown = ({
    children,
    white,
    positions = 'bottom-end',
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

    const toggleShow = () => {
        if (!show) {
            onClose?.();
        }
        setShow(!show);
    };

    const onCloseHandler = () => {
        onClose?.();
        setShow(false);
    };

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
