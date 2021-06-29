import React from 'react';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Meta} from '@storybook/react/types-6-0';
import {Row} from './Row';
import AddIcon from 'svg/24/icon-plus-24.svg';

import 'css/bundle.less';

export default {
    title: 'Row',
    component: Row,
} as Meta;

export const RowDefault: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Light theme</StoryTitle>
            <div className="lflex--y-axis">
                <Row>Это Row</Row>
                <Row disabled>Это disabled Row</Row>
                <Row hoverable>Это Row with hoverable</Row>
                <Row hoverable>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row hoverable>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>

                <Row disabled>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>
                <Row hoverable>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row hoverable>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row hoverable>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
            </div>
        </>
    );
};

export const RowSmall: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Light theme</StoryTitle>
            <div className="lflex--y-axis">
                <Row small>Это Row</Row>
                <Row disabled small>
                    Это disabled Row
                </Row>
                <Row hoverable small>
                    Это Row with hoverable
                </Row>
                <Row hoverable small>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row hoverable small>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>

                <Row disabled small>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>
                <Row hoverable small>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row hoverable small>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
            </div>
        </>
    );
};
