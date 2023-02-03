import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../../../services/helpers/storyBookHelpers';
import React from 'react';
import './demo.less';
import {Cell, CellType} from './Cell';
import {Row} from '../../../row';

export default {
    title: 'Cell',
    component: Cell,
} as Meta;

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Table with expandable cells</StoryTitle>
            <div className="table-container">
                <table>
                    <tr>
                        {data.map((el, index) => (
                            <Cell as={CellType.header} key={index}>
                                <div>{index}</div>
                            </Cell>
                        ))}
                    </tr>
                    <tr>
                        {data.map((el, index) => (
                            <Cell expandable key={index}>
                                Just text
                            </Cell>
                        ))}
                    </tr>
                    <tr>
                        {data.map((el, index) => (
                            <Cell expandable key={index} noPadding>
                                <Row selectable small>
                                    <Row.Body>Text in Row</Row.Body>
                                </Row>
                            </Cell>
                        ))}
                    </tr>
                </table>
            </div>
        </>
    );
};

const data = new Array(5).fill('Cell content');
