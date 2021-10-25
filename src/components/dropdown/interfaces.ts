import {IPopupProps} from '../popup';
import {ReactChild, MouseEvent} from 'react';
import {IItem} from '../list/Item';
import {SortableElementProps} from 'react-sortable-hoc';

export interface IDropdownProps {
    trigger: IPopupProps['trigger'];
    keepInsideParent?: IPopupProps['keepTooltipInside'];
    show?: boolean;
    onClose?: () => void;
    priorityPositions?: IPopupProps['position'];
    modifier?: string;
    nested?: boolean;
    on?: IPopupProps['on'];
    disabled?: boolean;
}

export type IDropdownSortableListProps = Omit<IDropdownProps, 'onClose'> & {
    children: ReactChild | ReactChild[];
    onClose?: (sortedValues: any[]) => void;
    onSort?: (sortedValues: any[]) => void;
};

export type ISortableItemProps = Omit<ISortableItem, 'prefix'> & Partial<SortableElementProps>;

export type ISortableItem = IItem & {
    value: any;
};
