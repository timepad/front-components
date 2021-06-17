import * as React from 'react';
import {useRef, useEffect, MutableRefObject} from 'react';
import cx from 'classnames';
import {component, layout} from '../../services/helpers/classHelpers';
import ReactModal from 'react-modal';
import {Header, Title, Description, IHeaderComponentProps} from './ModalHeader';
import {Footer} from './ModalFooter';
import {Body} from './ModalBody';
import './index.less';

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
    isClean?: boolean;
    className?: string;
    overlayClassName?: string;
    isOpen: boolean;
    blockCloseOnOutsideClick?: boolean;
    onClose?: () => void;
}

export const Modal: React.FC<IModalProps> & {
    Header: React.FC<IHeaderComponentProps>;
    Body: React.FC;
    Footer: React.FC;
    Title: React.FC;
    Description: React.FC;
} = (props) => {
    const {children, isClean, className, overlayClassName, isOpen, blockCloseOnOutsideClick, onClose} = props;

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(wrapperRef, () => {
        const hasDropdown = document.body.classList.contains('dd-open');
        if (!hasDropdown && !blockCloseOnOutsideClick) {
            onClose && onClose();
        }
    });

    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => document.body.classList.remove('modal-open');
    }, []);

    return (
        <ReactModal
            className={cx(component('portal')(), className)}
            overlayClassName={cx(component('portal', 'overlay')(), overlayClassName)}
            isOpen={isOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={false}
        >
            {isOpen &&
                children &&
                (!isClean ? (
                    <div
                        className={cx(component('form', 'window')(), layout('flex')({'y-axis': true}))}
                        ref={wrapperRef}
                    >
                        {children}
                    </div>
                ) : (
                    <div ref={wrapperRef}>{children}</div>
                ))}
        </ReactModal>
    );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.Title = Title;
Modal.Description = Description;
