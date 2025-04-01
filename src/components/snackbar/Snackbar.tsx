import React from 'react';
import cx from 'classnames';
import './index.less';
import {Button} from '../button';

import {ISnackbarProps} from './SnackbarProvider';
import {IconCheck24, IconWarning24} from '../../icons';
import {component} from '../../services/helpers/classHelpers';

export const Snackbar: React.FC<React.PropsWithChildren<ISnackbarProps>> = ({text, state, button}) => {
    // Returns the Provider that must wrap the application
    return (
        <div
            className={cx(
                't-caption',
                component('snackbar')({
                    error: state === 'error' || state === 'errorWithIcon',
                    success: state === 'successWithIcon',
                }),
            )}
        >
            {state === 'successWithIcon' && <IconCheck24 />}
            {state === 'errorWithIcon' && <IconWarning24 />}
            <div className="csnackbar__text">{text}</div>
            {button ? (
                <Button className="csnackbar__button" variant={Button.variant.secondary} onClick={button.onClick}>
                    {button.label}
                </Button>
            ) : null}
        </div>
    );
};
