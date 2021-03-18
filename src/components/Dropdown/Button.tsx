import React, {MouseEventHandler} from 'react';
import {Button as TPUIButton, ButtonVariant} from '../button';

interface IProps {
    label: string;
    onClick?: MouseEventHandler;
    rowClass?: string;
    variant?: ButtonVariant;
}

export const Button = (props: IProps): React.ReactElement => {
    const rowClass = props.rowClass || '';
    return (
        <li className={rowClass}>
            <span className="mdrop__btn mdrop__btn--wrapper">
                <TPUIButton label={props.label} variant={props.variant} onClick={props.onClick} />
            </span>
        </li>
    );
};
