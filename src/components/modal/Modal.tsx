import * as React from 'react';
import {useRef, useEffect, MutableRefObject, ComponentType} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import ReactModal from 'react-modal';
import {Header, Title, Description} from './ModalHeader';
import {Footer} from './ModalFooter';
import {Body} from './ModalBody';
import {Content} from './ModalContent';
import {ClickOutsideException, ExceptionCn} from './ModalClickOutsideException';
import './index.less';

const ModalSafeForReact18 = ReactModal as ComponentType<ReactModal['props']>;

const useClickOutside = (
    ref: MutableRefObject<HTMLElement | null>,
    handler: (event: MouseEvent) => void,
    target?: MutableRefObject<HTMLElement>,
) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const exceptionRefs = document.getElementsByClassName(ExceptionCn);
            if (
                !ref.current ||
                ref.current.contains(event.target as Node) ||
                target?.current.contains(event.target as Node) ||
                Array.from(exceptionRefs).some((el) => el === event.target || el.contains(event.target as Node))
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

const setReactModalAppElement = () => {
    const appElement = document.getElementById('root') || document.getElementById('storybook-root');

    if (appElement) {
        ReactModal.setAppElement(appElement);
    }
};

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setReactModalAppElement, {once: true});
    } else {
        setReactModalAppElement();
    }
}

export interface IModalProps {
    isClean?: boolean;
    className?: string;
    overlayClassName?: string;
    isOpen: boolean;
    blockCloseOnOutsideClick?: boolean;
    onClose?: () => void;
    parentSelector?: () => HTMLElement;
}

export const Modal: React.FC<React.PropsWithChildren<IModalProps>> & {
    Header: typeof Header;
    Body: typeof Body;
    Footer: typeof Footer;
    Title: typeof Title;
    Description: typeof Description;
    Content: typeof Content;
    ClickOutsideException: typeof ClickOutsideException;
} = (props) => {
    const {
        children,
        isClean,
        className,
        overlayClassName,
        isOpen,
        blockCloseOnOutsideClick,
        onClose,
        parentSelector,
        ...rest
    } = props;

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(wrapperRef, () => {
        const hasDropdown = document.body.classList.contains('dd-open');
        if (!hasDropdown && !blockCloseOnOutsideClick) {
            onClose && onClose();
        }

        document.body.classList.contains('modal-open') && document.body.classList.remove('modal-open');
    });

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isOpen]);

    useEffect(() => {
        return () => {
            document.body.classList.contains('modal-open') && document.body.classList.remove('modal-open');
        };
    }, []);

    //По-другому нет возможности устанавливать data* атрибуты
    const contentRef = (element: HTMLDivElement) => {
        Object.keys(rest).length &&
            Object.entries(rest).forEach(([key, value]) => {
                element?.setAttribute(key, value as string);
            });
    };

    return (
        <ModalSafeForReact18
            className={cx(component('portal')(), className)}
            overlayClassName={cx(component('portal', 'overlay')(), overlayClassName)}
            isOpen={isOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={false}
            contentRef={contentRef}
            parentSelector={parentSelector}
        >
            {isOpen &&
                children &&
                (!isClean ? <Content ref={wrapperRef}>{children}</Content> : <div ref={wrapperRef}>{children}</div>)}
        </ModalSafeForReact18>
    );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.Title = Title;
Modal.Description = Description;
Modal.Content = Content;
Modal.ClickOutsideException = ClickOutsideException;
