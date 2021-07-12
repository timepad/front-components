import React from 'react';
import './index.less';
import {Button} from '../button';

import {ISnackbarProps} from './SnackbarProvider';
import CheckSvg from '../../assets/svg/24/icon-check-24.svg';
import WarningSvg from '../../assets/svg/24/icon-warning-24.svg';
import {component} from '../../services/helpers/classHelpers';

export const Snackbar: React.FC<ISnackbarProps> = ({text, state, button}) => {
    // Returns the Provider that must wrap the application
    return (
        <div
            className={component('snackbar')({
                error: state === 'error' || state === 'errorWithIcon',
            })}
        >
            {state === 'successWithIcon' && <CheckSvg />}
            {state === 'errorWithIcon' && <WarningSvg />}
            <div className="csnackbar__text">{text}</div>
            {button ? (
                <Button variant={Button.variant.secondary} onClick={button.onClick}>
                    {button.label}
                </Button>
            ) : null}
        </div>
    );
};
