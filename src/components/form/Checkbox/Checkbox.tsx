import React, {FC} from 'react';
import './index.less';
import {component} from '../../../services/helpers/classHelpers';
import CheckboxIcon from '../../../assets/svg/24/icon-check-24.svg';
import IndeterminateCheckBoxIcon from '../../../assets/svg/24/icon-minus-24.svg';
import {ICheckboxProps} from './Checkbox.types';
import {Row} from '../../row';
import {uniqueId} from '../../../services/helpers/uniqueId';

export const Checkbox: FC<ICheckboxProps> = (props) => {
    const {
        error = '',
        checked = false,
        indeterminate = false,
        disabled = false,
        id = uniqueId(),
        text = '',
        caption = '',
        small = false,
        onChange,
    } = props;
    const wrapperClasses = component('form--checkbox')({error: !!error, disabled: disabled});
    const idx = id + '_field_checkbox';
    const checkboxClasses = component(
        'form--checkbox',
        'icon',
    )({
        checked: checked || indeterminate,
    });

    const icon = indeterminate ? <IndeterminateCheckBoxIcon /> : <CheckboxIcon />;

    return (
        <Row ffFont small={small} disabled={disabled} className={wrapperClasses}>
            <label htmlFor={idx}>
                <Row.Icon top={!!caption}>
                    <label>
                        <input type="checkbox" id={idx} onChange={onChange} {...props} />
                        <span className={checkboxClasses}>{icon}</span>
                    </label>
                </Row.Icon>
                <Row.Body>
                    {props.text && <Row.Text id={idx}>{text}</Row.Text>}
                    {props.caption && <Row.Caption>{caption}</Row.Caption>}
                </Row.Body>
            </label>
        </Row>
    );
};