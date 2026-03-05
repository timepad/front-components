import React, {useState} from 'react';
import {Meta, StoryFn} from '@storybook/react';
import {Draggable, DragHandle} from './Draggable';
import {DraggableList} from './DraggableList';

interface IItem {
    id: string;
    name: string;
}

export default {
    title: 'Draggable',
    component: Draggable,
    argTypes: {},
} as Meta;

const Template: StoryFn = () => {
    const [items, setItems] = useState<IItem[]>([
        {id: '1', name: 'Элемент 1'},
        {id: '2', name: 'Элемент 2'},
        {id: '3', name: 'Элемент 3'},
        {id: '4', name: 'Элемент 4'},
        {id: '5', name: 'Элемент 5'},
    ]);

    const handleReorder = (newItems: IItem[]) => {
        setItems(newItems);
    };

    return (
        <div style={{padding: '20px'}}>
            <h2>Draggable List</h2>
            <Draggable
                items={items}
                onReorder={handleReorder}
                getKey={(item) => item.id}
                itemClassName="draggable-story-item"
                renderHandle={() => null}
            >
                {(item, dnd) => (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <DragHandle id={dnd.id} attributes={dnd.attributes} listeners={dnd.listeners} />
                        <span style={{paddingBottom: 6}}>{item.name}</span>
                    </div>
                )}
            </Draggable>
        </div>
    );
};

const DraggableListTemplate: StoryFn = () => {
    const [items, setItems] = useState<IItem[]>([
        {id: '1', name: 'Элемент 1'},
        {id: '2', name: 'Элемент 2'},
        {id: '3', name: 'Элемент 3'},
        {id: '4', name: 'Элемент 4'},
        {id: '5', name: 'Элемент 5'},
    ]);

    const handleReorder = (newItems: IItem[]) => {
        setItems(newItems);
    };

    return (
        <div style={{padding: '20px'}}>
            <h2>DraggableList (Row preset)</h2>
            <DraggableList items={items} onReorder={handleReorder} getKey={(item) => item.id}>
                {(item) => item.name}
            </DraggableList>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {};

export const RowPreset = DraggableListTemplate.bind({});
RowPreset.args = {};
