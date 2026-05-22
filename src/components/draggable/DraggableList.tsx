import React from 'react';
import Row, {IRowProps} from '../row/Row';
import {Draggable, IDraggableProps} from './Draggable';

/**
 * Готовый row-пресет на базе Draggable.
 *
 * Сигнатура children:
 * `(item) => ReactNode`
 */
export interface IDraggableListProps<T>
    extends Omit<IDraggableProps<T>, 'children' | 'renderHandle'>,
        Pick<
            IRowProps,
            'hoverable' | 'activable' | 'selectable' | 'small' | 'transparent' | 'ffFont' | 'horizontalPadding'
        > {
    children: (item: T) => React.ReactNode;
    renderRightIcon?: (item: T) => React.ReactElement;
}

export const DraggableList = <T,>({
    items,
    onReorder,
    getKey,
    children,
    renderRightIcon,
    className,
    itemClassName,
    hoverable = true,
    activable,
    selectable,
    small,
    transparent,
    ffFont,
    horizontalPadding,
}: IDraggableListProps<T>): JSX.Element => {
    return (
        <Draggable
            items={items}
            onReorder={onReorder}
            getKey={getKey}
            className={className}
            itemClassName={itemClassName}
            renderHandle={() => null}
        >
            {(item, dnd) => (
                <Row
                    hoverable={hoverable}
                    activable={activable}
                    selectable={selectable}
                    small={small}
                    transparent={transparent}
                    ffFont={ffFont}
                    horizontalPadding={horizontalPadding}
                >
                    <Row.Icon>
                        <Draggable.Handle id={dnd.id} attributes={dnd.attributes} listeners={dnd.listeners} />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>{children(item)}</Row.Text>
                    </Row.Body>
                    {renderRightIcon && <Row.Icon>{renderRightIcon(item)}</Row.Icon>}
                </Row>
            )}
        </Draggable>
    );
};
