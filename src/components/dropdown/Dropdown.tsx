import * as React from 'react';
import {ComponentClass, FC, useMemo} from 'react';
import './index.less';
import {Popup} from '../popup';
import cx from 'classnames';
import {IButtonProps} from '../button';
import {IDropdownProps, IDropdownSortableListProps, ISortableItem, ISortableItemProps} from './interfaces';
import {SortableElement} from 'react-sortable-hoc';
import {List} from '../list';
import {useClientRect} from '../../services/hooks/useClientRect';
import {DropdownSortableList} from './components/DropdownSortableList';
import {DropdownButton} from './components/DropdownButton';

export const Dropdown: FC<IDropdownProps> & {
    Button: FC<IButtonProps>;
    SList: FC<IDropdownSortableListProps>;
    SItem: ComponentClass<ISortableItemProps>;
} = ({
    show,
    nested = false,
    keepInsideParent = true,
    on = 'click',
    modifier,
    children,
    priorityPositions = 'right-top',
    lockScroll = false,
    // TODO если нам нужно чтобы попап открывался и был привязан не к корневому диву, а другом месте - указываем нужный айдишник в этой переменной (используем в OrgerGroup NTP)
    customPopupRoot,
    ...props
}) => {
    const [rect, ref] = useClientRect();
    const isScrollable = useMemo(() => window.innerHeight <= Number(rect?.height), [rect]);

    return (
        <Popup
            className={cx({'cdropdown__scrollable-container': isScrollable})}
            nested={nested}
            on={on}
            open={show}
            position={priorityPositions}
            keepTooltipInside={keepInsideParent}
            lockScroll={lockScroll || isScrollable}
            customPopupRoot={customPopupRoot}
            {...props}
        >
            <div ref={ref} className={cx('dropdown-body', modifier)} style={isScrollable ? {margin: '15px 0'} : {}}>
                {children}
            </div>
        </Popup>
    );
};

Dropdown.Button = DropdownButton;
Dropdown.SList = DropdownSortableList;
Dropdown.SItem = SortableElement<Omit<ISortableItem, 'prefix'>>(List.Item) as ComponentClass<ISortableItemProps>;

Dropdown.SItem.propTypes = {
    ...Dropdown.SItem.propTypes,
    index: () => null,
};
