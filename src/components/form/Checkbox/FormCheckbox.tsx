import React, {FC, useRef, useState} from 'react';
import './index.less';
import {Row} from '../../row';
import {component} from '../../../services/helpers/classHelpers';
import CheckIcon from '../../../assets/svg/24/icon-check-24.svg';
import MinusCheckIcon from '../../../assets/svg/24/icon-minus-24.svg';
import {FieldHelperProps} from 'formik/dist/types';
import {CheckboxType, IFormCheckboxProps} from './FormCheckbox.types';
import {uniqueId} from '../../../services/helpers/uniqueId';

export const FormCheckbox: FC<IFormCheckboxProps & Partial<FieldHelperProps<boolean>>> = (props) => {
    const {error, value, disabled, id, text, caption, name, onChange, small} = props;
    const wrapperClasses = component('form--checkbox')({error: !!error, disabled: disabled});
    const checkboxClasses = component('form--checkbox', 'icon')({checked: value === 'on' || value === 'partial'});
    const [localId] = useState<string>(id ? id : uniqueId());
    const idx = localId ? localId + '_field_checkbox' : name + '_field_checkbox';
    const ref = useRef<HTMLInputElement | null>(null);

    const icons = {
        ['on']: <CheckIcon />,
        ['partial']: <MinusCheckIcon />,
        ['off']: <></>,
    };

    return (
        <Row ffFont small={small} disabled={disabled} className={wrapperClasses}>
            <label htmlFor={idx}>
                <Row.Icon top={!!caption}>
                    <label>
                        <input type="checkbox" id={idx} ref={ref} onChange={onChange} {...props} />
                        <span className={checkboxClasses}>{icons[value as CheckboxType]}</span>
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
