import * as React from 'react';
import {Fragment, ReactNode} from 'react';
import cx from 'classnames';
import {component, layout} from '../../services/helpers/classHelpers';
import {Button} from '../button';

export interface IFooterComponentProps {
    description?: string;
    headerContent?: ReactNode;
    wrapperRef?: React.MutableRefObject<HTMLDivElement | null>;
    noModal?: boolean;
    submitLabel?: string;
    submitHandler?: () => void;
    submitDisabled?: boolean;
    cancelLabel?: string;
    cancelHandler?: () => void;
    cancelDisabled?: boolean;
}

export const Footer: React.FC<IFooterComponentProps> = ({
    submitLabel,
    submitDisabled,
    submitHandler,
    cancelLabel,
    cancelDisabled,
    cancelHandler,
}) => {
    const isSubmit = submitLabel && submitHandler;
    const isCancel = cancelLabel && cancelHandler;
    const isFooter = isSubmit || isCancel;

    return isFooter ? (
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
    ) : null;
};
