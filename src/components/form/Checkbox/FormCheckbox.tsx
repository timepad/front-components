import React, {FC, useState} from 'react';
import './index.less';
import {Row} from '../../row';
import {component} from '../../../services/helpers/classHelpers';
import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';
import {FieldHelperProps} from 'formik/dist/types';
import {IFormCheckboxProps} from './FormCheckbox.types';
import {uniqueId} from '../../../services/helpers/uniqueId';

export const FormCheckbox: FC<IFormCheckboxProps & Partial<FieldHelperProps<boolean>>> = (props) => {
    const {error, checked, disabled, id, text, caption, name, onChange} = props;

    const wrapperClasses = component('form--checkbox')({error: !!error, disabled: disabled});
    const checkboxClasses = component('form--checkbox', 'icon')({checked: checked});
    const [localId] = useState<string>(id ? id : uniqueId());
    const idx = localId ? localId + '_field_checkbox' : name + '_field_checkbox';

    // const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     if (setValue) {
    //         setValue(!checked);
    //     } else if (onClick) {
    //         onClick(e);
    //     }
    // };

    return (
        <Row ffFont hoverable disabled={disabled} className={wrapperClasses}>
            <label htmlFor={idx}>
                <Row.Icon top={!!caption}>
                    <label>
                        <input type="checkbox" id={idx} checked={checked} onChange={onChange} {...props} name={name} />
                        <span className={checkboxClasses}>
                            <CheckSvg />
                        </span>
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
