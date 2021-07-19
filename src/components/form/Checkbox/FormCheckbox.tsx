import React, {FC, useState} from 'react';
import './index.less';
import {Row} from '../../row';
import {uniqueId} from '../../../services/helpers/uniqueId';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';

interface IFormCheckboxProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    text?: string;
    caption?: string;
    error?: string;
}

export const FormCheckbox: FC<IFormCheckboxProps> = (props) => {
    const {error, checked, disabled, text, caption, name} = props;

    // const [localId] = useState<string>(id ? id : uniqueId());
    // const idx = localId ? localId + '_field_checkbox' : name + '_field_checkbox';

    const wrapperClasses = component('form--checkbox')({error: !!error, disabled: disabled});

    const checkboxClasses = component('form--checkbox', 'icon')({checked: checked});

    return (
        <>
            {/*<div className={wrapperClasses}>*/}
            {/*    <label htmlFor={idx}>*/}
            {/*        <input*/}
            {/*            type="checkbox"*/}
            {/*            name={name}*/}
            {/*            id={idx}*/}
            {/*            checked={checked}*/}
            {/*            value={value}*/}
            {/*            onChange={onChange}*/}
            {/*            onBlur={onBlur}*/}
            {/*            {...props}*/}
            {/*        />*/}
            {/*        <span className={checkboxClasses}>*/}
            {/*            <CheckSvg />*/}
            {/*        </span>*/}
            {/*        <span className={labeClasses}>{label}</span>*/}
            {/*    </label>*/}
            {/*</div>*/}
            <Row disabled={disabled} dark onClick={!disabled ? props.onClick : undefined} className={wrapperClasses}>
                <Row.Icon top={!!caption}>
                    <label>
                        <input
                            type="checkbox"
                            name={name}
                            disabled={disabled}
                            // id={idx}
                            {...props}
                        />
                        <span className={checkboxClasses}>
                            <CheckSvg />
                        </span>
                    </label>
                </Row.Icon>
                <Row.Body>
                    {props.text && <Row.Text>{text}</Row.Text>}
                    {props.caption && <Row.Caption>{caption}</Row.Caption>}
                </Row.Body>
            </Row>
        </>
    );
};
