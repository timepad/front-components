import * as React from 'react';
import {Fragment, PropsWithChildren} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

import './index.less';

export enum ButtonVariant {
    primary = 'primary',
    secondary = 'secondary',
    transparent = 'transparent',
    stroke = 'stroke',
    controller = 'controller',
}

export enum ButtonIconAlignment {
    left = 'left',
    right = 'right',
}

export enum FixedVariant {
    mobile = 'mobile',
    tablet = 'tablet',
    desktop = 'desktop',
}

export interface IButtonProps
    extends PropsWithChildren<
        React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    > {
    variant?: ButtonVariant;
    label?: string;
    hoverLabel?: string;
    fixed?: boolean | string[];
    large?: boolean;
    wrapText?: boolean;
    buttonRef?: React.RefObject<HTMLButtonElement> | ((instance: HTMLButtonElement | null) => void);
    icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    iconAlignment?: ButtonIconAlignment;
    iconAdditionalClasses?: string[];
    labelColor?: string;
}

const extendedModify = (value: boolean | string[] | undefined, className: string) => {
    if (Array.isArray(value)) {
        return value.reduce((result, item) => {
            return {...result, [`${className}-${item}`]: true};
        }, {});
    }
    return value && {[className]: true};
};

const keysToExclude = new Set([
    'label',
    'hoverLabel',
    'variant',
    'fixed',
    'large',
    'wrapText',
    'className',
    'children',
    'buttonRef',
    'icon',
    'iconAlignment',
]);

export function Button({onClick, labelColor, ...props}: IButtonProps): JSX.Element {
    const variant = props.variant || 'primary';

    const hasIconWithLabel = props.icon && props.label;
    const iconAlignedLeft = hasIconWithLabel && props.iconAlignment === ButtonIconAlignment.left;
    const iconAlignedRight =
        hasIconWithLabel && (props.iconAlignment === ButtonIconAlignment.right || !iconAlignedLeft);
    const iconClasses = ['aicon', 'cicon'];
    if (props.icon?.props?.className) {
        iconClasses.push(props.icon.props.className);
    }

    const buttonClasses = component('btn')({
        variant,
        disabled: props.disabled,
        round: !props.children && !props.label,
        ...extendedModify(props.fixed, 'fixed'),
        large: props.large,
        wrapText: props.wrapText,
        align:
            props.icon &&
            ((iconAlignedLeft && ButtonIconAlignment.left) || (iconAlignedRight && ButtonIconAlignment.right)),
        ['wrap-text']: props.wrapText,
    });

    const finalClasses = cx(buttonClasses, props.className);
    const labelStyle = labelColor && !props.disabled ? {style: {color: `${labelColor}`}} : {};
    const iconColor = labelColor && !props.disabled && `${labelColor}`;

    const buttonProps: {[idx: string]: unknown} = {};
    Object.keys(props).map((key) => {
        if (!keysToExclude.has(key)) {
            buttonProps[key] = (props as {[idx: string]: unknown})[key];
        }
    });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        e.currentTarget.blur();
    };

    // TODO: Откатить добавление ref в button при избавлении от DropdownModal
    return (
        <button
            type="button"
            ref={(node) => {
                if (typeof props.buttonRef === 'function') {
                    props.buttonRef(node);
                } else if (props.buttonRef) {
                    (props.buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                }
            }}
            onClick={handleClick}
            className={finalClasses}
            {...buttonProps}
        >
            {props.children ? (
                props.children
            ) : (
                <Fragment>
                    {props.icon &&
                        React.cloneElement(props.icon, {
                            className: iconClasses.join(' '),
                            style: {
                                color: `${iconColor}`,
                                ...(!!props.icon.props.style && props.icon.props.style),
                            },
                            ...props.icon.props,
                        })}
                    {props.label && (
                        <div className="cbtn-label">
                            <span className={cx({'cbtn-label--hovered': props.hoverLabel})} {...labelStyle}>
                                {props.label}
                            </span>
                            {props.hoverLabel && <span className="cbtn-hover-label">{props.hoverLabel}</span>}
                        </div>
                    )}
                </Fragment>
            )}
        </button>
    );
}

Button.variant = ButtonVariant;
Button.alignment = ButtonIconAlignment;
