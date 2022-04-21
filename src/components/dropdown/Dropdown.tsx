import * as React from 'react';
import {ComponentClass, FC, ReactElement, useMemo, useRef} from 'react';
import './index.less';
import {IPopupActions, IPopupProps, Popup} from '../popup';
import cx from 'classnames';
import {Button, ButtonVariant, IButtonProps} from '../button';
import {IDropdownProps, IDropdownSortableListProps, ISortableItem, ISortableItemProps} from './interfaces';
import {SortableElement} from 'react-sortable-hoc';
import {List} from '../list';
import {useClientRect, useMobileWidthCheck} from '../../services/hooks';
import {DropdownSortableList} from './components/DropdownSortableList';
import {DropdownButton} from './components/DropdownButton';
import {DropdownFooter, DropdownHeader, IFooterHeaderProps} from './components/DropdownHeaderFooter';

interface IResponsvieContent {
    children: ReactElement;
    popupProps: IPopupProps;
}

export const Dropdown: FC<IDropdownProps> & {
    Button: FC<IButtonProps>;
    SList: FC<IDropdownSortableListProps>;
    SItem: ComponentClass<ISortableItemProps>;
    Header: FC<IFooterHeaderProps>;
    Footer: FC<IFooterHeaderProps>;
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
    const popupRef = useRef<IPopupActions>(null);
    const [rect, ref] = useClientRect();
    const isMoblie = useMobileWidthCheck();
    const isScrollable = useMemo(() => window.innerHeight <= Number(rect?.height), [rect]);

    let header: ReactElement<IFooterHeaderProps, typeof DropdownHeader> | undefined;
    let footer: ReactElement<IFooterHeaderProps, typeof DropdownFooter> | undefined = (
        <DropdownFooter mobile>
            <Button
                large
                variant={ButtonVariant.transparent}
                className="ccancel-button__mobile"
                onClick={() => popupRef.current?.close()}
            >
                Отменить
            </Button>
        </DropdownFooter>
    );

    const otherChildren: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
        let isAdded = false;
        const isElement = typeof child === 'object' && !!child && 'type' in child;

        if (isElement && child.type === DropdownHeader) {
            header = child as ReactElement<IFooterHeaderProps, typeof DropdownHeader>;
            isAdded = true;
        }
        if (isElement && child.type === DropdownFooter) {
            footer = child as ReactElement<IFooterHeaderProps, typeof DropdownFooter>;
            isAdded = true;
        }
        if (!isAdded) {
            otherChildren.push(child as ReactElement);
        }
    });

    const content: Record<'desktop' | 'mobile', IResponsvieContent> = {
        desktop: {
            popupProps: {
                position: priorityPositions,
                className: cx({'cdropdown__scrollable-container': isScrollable}),
                lockScroll: lockScroll || isScrollable,
                ...props,
            },
            children: (
                <div ref={ref} className={cx('dropdown-body', modifier)} style={isScrollable ? {margin: '15px 0'} : {}}>
                    {header?.props.desktop && header}
                    <div>{otherChildren}</div>
                    {footer?.props.desktop && footer}
                </div>
            ),
        },
        mobile: {
            popupProps: {
                ...props,
                className: cx('cdropdown__moblie-container'),
                lockScroll: true,
                position: 'corner-bottom-left',
            },
            children: (
                <div className={cx('dropdown-body--mobile mtheme--darkpic-bg mtheme--darkpic', modifier)}>
                    {header?.props.mobile && header}
                    <div className="dropdown-body--mobile-content">{otherChildren}</div>
                    {footer?.props.mobile && footer}
                </div>
            ),
        },
    };

    const responsiveContent = isMoblie ? content.mobile : content.desktop;

    return (
        <Popup open={show} keepTooltipInside={keepInsideParent} {...responsiveContent.popupProps} ref={popupRef}>
            {responsiveContent.children}
        </Popup>
    );
};

Dropdown.Button = DropdownButton;
Dropdown.SList = DropdownSortableList;
Dropdown.SItem = SortableElement<Omit<ISortableItem, 'prefix'>>(List.Item) as ComponentClass<ISortableItemProps>;
Dropdown.Header = DropdownHeader;
Dropdown.Footer = DropdownFooter;

Dropdown.SItem.propTypes = {
    ...Dropdown.SItem.propTypes,
    index: () => null,
};
