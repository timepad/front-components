import React, {FC} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import {uniqueId} from '../../../services/helpers/uniqueId';
import {Row} from '../../row';
import BulletSvg from '../../../assets/svg/16/icon-bullet-16.svg';
import {IFormRadioProps} from './Radio.types';

import './index.less';
import {noop} from '../Textarea/utils';

export const Radio: FC<IFormRadioProps> = (props) => {
    const {
        checked = false,
        disabled = false,
        small = false,
        id = uniqueId(),
        error = '',
        text = '',
        caption = '',
        name = '',
        onChange = noop,
    } = props;

    const wrapperClasses = component('form__radio')({error: !!error, disabled: disabled});
    const radioClasses = component('form__radio', 'icon')({checked: checked});
    const idx = id + '_field_radio';

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
