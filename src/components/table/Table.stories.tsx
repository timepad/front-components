import React, {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Table} from './Table';
import 'css/bundle.less';
import {StoryDescription, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Button} from 'components/button';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'SimpleTable',
    component: Table,
} as Meta;

const tableData = {
    cols: [
        {id: 'id', label: 'ID'},
        {id: 'title', label: 'Название'},
        {id: 'dates', label: 'Даты', align: 'right'},
        {id: 'actions', label: 'Действия', align: 'right'},
    ],
    data: [
        {id: '4', title: 'Закрыть холодильник', dates: '12.09.2028', actions: ''},
        {
            id: '1',
            title: 'Открыть холодильник',
            dates: '01.08.2028',
            actions: <Button variant={Button.variant.transparent}>JSX</Button>,
        },
        {id: '3', title: 'Засунуть жирафа', dates: '24.08.2028', actions: ''},
        {id: '2', title: 'Достать слона', dates: '08.08.2028', actions: ''},
    ],
};

export const Basic: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Simple Table Example</StoryTitle>
            <StoryDescription>
                Table with <b>cols</b> and <b>data</b> params only
            </StoryDescription>

            <Table {...tableData} />
        </>
    );
};

export const Combined: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>{`Data combined with <Col />, <Row />, <Foot /> components`}</StoryTitle>
            <StoryDescription>Table combined props and component</StoryDescription>

            <Table data={tableData.data} onRowClick={(row) => window.console.log(row.target)} sort={{id: 'desc'}}>
                <Table.Col id="id" label="ID" />
                <Table.Col id="title" label="Заголовок" format={(value) => <strong>{value}</strong>} />
                <Table.Col id="actions" label="Действия" align="right" />
                <Table.Col id="id" label="ID" />
                <Table.Row
                    style={{background: '#DBE9EE', color: '#166088'}}
                    cells={{id: '5', title: 'Тут строка-компонент', dates: '08.08.2028', actions: ''}}
                />
                <Table.Foot>
                    <Table.Row cells={{id: '0', title: 'Это контент футера', dates: '08.08.2028', actions: ''}} />
                </Table.Foot>
            </Table>
        </>
    );
};

export const ComponentOnly: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Table components only</StoryTitle>

            <Table>
                <Table.Col id="id" label="ID" align="right" width="40px" />
                <Table.Col id="title" label="Заголовок" width="200px" />
                <Table.Col id="actions" label="Действия" />
                <Table.Col id="id" label="ID" format={(value) => value + ' %'} />
                {tableData.data.map((item, idx) => (
                    <Table.Row key={idx} cells={item} />
                ))}
            </Table>
        </>
    );
};
