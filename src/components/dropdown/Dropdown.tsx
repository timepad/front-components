import * as React from 'react';
import {ComponentClass, FC, ReactElement, useMemo} from 'react';
import './index.less';
import {IPopupProps, Popup} from '../popup';
import cx from 'classnames';
import {IButtonProps} from '../button';
import {IDropdownProps, IDropdownSortableListProps, ISortableItem, ISortableItemProps} from './interfaces';
import {SortableElement} from 'react-sortable-hoc';
import {List} from '../list';
import {useClientRect} from '../../services/hooks';
import {DropdownSortableList} from './components/DropdownSortableList';
import {DropdownButton} from './components/DropdownButton';
import {useMobileWidthCheck} from '../../services/hooks';

interface IResponsvieContent {
    children: ReactElement;
    popupProps: IPopupProps;
}

export const Dropdown: FC<IDropdownProps> & {
    Button: FC<IButtonProps>;
    SList: FC<IDropdownSortableListProps>;
    SItem: ComponentClass<ISortableItemProps>;
} = ({
    show,
    keepInsideParent = true,
    modifier,
    children,
    priorityPositions = 'right-top',
    lockScroll = false,
    // TODO если нам нужно чтобы попап открывался и был привязан не к корневому диву, а другом месте - указываем нужный айдишник в этой переменной (используем в OrgerGroup NTP)
    // customPopupRoot,
    ...props
}) => {
    const [rect, ref] = useClientRect();
    const isScrollable = useMemo(() => window.innerHeight <= Number(rect?.height), [rect]);
    const isMoblie = useMobileWidthCheck();

    const responsiveContent = useMemo<IResponsvieContent>(() => {
        const content: Record<'desktop' | 'mobile', IResponsvieContent> = {
            desktop: {
                popupProps: {
                    position: priorityPositions,
                    className: cx({'cdropdown__scrollable-container': isScrollable}),
                    lockScroll: lockScroll || isScrollable,
                    ...props,
                },
                children: (
                    <div
                        ref={ref}
                        className={cx('dropdown-body', modifier)}
                        style={isScrollable ? {margin: '15px 0'} : {}}
                    >
                        {children}
                    </div>
                ),
            },
            mobile: {
                popupProps: {
                    ...props,
                    lockScroll: true,
                    position: 'corner-bottom-left',
                },
                children: (
                    <div className={modifier} style={{width: '100vw'}}>
                        {children}
                    </div>
                ),
            },
        };
        return isMoblie ? content.mobile : content.desktop;
    }, [priorityPositions, isScrollable, lockScroll, props, ref, modifier, children, isMoblie]);

    return (
        <Popup open={show} keepTooltipInside={keepInsideParent} {...responsiveContent.popupProps}>
            {responsiveContent.children}
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
