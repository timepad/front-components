import React, {useRef, ReactNode} from 'react';
import cx from 'classnames';

import ReactModal from 'react-modal';
import {useClickOutside} from '../../services/hooks/useClickOutside';

import {WindowComponent} from './WindowComponent';

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

export const Modal = (props: React.PropsWithChildren<IModalProps>): React.ReactElement => {
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
            className={cx('mportal', className)}
            overlayClassName={cx('mportal__overlay', overlayClassName)}
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
