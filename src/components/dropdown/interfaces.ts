import * as React from 'react';
import {ReactNode, MouseEvent, ReactElement} from 'react';
import {SortableElementProps} from 'react-sortable-hoc';
import {IPopupProps} from '../popup';
import {IItem} from '../list/Item';
import {DropdownFooter, DropdownHeader, IFooterHeaderProps} from './components/DropdownHeaderFooter';

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
    triggerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    repositionOnChangeContent?: boolean;
    fixPositionOnScroll?: boolean;
    customPopupRoot?: string;
    customMobileBreakpoint?: number;
    pinned?: IPinnedPositions;
    theme?: IThemeTypes;
}

export type IDropdownSortableListProps = Omit<IDropdownProps, 'onClose'> & {
    children: ReactNode | ReactNode[];
    onClose?: (sortedValues: any[]) => void;
    onSort?: (sortedValues: any[]) => void;
};

export type ISortableItemProps = Omit<ISortableItem, 'prefix'> & Partial<SortableElementProps>;

export type ISortableItem = IItem & {
    value: any;
    onClick?: (e: MouseEvent<any>, value: any) => void;
};

export interface IPinnedContentProps {
    modifier?: string;
    header?: ReactElement<IFooterHeaderProps, typeof DropdownHeader>;
    footer?: ReactElement<IFooterHeaderProps, typeof DropdownFooter>;
    theme: IThemeTypes;
    otherChildren: React.ReactNode[];
}

type IThemeTypes = 'light' | 'dark';

type IPinnedPositions = 'auto' | 'center' | 'down' | 'element'; //'center' - посередине (планшет), 'down' - нижний край (телефон), 'element' - рядом с элементом (десктоп)
