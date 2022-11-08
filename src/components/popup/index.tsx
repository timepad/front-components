import React, {useState, useRef, useEffect, useImperativeHandle, useLayoutEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';

import {useOnClickOutside, useOnEscape, useRepositionOnResizeBlock, useRepositionOnResizeWindow} from './hooks';
import {calculateModifiers} from './utils';
import {styles} from './styles';

import './index.less';

const getRootPopup = (popupId = 'popup-root') => {
    let PopupRoot = document.getElementById(popupId);

    if (PopupRoot === null) {
        PopupRoot = document.createElement('div');
        PopupRoot.setAttribute('id', popupId);
        document.body.appendChild(PopupRoot);
    }

    return PopupRoot;
};

export type Event = 'hover' | 'click' | 'focus' | 'right-click';
export type PopupPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'right-top'
    | 'right-center'
    | 'right-bottom'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'left-top'
    | 'left-center'
    | 'left-bottom'
    | 'center-center'
    | 'corner-top-left'
    | 'corner-top-right'
    | 'corner-bottom-left'
    | 'corner-bottom-right';

export interface IPopupActions {
    open: () => void;
    close: () => void;
    toggle: () => void;
}
export interface IPopupProps {
    trigger: React.FC<{isOpen: boolean}>;
    open?: boolean;
    disabled?: boolean;
    nested?: boolean;
    defaultOpen?: boolean;
    on?: Event | Event[];
    children?: React.ReactNode;
    position?: PopupPosition | PopupPosition[];
    offsetX?: number;
    offsetY?: number;
    modal?: boolean;
    lockScroll?: boolean;
    closeOnDocumentClick?: boolean;
    closeOnEscape?: boolean;
    repositionOnResize?: boolean;
    repositionOnChangeContent?: boolean;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    onOpen?: (event?: React.SyntheticEvent) => void;
    onClose?: (event?: React.SyntheticEvent | KeyboardEvent | TouchEvent | MouseEvent) => void;
    contentStyle?: React.CSSProperties;
    overlayStyle?: React.CSSProperties;
    className?: string;
    keepTooltipInside?: boolean | string;
    triggerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    customPopupRoot?: string;
}
const noop = () => {
    return;
};

let dropdownIdCounter = 0;
export const Popup = React.forwardRef<IPopupActions, IPopupProps>(
    (
        {
            trigger = null,
            onOpen = noop,
            onClose = noop,
            defaultOpen = false,
            open = undefined,
            disabled = false,
            nested = false,
            closeOnDocumentClick = true,
            repositionOnResize = true,
            repositionOnChangeContent = true,
            closeOnEscape = true,
            on = ['click'],
            contentStyle = {},
            overlayStyle = {},
            className = '',
            position = 'bottom-center',
            modal = false,
            lockScroll = false,
            offsetX = 0,
            offsetY = 0,
            mouseEnterDelay = 100,
            mouseLeaveDelay = 100,
            keepTooltipInside = false,
            customPopupRoot,
            children,
            triggerProps: tProps,
        },
        ref,
    ) => {
        const [isOpen, setIsOpen] = useState<boolean>(open || defaultOpen);
        const triggerRef = useRef<HTMLElement>(null);
        const contentRef = useRef<HTMLElement>(null);
        const focusedElBeforeOpen = useRef<Element | null>(null);
        const popupId = useRef<string>(`popup-${++dropdownIdCounter}`);

        const isModal = modal ? true : !trigger;
        const timeOut = useRef(0);

        const handleLockScroll = useCallback(() => {
            if (lockScroll) document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        }, [lockScroll]);

        const resetScroll = useCallback(() => {
            if (lockScroll) document.getElementsByTagName('body')[0].style.overflow = 'auto';
        }, [lockScroll]);

        const setPosition = useCallback(() => {
            if (isModal || !isOpen) {
                return;
            }
            if (!triggerRef?.current || !contentRef?.current) {
                throw Error('Одна из ссылок не определена!');
            }
            const trigger = triggerRef.current.getBoundingClientRect();
            const content = contentRef.current.getBoundingClientRect();

            const modifiers = calculateModifiers(
                trigger,
                content,
                position,
                {
                    offsetX,
                    offsetY,
                },
                keepTooltipInside,
            );

            contentRef.current.style.top = modifiers.top !== undefined ? `${modifiers.top + window.scrollY}px` : '';
            contentRef.current.style.bottom =
                modifiers.bottom !== undefined ? `${modifiers.bottom - window.scrollY}px` : '';
            contentRef.current.style.left = modifiers.left !== undefined ? `${modifiers.left + window.scrollX}px` : '';
            contentRef.current.style.right =
                modifiers.right !== undefined ? `${modifiers.right - window.scrollX}px` : '';
        }, [isModal, isOpen, keepTooltipInside, offsetX, offsetY, position]);

        useLayoutEffect(() => {
            if (isOpen) {
                if (triggerRef.current) triggerRef.current.className = 'popup-hovered-trigger';
                focusedElBeforeOpen.current = document.activeElement;
                setPosition();
                if (contentRef.current) {
                    focusContentOnOpen();
                }
                handleLockScroll();
            } else {
                if (triggerRef.current) triggerRef.current.className = '';
                resetScroll();
            }
            return () => {
                resetScroll();
                clearTimeout(timeOut.current);
            };
        }, [isOpen, handleLockScroll, resetScroll, setPosition]);

        const openPopup = useCallback(
            (event?: React.SyntheticEvent) => {
                if (isOpen || disabled) return;
                setIsOpen(true);
                setTimeout(() => onOpen(event), 0);
            },
            [disabled, isOpen, onOpen],
        );

        const closePopup = useCallback(
            (event?: React.SyntheticEvent | KeyboardEvent | TouchEvent | MouseEvent) => {
                if (!isOpen || disabled) return;
                setIsOpen(false);
                if (isModal) (focusedElBeforeOpen.current as HTMLElement)?.focus();
                setTimeout(() => onClose(event), 0);
            },
            [disabled, isOpen, isModal, onClose, on],
        );

        const togglePopup = (event?: React.SyntheticEvent) => {
            event?.stopPropagation();
            if (!isOpen) openPopup(event);
            else closePopup(event);
        };

        useEffect(() => {
            if (typeof open === 'boolean') {
                if (open) openPopup();
                else closePopup();
            }
        }, [open, disabled]);

        const onMouseEnter = (event?: React.SyntheticEvent) => {
            clearTimeout(timeOut.current);
            timeOut.current = Number(setTimeout(() => openPopup(event), mouseEnterDelay));
        };

        const onContextMenu = (event?: React.SyntheticEvent) => {
            event?.preventDefault();
            togglePopup();
        };

        const onMouseLeave = (event?: React.SyntheticEvent) => {
            clearTimeout(timeOut.current);
            timeOut.current = Number(setTimeout(() => closePopup(event), mouseLeaveDelay));
        };

        const focusContentOnOpen = () => {
            const focusableEls = contentRef?.current?.querySelectorAll(
                'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]',
            );
            const firstEl = Array.prototype.slice.call(focusableEls)[0];
            firstEl?.focus();
        };

        useImperativeHandle(ref, () => ({
            open: () => {
                openPopup();
            },
            close: () => {
                closePopup();
            },
            toggle: () => {
                togglePopup();
            },
        }));

        useOnEscape(closePopup, closeOnEscape);
        useRepositionOnResizeWindow(setPosition, repositionOnResize);
        useRepositionOnResizeBlock(setPosition, contentRef, repositionOnChangeContent);
        useOnClickOutside(
            !!trigger ? [contentRef, triggerRef] : [contentRef],
            closePopup,
            closeOnDocumentClick && !nested,
        );
        const renderTrigger = () => {
            // тут можно километровый тип добавить или пачку конструкторов, но так короче
            const triggerProps: Record<string, unknown> = {
                ...tProps,
                style: {
                    display: 'inline-block',
                    lineHeight: 0,
                    ...tProps?.style,
                },
                key: 'T',
                ref: triggerRef,
                'aria-describedby': popupId.current,
            };
            const onAsArray = Array.isArray(on) ? on : [on];
            for (let i = 0, len = onAsArray.length; i < len; i++) {
                switch (onAsArray[i]) {
                    case 'click':
                        triggerProps.onClick = togglePopup;
                        break;
                    case 'right-click':
                        triggerProps.onContextMenu = onContextMenu;
                        break;
                    case 'hover':
                        triggerProps.onMouseEnter = onMouseEnter;
                        triggerProps.onMouseLeave = onMouseLeave;
                        break;
                    case 'focus':
                        triggerProps.onFocus = onMouseEnter;
                        triggerProps.onBlur = onMouseLeave;
                        break;
                    default:
                }
            }

            if (typeof trigger === 'function') {
                const Trigger = trigger;
                return (
                    <div {...triggerProps}>
                        <Trigger isOpen={isOpen} />
                    </div>
                );
            }
        };

        const addWarperAction = () => {
            const popupContentStyle = isModal ? styles.popupContent.modal : styles.popupContent.tooltip;
            // тут можно километровый тип добавить или пачку конструкторов, но так короче
            const childrenElementProps: any = {
                className: `popup-content ${
                    className !== ''
                        ? className
                              .split(' ')
                              .map((c) => `${c}-content`)
                              .join(' ')
                        : ''
                }`,
                style: {
                    ...popupContentStyle,
                    ...contentStyle,
                    pointerEvents: 'auto',
                },
                ref: contentRef,
                onClick: (e: React.SyntheticEvent) => {
                    e.stopPropagation();
                },
            };
            if (!modal && on.indexOf('hover') >= 0) {
                childrenElementProps.onMouseEnter = onMouseEnter;
                childrenElementProps.onMouseLeave = onMouseLeave;
            }
            return childrenElementProps;
        };

        const renderContent = () => {
            // input нужен что бы не было автофокуса по 1ому элементу
            return (
                <div {...addWarperAction()} key="C" role={isModal ? 'dialog' : 'tooltip'} id={popupId.current}>
                    <input style={{display: 'none'}} />
                    {children && typeof children === 'function' ? children(closePopup, isOpen) : children}
                </div>
            );
        };

        const overlay = !(on.indexOf('hover') >= 0);
        const ovStyle = isModal ? styles.overlay.modal : styles.overlay.tooltip;

        const content = [
            overlay && (
                <div
                    key="O"
                    data-testid="overlay"
                    data-popup={isModal ? 'modal' : 'tooltip'}
                    className={`popup-overlay ${
                        className !== ''
                            ? className
                                  .split(' ')
                                  .map((c) => `${c}-overlay`)
                                  .join(' ')
                            : ''
                    }`}
                    style={{
                        ...ovStyle,
                        ...overlayStyle,
                        pointerEvents: (closeOnDocumentClick && nested) || isModal ? 'auto' : 'none',
                    }}
                    onClick={closeOnDocumentClick && nested ? closePopup : undefined}
                    tabIndex={-1}
                >
                    {isModal && renderContent()}
                </div>
            ),

            !isModal && renderContent(),
        ];

        return (
            <>
                {renderTrigger()}
                {isOpen && ReactDOM.createPortal(content, getRootPopup(customPopupRoot))}
            </>
        );
    },
);
