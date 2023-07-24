import React, {FC} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import {uniqueId} from '../../../services/helpers/uniqueId';
import cn from 'classnames';
import {Row} from '../../row';
import BulletSvg from '../../../assets/svg/16/icon-bullet-16.svg';
import {IFormRadioProps} from './Radio.types';

import './index.less';
import {noop} from '../Textarea/utils';

export const Radio: FC<IFormRadioProps> = ({
    checked = false,
    disabled = false,
    small = false,
    id = uniqueId() + '_field_radio',
    error = '',
    text = '',
    caption = '',
    name = '',
    onChange = noop,
    className,
    ...props
}) => {
    const wrapperClasses = cn(component('form__radio')({error: !!error, disabled: disabled}), className);
    const radioClasses = component('form__radio', 'icon')({checked: checked});
    const bodyClassNames = component(
        'form__radio',
        'body',
    )({
        small,
    });

    return (
        <Row ffFont small={small} disabled={disabled} className={wrapperClasses} horizontalPadding={0}>
            <label htmlFor={id}>
                <Row.Icon top={!!caption}>
                    <label>
                        <input
                            type="radio"
                            disabled={disabled}
                            id={id}
                            checked={checked}
                            onChange={onChange}
                            name={name}
                            {...props}
                        />
                        <span className={radioClasses}>
                            <BulletSvg />
                        </span>
                    </label>
                </Row.Icon>
                <Row.Body className={bodyClassNames}>
                    {text && <Row.Text id={id}>{text}</Row.Text>}
                    {caption && <Row.Caption>{caption}</Row.Caption>}
                </Row.Body>
            </label>
        </Row>
    );
};
