import {IWrapperCheckboxProps} from './Checkbox.types';
import React, {FC} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import {uniqueId} from '../../../services/helpers/uniqueId';
import {Row} from '../../row';

export const WrapperCheckbox: FC<IWrapperCheckboxProps> = (props) => {
    const {
        error = '',
        disabled = false,
        id = uniqueId(),
        text = '',
        caption = '',
        small = false,
        icon = <></>,
        onChange,
    } = props;
    const wrapperClasses = component('form--checkbox')({error: !!error, disabled: disabled});
    const idx = id + '_field_checkbox';

    return (
        <Row ffFont small={small} disabled={disabled} className={wrapperClasses}>
            <label htmlFor={idx}>
                <Row.Icon top={!!caption}>
                    <label>
                        <input type="checkbox" id={idx} onChange={onChange} {...props} />
                        {icon}
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
