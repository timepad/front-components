import React, {FC, useState} from 'react';
import './index.less';
import {component} from '../../../services/helpers/classHelpers';
import {uniqueId} from '../../../services/helpers/uniqueId';
import {Row} from '../../row';
import BulletSvg from '../../../assets/svg/16/icon-bullet-16.svg';
import {IFormRadioProps} from './FormRadio.types';

export const FormRadio: FC<IFormRadioProps> = (props) => {
    const {error, checked, disabled, id, text, caption, name, onChange, small} = props;

    const wrapperClasses = component('form--radio')({error: !!error, disabled: disabled});
    const radioClasses = component('form--radio', 'icon')({checked: checked});
    const [localId] = useState<string>(id ? id : uniqueId());
    const idx = localId ? localId + '_field_checkbox' : name + '_field_checkbox';

    return (
        <Row ffFont small={small} disabled={disabled} className={wrapperClasses}>
            <label htmlFor={idx}>
                <Row.Icon top={!!caption}>
                    <label>
                        <input type="radio" id={idx} checked={checked} onChange={onChange} name={name} {...props} />
                        <span className={radioClasses}>
                            <BulletSvg />
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
