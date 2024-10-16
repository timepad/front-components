import * as React from 'react';
import {ComponentClass, FC, ReactElement, useEffect, useMemo, useRef} from 'react';
import cx from 'classnames';
import {IPopupActions, IPopupProps, Popup} from '../popup';
import {IButtonProps} from '../button';
import {IDropdownProps, IDropdownSortableListProps, ISortableItem, ISortableItemProps} from './interfaces';
import {SortableElement} from 'react-sortable-hoc';
import {List} from '../list';
import {useClientRect, useMedia} from '../../services/hooks';
import {DropdownSortableList} from './components/DropdownSortableList';
import {DropdownButton} from './components/DropdownButton';
import {DropdownFooter, DropdownHeader, IFooterHeaderProps} from './components/DropdownHeaderFooter';
import {CenterPinnedContent, DownPinnedContent, ElementPinnedContent} from './components/pinnedcontent';
import {WithThemeStyles} from '../../services/hocs';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

export const Dropdown: FC<React.PropsWithChildren<IDropdownProps>> & {
    Button: FC<React.PropsWithChildren<IButtonProps>>;
    SList: FC<React.PropsWithChildren<IDropdownSortableListProps>>;
    SItem: ComponentClass<ISortableItemProps>;
    Header: FC<React.PropsWithChildren<IFooterHeaderProps>>;
    Footer: FC<React.PropsWithChildren<IFooterHeaderProps>>;
} = ({
    show,
    keepInsideParent = true,
    modifier,
    children,
    priorityPositions = 'right-top',
    lockScroll = false,
    customMobileBreakpoint: mobileMaxWidth,
    // TODO если нам нужно чтобы попап открывался и был привязан не к корневому диву, а другом месте - указываем нужный айдишник в этой переменной (используем в OrgerGroup NTP)
    // customPopupRoot,
    pinned = 'auto',
    theme = 'dark', // для будущей темы
    ...props
}) => {
    const popupRef = useRef<IPopupActions>(null);
    const [rect, ref, updateRect] = useClientRect();

    const {isMobilePortraitMax, customMobileBreakpoint, isMobileMax, isTabletMax} = useMedia({
        customMobileBreakpoint: mobileMaxWidth,
    });
    const isMobile = pinned === 'down' || (pinned === 'auto' && (isMobilePortraitMax || customMobileBreakpoint));
    const isDesktop = pinned === 'element' || (pinned === 'auto' && !isMobileMax);
    const isTablet = pinned === 'center' || (pinned === 'auto' && isTabletMax);

    const isScrollable = useMemo(() => window.innerHeight <= Number(rect?.height), [rect]);

    const [header, footer, otherChildren] = useMemo(() => {
        const otherChildren: React.ReactNode[] = [];
        let header: ReactElement<IFooterHeaderProps, typeof DropdownHeader> | undefined;
        let footer: ReactElement<IFooterHeaderProps, typeof DropdownFooter> | undefined;

        React.Children.forEach(children, (child) => {
            const isElement = typeof child === 'object' && !!child && 'type' in child;

            if (isElement && child.type === DropdownHeader) {
                if (header) {
                    throw Error('Может быть только один Header');
                }
                header = child as ReactElement<IFooterHeaderProps, typeof DropdownHeader>;
            } else if (isElement && child.type === DropdownFooter) {
                if (footer) {
                    throw Error('Может быть только один Footer');
                }
                footer = child as ReactElement<IFooterHeaderProps, typeof DropdownFooter>;
            } else {
                otherChildren.push(child as ReactElement);
            }
        });
        return [header, footer, otherChildren];
    }, [children]);

    useEffect(() => {
        if (pinned === 'element') {
            // нужно только для desktop версии
            updateRect();
        }
    }, [updateRect, otherChildren, pinned]);

    const withPseudoElement = props?.on?.includes('hover');

    const contentCommonProps = {
        modifier,
        header,
        footer,
        otherChildren,
    };

    const popupProps: IPopupProps = {
        ...props,
        ...(isMobile && {
            className: component('dropdown', 'mobile-container')(),
            lockScroll: true,
            position: 'corner-bottom-left',
        }),
        ...(isDesktop && {
            position: priorityPositions,
            className: cx({'cdropdown__scrollable-container': isScrollable}, {'show-pseudo': withPseudoElement}),
            lockScroll: lockScroll || isScrollable,
        }),
        ...(isTablet && {
            className: component('dropdown', 'tablet-container')(),
            lockScroll: true,
            position: 'screen-center',
        }),
    };

    return (
        <Popup open={show} keepTooltipInside={keepInsideParent} isMobile={isMobile} {...popupProps} ref={popupRef}>
            <>
                {isDesktop && (
                    <ElementPinnedContent isScrollable={isScrollable} elementRef={ref} {...contentCommonProps} />
                )}
                {isTablet && <CenterPinnedContent {...contentCommonProps} />}
                {isMobile && <DownPinnedContent popupRef={popupRef} {...contentCommonProps} />}
            </>
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
