import React, {FC} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import {IconCheck24, IconMinus24} from '../../../icons';
import cn from 'classnames';
import {ICheckboxProps} from './Checkbox.types';
import {Row} from '../../row';
import {uniqueId} from '../../../services/helpers/uniqueId';
import {noop} from '../Textarea/utils';
import './index.less';

export const Checkbox: FC<ICheckboxProps> = ({
    rounded = false,
    checked = false,
    indeterminate = false,
    disabled = false,
    id = uniqueId() + '_field_checkbox',
    error = '',
    text = '',
    caption = '',
    small = false,
    onChange = noop,
    className,
    ...props
}) => {
    const wrapperClasses = cn(component('form__checkbox')({error: !!error, disabled: disabled}), className);
    const checkboxClasses = component(
        'form__checkbox',
        'icon',
    )({
        checked: checked || indeterminate,
        rounded: rounded,
    });
    const bodyClassNames = component(
        'form__checkbox',
        'body',
    )({
        small,
    });

    const icon = indeterminate ? <IconMinus24 /> : <IconCheck24 />;

    return (
        <Row ffFont small={small} disabled={disabled} className={wrapperClasses} horizontalPadding={0}>
            <label htmlFor={id}>
                <Row.Icon top={!!caption}>
                    <label>
                        <input
                            disabled={disabled}
                            checked={checked}
                            type="checkbox"
                            id={id}
                            onChange={onChange}
                            {...props}
                        />
                        <span className={checkboxClasses}>{icon}</span>
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
