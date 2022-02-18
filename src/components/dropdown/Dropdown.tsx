import * as React from 'react';
import {
    Children,
    cloneElement,
    ComponentClass,
    FC,
    isValidElement,
    ReactChild,
    useCallback,
    useEffect,
    useState,
} from 'react';
import './index.less';
import {Popup} from '../popup';
import cx from 'classnames';
import {Button, ButtonVariant, IButtonProps} from '../button';
import {IDropdownProps, IDropdownSortableListProps, ISortableItem, ISortableItemProps} from './interfaces';
import {SortableContainer, SortableElement, SortableHandle, SortEnd, SortOver, SortStart} from 'react-sortable-hoc';
import {List} from '../list';
import DragIcon from '../../assets/svg/16/icon-dragable-16.svg';
import {arrayMoveImmutable} from '../../services/helpers/moveArray';
import {component} from '../../services/helpers/classHelpers';
import {useClientRect} from '../../services/hooks/useClientRect';

const DropdownButton: FC<IButtonProps> = ({children, variant = ButtonVariant.secondary, ...buttonProps}) => {
    return (
        <div className={cx('cdropdown__button', {'mtheme--darkpic': variant === ButtonVariant.secondary})}>
            <Button variant={variant} {...buttonProps}>
                {children}
            </Button>
        </div>
    );
};

interface ISortableListState {
    value: any;
    children: ReactChild;
}

const Slist = SortableContainer(List);
const SortIcon = SortableHandle(() => <DragIcon className="cdropdown__dragicon" />);
const DropdownSortableList: FC<IDropdownSortableListProps> = ({
    show,
    modifier,
    onClose,
    onSort,
    nested = false,
    priorityPositions,
    trigger,
    children = [],
    on = 'click',
}) => {
    // region Sortable list state
    const ChildrenToValueNodes = (children: ReactChild | ReactChild[]) => {
        return React.Children.map<ISortableListState, ReactChild>(children, (child: any) => {
            return {
                value: child.props.value,
                children: child.props.children,
            };
        });
    };

    const [valueNodes, setValueNodes] = useState(ChildrenToValueNodes(children));
    useEffect(() => {
        setValueNodes(ChildrenToValueNodes(children));
    }, [children]);
    // endregion

    const getValues = useCallback(
        (nodes: ISortableListState[] = valueNodes) => {
            return nodes.map((node) => node.value);
        },
        [valueNodes],
    );

    const closeDropdownHandler = useCallback(() => {
        onClose && onClose(getValues());
    }, [getValues, onClose]);

    // region Animation
    const sortEndHandler = useCallback(
        (sort: SortEnd) => {
            document.body.style.cursor = '';
            const newArray = arrayMoveImmutable(valueNodes, sort.oldIndex, sort.newIndex);

            setValueNodes(newArray);
            onSort && onSort(getValues(newArray));

            sort.nodes.forEach((el: any) => {
                el.node.classList.toggle('cdropdown__droptotop', false);
                el.node.classList.toggle('cdropdown__droptobottom', false);
            });
        },
        [valueNodes, onSort, getValues],
    );

    const sortStartHandler = useCallback(() => {
        document.body.style.cursor = 'grabbing';
    }, []);

    const sortOverHandler = useCallback(
        (sort: SortOver) => {
            // В библиотеке неверно указан тип. В sort.nodes вместо HTMLElemet[] лежит объект.
            // По этому здесь any.

            const nextNodeObj = sort.nodes[sort.newIndex] as any;
            const prevNodeObj = sort.nodes[sort.oldIndex] as any;

            const top = component('dropdown', 'droptotop');
            const bottom = component('dropdown', 'droptobottom');

            prevNodeObj.node.classList.toggle(top(), false);
            prevNodeObj.node.classList.toggle(bottom(), false);

            const classes =
                sort.index < sort.newIndex
                    ? bottom({rounded: sort.newIndex === valueNodes.length - 1}).split(' ')
                    : top({rounded: sort.newIndex === 0}).split(' ');

            classes.forEach((cls) => nextNodeObj.node.classList.toggle(cls, sort.newIndex !== sort.index));
        },
        [valueNodes.length],
    );

    const getDimensions = useCallback((sort: SortStart) => {
        return {
            height: 0,
            width: sort.node.getBoundingClientRect().width,
        };
    }, []);
    // endregion

    return (
        <Dropdown
            nested={nested}
            show={show}
            trigger={trigger}
            modifier={modifier}
            onClose={closeDropdownHandler}
            priorityPositions={priorityPositions}
            on={on}
        >
            {valueNodes.length > 0 && Children.count(children) === valueNodes.length ? (
                <Slist
                    helperClass="clist clist--variant_transparent clist--size_lg cdropdown__dragging-row"
                    useDragHandle
                    hideSortableGhost={false}
                    transitionDuration={0}
                    getHelperDimensions={getDimensions}
                    axis="y"
                    as="ul"
                    size="lg"
                    variant="dark"
                    onSortOver={sortOverHandler}
                    onSortStart={sortStartHandler}
                    onSortEnd={sortEndHandler}
                >
                    {Children.map<ReactChild, ReactChild>(children, (child, index) => {
                        if (isValidElement(child)) {
                            return cloneElement(child, {
                                key: `drop${index}`,
                                index,
                                children: valueNodes[index].children,
                                prefix: <SortIcon />,
                                className: 'cdropdown__dropable-item ' + child.props.className,
                                onClick: (e: MouseEvent) => {
                                    child.props.onClick && child.props.onClick(e, valueNodes[index].value);
                                },
                            });
                        }
                        return child;
                    })}
                </Slist>
            ) : null}
        </Dropdown>
    );
};

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
    return (
        <Popup
            className="cdropdown"
            nested={nested}
            on={on}
            open={show}
            position={priorityPositions}
            keepTooltipInside={keepInsideParent}
            lockScroll={lockScroll || window.innerHeight <= Number(rect?.height)}
            customPopupRoot={customPopupRoot}
            {...props}
        >
            <div className="dropdown-container" ref={ref}>
                <div
                    className={cx(
                        'dropdown-body',
                        {'dropdown-body--scrollable': window.innerHeight <= Number(rect?.height)},
                        modifier,
                    )}
                >
                    {children}
                </div>
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
