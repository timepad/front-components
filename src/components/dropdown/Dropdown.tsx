import * as React from 'react';
import {FC} from 'react';
import './index.less';
import {IPopupProps, Popup} from '../popup';
import cx from 'classnames';

export interface IDropdownProps {
    trigger: IPopupProps['trigger'];
    show?: boolean;
    theme?: 'dark' | 'light';
    onClose?: () => void;
    priorityPositions?: IPopupProps['position'];
    modifier?: string;
}

export const Dropdown: FC<IDropdownProps> = ({
    show = false,
    modifier,
    theme = 'dark',
    trigger,
    onClose,
    children,
    priorityPositions,
}) => {
    return (
        <Popup open={show} position={priorityPositions} onClose={onClose} trigger={trigger}>
            <div className={cx('dropdown-body', modifier, {theme})}>{children}</div>
        </Popup>
    );
};
