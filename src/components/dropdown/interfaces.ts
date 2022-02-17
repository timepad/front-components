import {IPopupProps} from '../popup';
import {ReactChild, MouseEvent} from 'react';
import {IItem} from '../list/Item';
import {SortableElementProps} from 'react-sortable-hoc';

export interface IDropdownProps {
    trigger: IPopupProps['trigger'];
    keepInsideParent?: IPopupProps['keepTooltipInside'];
    show?: boolean;
    onClose?: IPopupProps['onClose'];
    onOpen?: IPopupProps['onOpen'];
    priorityPositions?: IPopupProps['position'];
    mouseEnterDelay?: IPopupProps['mouseEnterDelay'];
    mouseLeaveDelay?: IPopupProps['mouseLeaveDelay'];
    modifier?: string;
    nested?: boolean;
    lockScroll?: boolean;
    on?: IPopupProps['on'];
    disabled?: boolean;
    offsetX?: number;
    offsetY?: number;
    customPopupId?: string;
}

export type IDropdownSortableListProps = Omit<IDropdownProps, 'onClose'> & {
    children: ReactChild | ReactChild[];
    onClose?: (sortedValues: any[]) => void;
    onSort?: (sortedValues: any[]) => void;
};

export type ISortableItemProps = Omit<ISortableItem, 'prefix'> & Partial<SortableElementProps>;

export type ISortableItem = IItem & {
    value: any;
    onClick?: (e: MouseEvent<any>, value: any) => void;
};
