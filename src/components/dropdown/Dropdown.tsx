import * as React from 'react';
import {FC, useCallback} from 'react';
import './index.less';
import {IPopupProps, Popup} from '../popup';
import cx from 'classnames';
import {Button, IButtonProps} from '../button';

export interface IDropdownProps {
    trigger: IPopupProps['trigger'];
    show?: boolean;
    onClose?: () => void;
    priorityPositions?: IPopupProps['position'];
    modifier?: string;
    nested?: boolean;
}

const DropdownButton: FC<Omit<IDropdownProps, 'trigger'> & IButtonProps> = ({
    show,
    modifier,
    onClose,
    nested = false,
    priorityPositions,
    children,
    ...buttonProps
}) => {
    const Btn = useCallback(() => <Button {...buttonProps} />, [buttonProps]);
    return (
        <Dropdown
            nested={nested}
            show={show}
            trigger={Btn}
            modifier={modifier}
            onClose={onClose}
            priorityPositions={priorityPositions}
        >
            {children}
        </Dropdown>
    );
};

export const Dropdown: FC<IDropdownProps> & {Button: FC<Omit<IDropdownProps, 'trigger'> & IButtonProps>} & {
    Button: typeof DropdownButton;
} = ({show, nested = false, modifier, trigger, onClose, children, priorityPositions = 'right-center'}) => {
    return (
        <Popup
            nested={nested}
            open={show}
            on={['click']}
            position={priorityPositions}
            onClose={onClose}
            trigger={trigger}
        >
            <div className={cx('dropdown-body', modifier)}>{children}</div>
        </Popup>
    );
};

Dropdown.Button = DropdownButton;
