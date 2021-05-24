import * as React from 'react';
import {MouseEventHandler} from 'react';
import {Button as TPUIButton, ButtonVariant} from '../button';
import {component} from '../../services/helpers/classHelpers';

interface IProps {
    label: string;
    onClick?: MouseEventHandler;
    rowClass?: string;
    variant?: ButtonVariant;
    textPosition?: 'start' | 'center' | 'end';
}

export const Button: React.FC<IProps> = (props) => {
    const rowClass = props.rowClass || '';
    const textPosition = props?.textPosition;
    return (
        <li className={rowClass}>
            <span
                className={component(
                    'drop',
                    'btn',
                )({
                    wrapper: true,
                    'text-position': textPosition,
                })}
            >
                <TPUIButton label={props.label} variant={props.variant} onClick={props.onClick} />
            </span>
        </li>
    );
};
