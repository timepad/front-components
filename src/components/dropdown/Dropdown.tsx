import * as React from 'react';
import {ComponentClass, FC, ReactElement, useEffect, useMemo, useRef} from 'react';
import './index.less';
import {IPopupActions, IPopupProps, Popup, PopupPosition} from '../popup';
import cx from 'classnames';
import {Button, ButtonVariant, IButtonProps} from '../button';
import {IDropdownProps, IDropdownSortableListProps, ISortableItem, ISortableItemProps} from './interfaces';
import {SortableElement} from 'react-sortable-hoc';
import {List} from '../list';
import {useClientRect, useMedia} from '../../services/hooks';
import {DropdownSortableList} from './components/DropdownSortableList';
import {DropdownButton} from './components/DropdownButton';
import {DropdownFooter, DropdownHeader, IFooterHeaderProps} from './components/DropdownHeaderFooter';

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
    ...props
}) => {
    const popupRef = useRef<IPopupActions>(null);
    const [rect, ref, updateRect] = useClientRect();
    const {isMobilePortraitMax, customMobileBreakpoint} = useMedia<{customMobileBreakpoint: typeof mobileMaxWidth}>({
        customMobileBreakpoint: mobileMaxWidth,
    });
    const isMobile = (function () {
        if (customMobileBreakpoint !== undefined) return customMobileBreakpoint;
        else return isMobilePortraitMax;
    })();

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
        if (isMobile) return;
        // нужно только для desktop версии
        updateRect();
    }, [updateRect, otherChildren, isMobile]);

    const withPseudoElement = props?.on?.includes('hover');

    let popupProps: IPopupProps;
    if (isMobile) {
        popupProps = {
            ...props,
            className: cx('cdropdown__mobile-container'),
            lockScroll: true,
            position: 'corner-bottom-left' as PopupPosition,
        };
    } else {
        popupProps = {
            position: priorityPositions,
            className: cx({'cdropdown__scrollable-container': isScrollable}, {'show-pseudo': withPseudoElement}),
            lockScroll: lockScroll || isScrollable,
            ...props,
        };
    }

    return (
        <Popup open={show} keepTooltipInside={keepInsideParent} isMobile={isMobile} {...popupProps} ref={popupRef}>
            {isMobile ? (
                <div className={cx('сdropdown-body--mobile mtheme--darkpic-bg mtheme--darkpic', modifier)}>
                    {header?.props.mobile && header}
                    <div className="сdropdown-body--mobile-content">{otherChildren}</div>
                    {footer?.props.mobile ? footer : <DefaultFooter onCancel={() => popupRef.current?.close()} />}
                </div>
            ) : (
                <div
                    ref={ref}
                    className={cx('сdropdown-body', modifier)}
                    style={isScrollable ? {margin: '15px 0'} : {}}
                >
                    {header?.props.desktop && header}
                    <div>{otherChildren}</div>
                    {footer?.props.desktop && footer}
                </div>
            )}
        </Popup>
    );
};

interface IDefaultFooterProps {
    onCancel?: () => void;
}

const DefaultFooter: FC<React.PropsWithChildren<IDefaultFooterProps>> = ({onCancel}) => {
    return (
        <DropdownFooter mobile>
            <Button large variant={ButtonVariant.transparent} className="ccancel-button__mobile" onClick={onCancel}>
                Отменить
            </Button>
        </DropdownFooter>
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
