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
    on?: IPopupProps['on'];
}

export type DropdownButtonProps = Omit<IDropdownProps, 'trigger'> & IButtonProps;

const DropdownButton: FC<DropdownButtonProps> = ({
    show,
    modifier,
    onClose,
    nested = false,
    priorityPositions,
    children,
    on = 'click',
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
            on={on}
        >
            {children}
        </Dropdown>
    );
};

export const Dropdown: FC<IDropdownProps> & {Button: FC<DropdownButtonProps>} = ({
    show,
    nested = false,
    on = 'click',
    modifier,
    trigger,
    onClose,
    children,
    priorityPositions = 'right-center',
}) => {
    return (
        <Popup nested={nested} open={show} on={on} position={priorityPositions} onClose={onClose} trigger={trigger}>
            <div className={cx('dropdown-body', modifier)}>{children}</div>
        </Popup>
    );
};

Dropdown.Button = DropdownButton;
