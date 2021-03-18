import React, {Fragment, ReactNode, useEffect} from 'react';
import cx from 'classnames';

import BackSvg from '../../assets/svg/24/icon-arrow-24.svg';
import CloseSvg from '../../assets/svg/24/icon-close-24.svg';
import {Button} from '../button';

interface IWindowComponentProps {
    title: string;
    titleIsTransparent?: boolean;
    description?: string;
    headerContent?: ReactNode;
    wrapperRef?: React.MutableRefObject<HTMLDivElement | null>;
    noModal?: boolean;
    backHandler?: () => void;
    closeHandler?: () => void;
    submitLabel?: string;
    submitHandler?: () => void;
    submitDisabled?: boolean;
    cancelLabel?: string;
    cancelHandler?: () => void;
    cancelDisabled?: boolean;
}

export const WindowComponent = ({
    children,
    title,
    description,
    headerContent,
    wrapperRef,
    backHandler,
    closeHandler,
    noModal,
    submitLabel,
    submitHandler,
    submitDisabled = false,
    cancelLabel,
    cancelHandler,
    cancelDisabled = false,
    titleIsTransparent = false,
}: React.PropsWithChildren<IWindowComponentProps>): React.ReactElement => {
    const isSubmit = submitLabel && submitHandler;
    const isCancel = cancelLabel && cancelHandler;
    const isFooter = isSubmit || isCancel;
    const titleClass = cx('mform__title', {
        'mform__title--back-btn': !!backHandler && !closeHandler,
        'mform__title--dual-btns': !!backHandler && !!closeHandler,
        'mform__title--without-btns': !backHandler && !closeHandler,
        'mform__title--bg-transparent': titleIsTransparent,
    });

    useEffect(() => {
        if (!noModal) {
            document.body.classList.add('modal-open');
            return () => document.body.classList.remove('modal-open');
        }
    }, [noModal]);

    return (
        <div className="mform__window lflex--y-axis" ref={wrapperRef}>
            {title && (
                <div className={titleClass}>
                    {backHandler && (
                        <Button
                            variant={Button.variant.transparent}
                            icon={<BackSvg />}
                            className="mform__icon--back"
                            onClick={backHandler}
                        />
                    )}
                    <div className="lflex lflex--y-axis">
                        <div className="lbrick lbrick-1-5" />
                        <h3 className="t-lead t-lead--brick mform__title-text">{title}</h3>
                        {description && (
                            <Fragment>
                                <div className="lbrick" />
                                <p className="t-caption t-caption--brick mform__title-desc">{description}</p>
                            </Fragment>
                        )}
                        {headerContent}
                    </div>
                    {closeHandler && (
                        <Button
                            variant={Button.variant.transparent}
                            icon={<CloseSvg />}
                            className="mform__icon--close"
                            onClick={closeHandler}
                        />
                    )}
                </div>
            )}
            <div>
                <div className="lbrick lbrick-0-5" />
                {children}
            </div>
            {isFooter && (
                <Fragment>
                    <div className="lbrick lbrick-2" />
                    <div className="mform__footer">
                        {isSubmit && (
                            <Button
                                variant={Button.variant.primary}
                                label={submitLabel}
                                disabled={submitDisabled}
                                onClick={submitHandler}
                                fixed
                                large
                            />
                        )}
                        {isCancel && (
                            <Button
                                variant={Button.variant.secondary}
                                label={cancelLabel}
                                disabled={cancelDisabled}
                                onClick={cancelHandler}
                                fixed
                                large
                            />
                        )}
                    </div>
                </Fragment>
            )}
        </div>
    );
};
