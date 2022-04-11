import {Button, ButtonVariant, IButtonProps} from '../../button';
import React, {FC} from 'react';
import cx from 'classnames';

export const DropdownButton: FC<IButtonProps> = ({children, variant = ButtonVariant.secondary, ...buttonProps}) => {
    return (
        <div className={cx('cdropdown__button', {'mtheme--darkpic': variant === ButtonVariant.secondary})}>
            <Button variant={variant} {...buttonProps}>
                {children}
            </Button>
        </div>
    );
};
