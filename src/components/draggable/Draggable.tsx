import React from 'react';
import {
    DndContext,
    DragOverlay,
    closestCenter,
    DragStartEvent,
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
import './cdraggable.less';

const baseClassName = 'draggable';

export interface ISortableItemDndProps {
    id: string | number;
    index: number;
    attributes?: ReturnType<typeof useSortable>['attributes'];
    listeners?: ReturnType<typeof useSortable>['listeners'];
    isDragging: boolean;
}

const useDraggableSensors = () => {
    return useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {distance: 5},
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );
};

// --- 1. Компонент "Ручка" (Handle) ---
export interface IDragHandleProps {
    style?: React.CSSProperties;
    id: string | number;
    className?: string;
    attributes?: ReturnType<typeof useSortable>['attributes'];
    listeners?: ReturnType<typeof useSortable>['listeners'];
}

export const DragHandle = ({style, id, className, attributes, listeners}: IDragHandleProps): JSX.Element => {
    return (
        <span
            {...attributes}
            {...listeners}
            data-id={id}
            aria-label="Перетащить элемент"
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
    index: number;
    children: (dnd: ISortableItemDndProps) => React.ReactNode;
    className?: string;
    as?: 'div' | 'tr';
}

const SortableItem = ({id, index, children, className, as = 'div'}: ISortableItemProps): JSX.Element => {
    const {setNodeRef, transform, transition, isDragging, attributes, listeners} = useSortable({id});
    const Component = as;

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : undefined,
    };

    return (
        <Component
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
            {children({
                id,
                index,
                attributes,
                listeners,
                isDragging,
            })}
        </Component>
    );
};

// --- 3. Основной компонент-обертка ---
/**
 * Базовый drag-компонент с children render-function.
 *
 * Сигнатура children:
 * `(item, dnd) => ReactNode`
 */
export interface IDraggableProps<T> {
    items: T[];
    onReorder: (newItems: T[]) => void;
    getKey: (item: T) => string | number;
    children: (item: T, dnd: ISortableItemDndProps) => React.ReactNode;
    renderHandle?: (dnd: ISortableItemDndProps) => React.ReactNode;
    className?: string;
    itemClassName?: string;
    as?: 'div' | 'tr';
}

const DraggableBase = <T,>({
    items,
    onReorder,
    getKey,
    children,
    renderHandle,
    className,
    itemClassName,
    as = 'div',
}: IDraggableProps<T>): JSX.Element => {
    const [activeId, setActiveId] = React.useState<string | number | null>(null);

    const ids = React.useMemo(() => items.map((item) => getKey(item)), [items, getKey]);

    const idToIndex = React.useMemo(() => new Map(ids.map((id, index) => [id, index])), [ids]);

    const activeIndex = React.useMemo(
        () => (activeId === null ? undefined : idToIndex.get(activeId)),
        [activeId, idToIndex],
    );

    const activeItem = activeIndex === undefined ? null : items[activeIndex];

    const sensors = useDraggableSensors();

    const handleDragStart = React.useCallback((event: DragStartEvent): void => {
        setActiveId(event.active.id);
    }, []);

    const handleDragCancel = React.useCallback((): void => {
        setActiveId(null);
    }, []);

    const handleDragEnd = React.useCallback(
        (event: DragEndEvent): void => {
            const {active, over} = event;

            setActiveId(null);

            if (over && active.id !== over.id) {
                const oldIndex = idToIndex.get(active.id);
                const newIndex = idToIndex.get(over.id);

                if (oldIndex === undefined || newIndex === undefined) {
                    return;
                }

                const newItems = arrayMove(items, oldIndex, newIndex);
                onReorder(newItems);
            }
        },
        [idToIndex, items, onReorder],
    );

    const getHandle = React.useCallback(
        (dnd: ISortableItemDndProps): React.ReactNode => {
            if (renderHandle) {
                return renderHandle(dnd);
            }

            if (as === 'tr') {
                return (
                    <td>
                        <DragHandle id={dnd.id} attributes={dnd.attributes} listeners={dnd.listeners} />
                    </td>
                );
            }

            return <DragHandle id={dnd.id} attributes={dnd.attributes} listeners={dnd.listeners} />;
        },
        [as, renderHandle],
    );

    const ListTag = as === 'tr' ? 'tbody' : 'div';

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                <ListTag className={cx(component(baseClassName)(), className)}>
                    {items.map((item, index) => {
                        const id = ids[index];

                        return (
                            <SortableItem key={id} id={id} index={index} className={itemClassName} as={as}>
                                {(dnd) => (
                                    <>
                                        {getHandle(dnd)}
                                        {children(item, dnd)}
                                    </>
                                )}
                            </SortableItem>
                        );
                    })}
                </ListTag>
            </SortableContext>

            {/*
                DragOverlay обязателен: без него при перетаскивании верхнего элемента вниз
                превью может визуально уходить под элементы ниже из-за stacking context/z-index.
            */}
            <DragOverlay zIndex={3000}>
                {activeItem !== null && activeId !== null && activeIndex !== undefined ? (
                    as === 'tr' ? (
                        <table className={cx(component(baseClassName)(), className)}>
                            <tbody>
                                <tr
                                    className={cx(
                                        component(
                                            baseClassName,
                                            'item',
                                        )({
                                            dragging: true,
                                        }),
                                        itemClassName,
                                    )}
                                >
                                    {getHandle({id: activeId, index: activeIndex, isDragging: true})}
                                    {children(activeItem, {
                                        id: activeId,
                                        index: activeIndex,
                                        isDragging: true,
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <div
                            className={cx(
                                component(
                                    baseClassName,
                                    'item',
                                )({
                                    dragging: true,
                                }),
                                itemClassName,
                            )}
                        >
                            {getHandle({id: activeId, index: activeIndex, isDragging: true})}
                            {children(activeItem, {
                                id: activeId,
                                index: activeIndex,
                                isDragging: true,
                            })}
                        </div>
                    )
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export const Draggable = Object.assign(DraggableBase, {
    Handle: DragHandle,
}) as typeof DraggableBase & {
    Handle: typeof DragHandle;
};
