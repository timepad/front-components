import * as React from 'react';
import {ComponentClass, FC, ReactElement, useMemo, useRef} from 'react';
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
    const {isMobilePortraitMax} = useMedia();
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

    const innerContent = useMemo<ReactElement>(() => {
        if (isMobilePortraitMax) {
            return (
                <div className={cx('сdropdown-body--mobile mtheme--darkpic-bg mtheme--darkpic', modifier)}>
                    {header?.props.mobile && header}
                    <div className="сdropdown-body--mobile-content">{otherChildren}</div>
                    {footer?.props.mobile ? footer : <DefaultFooter onCancel={() => popupRef.current?.close()} />}
                </div>
            );
        } else {
            return (
                <div
                    ref={ref}
                    className={cx('сdropdown-body', modifier)}
                    style={isScrollable ? {margin: '15px 0'} : {}}
                >
                    {header?.props.desktop && header}
                    <div>{otherChildren}</div>
                    {footer?.props.desktop && footer}
                </div>
            );
        }
    }, [footer, header, isMobilePortraitMax, isScrollable, modifier, otherChildren, ref]);

    const popupProps = useMemo<IPopupProps>(() => {
        if (isMobilePortraitMax) {
            return {
                ...props,
                className: cx('cdropdown__mobile-container'),
                lockScroll: true,
                position: 'corner-bottom-left' as PopupPosition,
            };
        } else {
            return {
                position: priorityPositions,
                className: cx({'cdropdown__scrollable-container': isScrollable}),
                lockScroll: lockScroll || isScrollable,
                ...props,
            };
        }
    }, [isMobilePortraitMax, isScrollable, lockScroll, priorityPositions, props]);

    return (
        <Popup open={show} keepTooltipInside={keepInsideParent} {...popupProps} ref={popupRef}>
            {innerContent}
        </Popup>
    );
};

interface IDefaultFooterProps {
    onCancel?: () => void;
}

const DefaultFooter: FC<IDefaultFooterProps> = ({onCancel}) => {
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
