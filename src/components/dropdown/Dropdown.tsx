import * as React from 'react';
import {ComponentClass, FC, ReactChild, useCallback, useState} from 'react';
import './index.less';
import {Popup} from '../popup';
import cx from 'classnames';
import {Button, ButtonVariant, IButtonProps} from '../button';
import {IDropdownProps, IDropdownSortableListProps, ISortableItem} from './interfaces';
import {SortableContainer, SortableElement, SortableHandle, SortEnd, SortOver, SortStart} from 'react-sortable-hoc';
import {List} from '../list';
import DragIcon from '../../assets/svg/16/icon-dragable-16.svg';
import {arrayMoveImmutable} from '../../services/helpers/moveArray';
import {component} from '../../services/helpers/classHelpers';

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
    const [valueNodes, setValueNodes] = useState(
        React.Children.map<ISortableListState, ReactChild>(children, (child: any) => {
            return {
                value: child.props.value,
                children: child.props.children,
            };
        }),
    );

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
                {React.Children.map<ReactChild, ReactChild>(children, (child, index) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            key: `drop${index}`,
                            index,
                            children: valueNodes[index].children,
                            prefix: <SortIcon />,
                            className: 'cdropdown__dropable-item',
                        });
                    }
                    return child;
                })}
            </Slist>
        </Dropdown>
    );
};

export const Dropdown: FC<IDropdownProps> & {
    Button: FC<IButtonProps>;
    SList: FC<IDropdownSortableListProps>;
    SItem: ComponentClass<Omit<ISortableItem, 'prefix'>>;
} = ({show, nested = false, on = 'click', modifier, trigger, onClose, children, priorityPositions = 'right-top'}) => {
    return (
        <Popup
            className="cdropdown"
            nested={nested}
            open={show}
            on={on}
            position={priorityPositions}
            keepTooltipInside
            onClose={onClose}
            trigger={trigger}
        >
            <div className="dropdown-container">
                <div className={cx('dropdown-body', modifier)}>{children}</div>
            </div>
        </Popup>
    );
};

Dropdown.Button = DropdownButton;
Dropdown.SList = DropdownSortableList;
Dropdown.SItem = SortableElement<Omit<ISortableItem, 'prefix'> | any>(List.Item);
