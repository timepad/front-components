import {Children, cloneElement, FC, isValidElement, ReactNode, useCallback, useEffect, useState} from 'react';
import {SortableContainer, SortableHandle, SortEnd, SortOver, SortStart} from 'react-sortable-hoc';
import {List} from '../../list';
import DragIcon from '../../../assets/svg/16/icon-dragable-16.svg';
import {IDropdownSortableListProps} from '../interfaces';
import * as React from 'react';
import {arrayMoveImmutable} from '../../../services/helpers/moveArray';
import {component} from '../../../services/helpers/classHelpers';
import {Dropdown} from '../Dropdown';
import {IList} from '../../list/List';

interface ISortableListState {
    value: any;
    children: ReactNode;
}

const Slist = SortableContainer<React.PropsWithChildren<IList>>(List);
const SortIcon = SortableHandle(() => <DragIcon className="cdropdown__dragicon" />);
export const DropdownSortableList: FC<React.PropsWithChildren<IDropdownSortableListProps>> = ({
    show,
    modifier,
    onClose,
    onSort,
    nested = false,
    priorityPositions,
    trigger,
    children = [],
    on = 'click',
    ...props
}) => {
    // region Sortable list state
    const ChildrenToValueNodes = (children: ReactNode | ReactNode[]): ISortableListState[] => {
        const res = React.Children.map<ISortableListState, ReactNode>(children, (child: any) => {
            return {
                value: child.props.value,
                children: child.props.children,
            };
        });
        return res ? res : [];
    };

    const [valueNodes, setValueNodes] = useState(ChildrenToValueNodes(children));
    useEffect(() => {
        setValueNodes(ChildrenToValueNodes(children));
    }, [children]);
    // endregion

    const getValues = useCallback(
        (nodes: ISortableListState[] = valueNodes || []) => {
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
            {...props}
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
                    {Children.map<ReactNode, ReactNode>(children, (child, index) => {
                        if (isValidElement(child)) {
                            return cloneElement(child, {
                                key: `drop${index}`,
                                // @ts-expect-error (non strict)
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
