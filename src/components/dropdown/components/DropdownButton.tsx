import React, {FC} from 'react';
import {Button, ButtonVariant, IButtonProps} from '../../button';
import {component} from '../../../services/helpers/classHelpers';

export const DropdownButton: FC<React.PropsWithChildren<IButtonProps>> = ({
    children,
    variant = ButtonVariant.secondary,
    ...buttonProps
}) => {
    return (
        <div className={component('dropdown', 'button')()}>
            <Button variant={variant} {...buttonProps}>
                {children}
            </Button>
        </div>
    );
};
