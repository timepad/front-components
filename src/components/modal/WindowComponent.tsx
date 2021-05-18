import * as React from 'react';
import {Fragment, ReactNode, useEffect} from 'react';
import {component, layout} from '../../services/helpers/classHelpers';
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

export const WindowComponent: React.FC<IWindowComponentProps> = ({
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
}) => {
    const isSubmit = submitLabel && submitHandler;
    const isCancel = cancelLabel && cancelHandler;
    const isFooter = isSubmit || isCancel;
    const titleClass = component(
        'form',
        'title',
    )({
        'back-btn': !!backHandler && !closeHandler,
        'dual-btns': !!backHandler && !!closeHandler,
        'without-btns': !backHandler && !closeHandler,
        'bg-transparent': titleIsTransparent,
    });

    useEffect(() => {
        if (!noModal) {
            document.body.classList.add('modal-open');
            return () => document.body.classList.remove('modal-open');
        }
    }, [noModal]);

    return (
        <div className={cx(component('form', 'window')(), layout('flex')({'y-axis': true}))} ref={wrapperRef}>
            {title && (
                <div className={titleClass}>
                    {backHandler && (
                        <Button
                            variant={Button.variant.transparent}
                            icon={<BackSvg />}
                            className={component('form', 'icon')('back')}
                            onClick={backHandler}
                        />
                    )}
                    <div className={layout('flex')({'y-axis': true})}>
                        <div className={cx(layout('brick')(), layout('brick-1-5')())} />
                        <h3 className={cx('t-lead', 't-lead--brick', component('form', 'title-text')())}>{title}</h3>
                        {description && (
                            <Fragment>
                                <div className={layout('brick')()} />
                                <p className={cx('t-caption', 't-caption--brick', component('form', 'title-desc')())}>
                                    {description}
                                </p>
                            </Fragment>
                        )}
                        {headerContent}
                    </div>
                    {closeHandler && (
                        <Button
                            variant={Button.variant.transparent}
                            icon={<CloseSvg />}
                            className={component('form', 'icon')({close: true})}
                            onClick={closeHandler}
                        />
                    )}
                </div>
            )}
            <div>
                <div className={cx(layout('brick')(), layout('brick-0-5')())} />
                {children}
            </div>
            {isFooter && (
                <Fragment>
                    <div className={cx(layout('brick')(), layout('brick-2')())} />
                    <div className={component('form', 'footer')()}>
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
