import * as React from 'react';
import {MouseEventHandler} from 'react';
import {Button as TPUIButton, ButtonVariant} from '../button';

interface IProps {
    label: string;
    onClick?: MouseEventHandler;
    rowClass?: string;
    variant?: ButtonVariant;
}

export const Button: React.FC<IProps> = (props) => {
    const rowClass = props.rowClass || '';
    return (
        <li className={rowClass}>
            <span className="cdrop__btn cdrop__btn--wrapper">
                <TPUIButton label={props.label} variant={props.variant} onClick={props.onClick} />
            </span>
        </li>
    );
};
