import React from 'react';
import {IStorybookComponent, Spacer, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Meta} from '@storybook/react/types-6-0';
import {Row, RowFontEnum} from './Row';
import AddIcon from 'svg/24/icon-plus-24.svg';

import 'css/bundle.less';

export default {
    title: 'Row',
    component: Row,
} as Meta;

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Input Sans Narrow</StoryTitle>
            <div className="lflex--y-axis">
                <Row>This Row</Row>
                <Row disabled>This disabled Row</Row>
                <Row hoverable>This Row with hoverable</Row>
                <Row>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row hoverable>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row disabled>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row hoverable>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row disabled>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
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
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row disabled>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row hoverable>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row disabled>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <hr />
                <Row>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row hoverable>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row disabled>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>
                <Row hoverable>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>

                <Row disabled>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>

                <Row>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row hoverable>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row disabled>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row hoverable>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row disabled>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
            </div>

            <StoryTitle>Neue Haas Unica W1G</StoryTitle>
            <div className="lflex--y-axis">
                <Row fontFamily={RowFontEnum.FF}>This Row</Row>
                <Row disabled fontFamily={RowFontEnum.FF}>
                    This disabled Row
                </Row>
                <Row hoverable fontFamily={RowFontEnum.FF}>
                    This Row with hoverable
                </Row>
                <Row fontFamily={RowFontEnum.FF}>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row disabled fontFamily={RowFontEnum.FF}>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row disabled fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row fontFamily={RowFontEnum.FF}>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row disabled fontFamily={RowFontEnum.FF}>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row fontFamily={RowFontEnum.FF}>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row hoverable fontFamily={RowFontEnum.FF}>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row disabled fontFamily={RowFontEnum.FF}>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <hr />
                <Row fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row disabled fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row fontFamily={RowFontEnum.FF}>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>
                <Row hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>

                <Row disabled fontFamily={RowFontEnum.FF}>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>

                <Row fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row disabled fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row fontFamily={RowFontEnum.FF}>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row disabled fontFamily={RowFontEnum.FF}>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
            </div>
        </>
    );
};

export const Small: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Input Sans Narrow</StoryTitle>
            <div className="lflex--y-axis">
                <Row small>This Row</Row>
                <Row small disabled>
                    This disabled Row
                </Row>
                <Row small hoverable>
                    This Row with hoverable
                </Row>
                <Row small>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small hoverable>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small disabled>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small hoverable>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small disabled>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small hoverable>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small disabled>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small hoverable>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small disabled>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <hr />
                <Row small>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small hoverable>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small disabled>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small hoverable>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small disabled>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small hoverable>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small disabled>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small hoverable>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small disabled>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
            </div>

            <StoryTitle>Neue Haas Unica W1G</StoryTitle>
            <div className="lflex--y-axis">
                <Row small fontFamily={RowFontEnum.FF}>
                    This Row
                </Row>
                <Row small disabled fontFamily={RowFontEnum.FF}>
                    This disabled Row
                </Row>
                <Row small hoverable fontFamily={RowFontEnum.FF}>
                    This Row with hoverable
                </Row>
                <Row small fontFamily={RowFontEnum.FF}>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small disabled fontFamily={RowFontEnum.FF}>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small disabled fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small fontFamily={RowFontEnum.FF}>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small disabled fontFamily={RowFontEnum.FF}>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small fontFamily={RowFontEnum.FF}>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small hoverable fontFamily={RowFontEnum.FF}>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small disabled fontFamily={RowFontEnum.FF}>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <hr />
                <Row small fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small disabled fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small fontFamily={RowFontEnum.FF}>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>

                <Row small disabled fontFamily={RowFontEnum.FF}>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>

                <Row small fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row small hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row small disabled fontFamily={RowFontEnum.FF}>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row small fontFamily={RowFontEnum.FF}>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small hoverable fontFamily={RowFontEnum.FF}>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small disabled fontFamily={RowFontEnum.FF}>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>
            </div>
        </>
    );
};
