import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {IconDrag16} from '../../assets/svg/16';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';
import './cdraggablelist.less';

// --- 1. Компонент "Ручка" (Handle) ---
export interface IDragHandleProps {
    style?: React.CSSProperties;
    id: string | number;
    className?: string;
    attributes?: ReturnType<typeof useSortable>['attributes'];
    listeners?: ReturnType<typeof useSortable>['listeners'];
}

const baseClassName = 'draggable-list';

export const DragHandle = ({style, id, className, attributes, listeners}: IDragHandleProps): JSX.Element => {
    return (
        <span
            {...attributes}
            {...listeners}
            data-id={id}
            className={cx(component(baseClassName, 'drag-handle')(), className)}
            style={style}
            onDragStart={(e) => e.preventDefault()}
        >
            <IconDrag16 />
        </span>
    );
};

// --- 2. Внутренний элемент списка ---
interface ISortableItemProps {
    id: string | number;
    children: React.ReactNode;
    className?: string;
}

const SortableItem = ({id, children, className}: ISortableItemProps): JSX.Element => {
    const {setNodeRef, transform, transition, isDragging, attributes, listeners} = useSortable({id});

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cx(
                component(
                    baseClassName,
                    'item',
                )({
                    dragging: isDragging,
                }),
                className,
            )}
        >
            <DragHandle id={id} attributes={attributes} listeners={listeners} />
            {children}
        </div>
    );
};

// --- 3. Основной компонент-обертка ---
interface IDraggableListProps<T> {
    items: T[];
    onReorder: (newItems: T[]) => void;
    getKey: (item: T) => string | number;
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
    itemClassName?: string;
}

export const DraggableList = <T,>({
    items,
    onReorder,
    getKey,
    renderItem,
    className,
    itemClassName,
}: IDraggableListProps<T>): JSX.Element => {
    const keyedItems = React.useMemo(() => items.map((item) => ({item, id: getKey(item)})), [items, getKey]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {distance: 5},
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = React.useCallback(
        (event: DragEndEvent): void => {
            const {active, over} = event;

            if (over && active.id !== over.id) {
                const oldIndex = items.findIndex((item) => getKey(item) === active.id);
                const newIndex = items.findIndex((item) => getKey(item) === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                onReorder(newItems);
            }
        },
        [items, getKey, onReorder],
    );

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={keyedItems.map(({id}) => id)} strategy={verticalListSortingStrategy}>
                <div className={cx(component(baseClassName)(), className)}>
                    {keyedItems.map(({item, id}, index) => (
                        <SortableItem key={id} id={id} className={itemClassName}>
                            {renderItem(item, index)}
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};
