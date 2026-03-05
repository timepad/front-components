import React, {useState} from 'react';
import {Meta, StoryFn} from '@storybook/react';
import {DraggableList} from './DraggableList';
import Row from '../row/Row';

interface IItem {
    id: string;
    name: string;
}

export default {
    title: 'Components/DraggableList',
    component: DraggableList,
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

    const renderItem = (item: IItem) => (
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span>{item.name}</span>
        </div>
    );

    return (
        <div style={{padding: '20px'}}>
            <h2>Draggable List</h2>
            <DraggableList items={items} onReorder={handleReorder} getKey={(item) => item.id} renderItem={renderItem} />
        </div>
    );
};

const WithRowTemplate: StoryFn = () => {
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

    const renderItem = (item: IItem) => (
        <Row hoverable>
            <Row.Body>
                <Row.Text>{item.name}</Row.Text>
            </Row.Body>
        </Row>
    );

    return (
        <div style={{padding: '20px'}}>
            <h2>Draggable List with Row</h2>
            <DraggableList items={items} onReorder={handleReorder} getKey={(item) => item.id} renderItem={renderItem} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {};

export const WithRow = WithRowTemplate.bind({});
WithRow.args = {};
