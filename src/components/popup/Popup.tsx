import * as React from 'react';
import {useRef, ReactNode, useEffect, MutableRefObject} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

import ReactModal from 'react-modal';

import {WindowComponent} from './WindowComponent';

const useClickOutside = (
    ref: MutableRefObject<HTMLElement | null>,
    handler: (event: MouseEvent) => void,
    target?: MutableRefObject<HTMLElement>,
) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (
                !ref.current ||
                ref.current.contains(event.target as Node) ||
                target?.current.contains(event.target as Node)
            ) {
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

ReactModal.setAppElement('#root');

export interface IModalProps {
    title?: string;
    titleIsTransparent?: boolean;
    description?: string;
    headerContent?: ReactNode;
    className?: string;
    overlayClassName?: string;
    isOpen: boolean;
    blockCloseOnOutsideClick?: boolean;
    onRequestClose?: () => void;
    backHandler?: () => void;
    submitLabel?: string;
    submitHandler?: () => void;
    submitDisabled?: boolean;
    cancelLabel?: string;
    cancelHandler?: () => void;
    cancelDisabled?: boolean;
}

export const Popup: React.FC<IModalProps> = (props) => {
    const {
        children,
        title,
        description,
        headerContent,
        className,
        overlayClassName,
        isOpen,
        blockCloseOnOutsideClick,
        onRequestClose,
        backHandler,
        submitLabel,
        submitHandler,
        submitDisabled,
        cancelLabel,
        cancelHandler,
        cancelDisabled,
        titleIsTransparent,
    } = props;

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(wrapperRef, () => {
        const hasDropdown = document.body.classList.contains('dd-open');
        if (!hasDropdown && !blockCloseOnOutsideClick) {
            onRequestClose && onRequestClose();
        }
    });

    return (
        <ReactModal
            className={cx(component('portal')(), className)}
            overlayClassName={cx(component('portal', 'overlay')(), overlayClassName)}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={false}
        >
            {isOpen &&
                children &&
                (title ? (
                    <WindowComponent
                        title={title}
                        titleIsTransparent={titleIsTransparent}
                        description={description}
                        headerContent={headerContent}
                        wrapperRef={wrapperRef}
                        closeHandler={onRequestClose}
                        backHandler={backHandler}
                        submitLabel={submitLabel}
                        submitHandler={submitHandler}
                        submitDisabled={submitDisabled}
                        cancelLabel={cancelLabel}
                        cancelHandler={cancelHandler}
                        cancelDisabled={cancelDisabled}
                    >
                        {isOpen && children}
                    </WindowComponent>
                ) : (
                    <div ref={wrapperRef}>{isOpen && children}</div>
                ))}
        </ReactModal>
    );
};
