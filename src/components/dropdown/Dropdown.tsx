import * as React from 'react';
import {FC} from 'react';
import './index.less';
import {IPopupProps, Popup} from '../popup';
import cx from 'classnames';

export interface IDropdownProps {
    trigger: IPopupProps['trigger'];
    show?: boolean;
    onClose?: () => void;
    priorityPositions?: IPopupProps['position'];
    modifier?: string;
}

export const Dropdown: FC<IDropdownProps> = ({
    show,
    modifier,
    trigger,
    onClose,
    children,
    priorityPositions = 'right-center',
}) => {
    return (
        <Popup open={show} on={['click']} position={priorityPositions} onClose={onClose} trigger={trigger}>
            <div className={cx('dropdown-body', modifier)}>{children}</div>
        </Popup>
    );
};
