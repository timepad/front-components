import React from 'react';
import {IStorybookComponent, Spacer, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Meta} from '@storybook/react/types-6-0';
import {Row} from './index';
import AddIcon from 'svg/24/icon-plus-24.svg';

import 'css/bundle.less';

export default {
    title: 'Row',
    component: Row,
} as Meta;

const themes = {
    default: {
        title: 'Default theme',
        containerClasses: [],
    },
    light: {
        title: 'Light theme',
        containerClasses: ['mtheme--lightpic'],
    },
    dark: {
        title: 'Dark theme',
        containerClasses: ['mtheme--darkpic'],
    },
};

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Input Sans Narrow</StoryTitle>
            <div className="lflex--y-axis">
                <Row>
                    <Row.Body>
                        <Row.Text>This Row</Row.Text>
                    </Row.Body>
                </Row>
                <Row disabled>
                    <Row.Body>
                        <Row.Text>This disabled</Row.Text>
                    </Row.Body>
                </Row>
                <Row hoverable>
                    <Row.Body>
                        <Row.Text>This hoverable</Row.Text>
                    </Row.Body>
                </Row>
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
                <Row ffFont>
                    <Row.Body>
                        <Row.Text>This Row</Row.Text>
                    </Row.Body>
                </Row>
                <Row disabled ffFont>
                    <Row.Body>
                        <Row.Text>This disabled Row</Row.Text>
                    </Row.Body>
                </Row>
                <Row hoverable ffFont>
                    <Row.Body>
                        <Row.Text>This Row with hoverable</Row.Text>
                    </Row.Body>
                </Row>
                <Row ffFont>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row hoverable ffFont>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row disabled ffFont>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row ffFont>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row hoverable ffFont>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row disabled ffFont>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row ffFont>
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
                <Row hoverable ffFont>
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
                <Row disabled ffFont>
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
                <Row ffFont>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row hoverable ffFont>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row disabled ffFont>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <hr />
                <Row ffFont>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row hoverable ffFont>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row disabled ffFont>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row ffFont>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>
                <Row hoverable ffFont>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>

                <Row disabled ffFont>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>

                <Row ffFont>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row hoverable ffFont>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row disabled ffFont>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row ffFont>
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
                <Row hoverable ffFont>
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
                <Row disabled ffFont>
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
                <hr />
                <StoryTitle>Table example</StoryTitle>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Row hoverable>
                                    <Row.Icon>
                                        <AddIcon />
                                    </Row.Icon>
                                    <Row.Body>
                                        <Row.Text>Col 1</Row.Text>
                                    </Row.Body>
                                </Row>
                            </th>
                            <th>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>This Row with hoverable</Row.Text>
                                    </Row.Body>
                                </Row>
                            </th>
                            <th>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>This Row with hoverable</Row.Text>
                                    </Row.Body>
                                </Row>
                            </th>
                            <th>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>This Row with hoverable</Row.Text>
                                    </Row.Body>
                                </Row>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>Primary text</Row.Text>
                                        <Row.Caption>Secondary text</Row.Caption>
                                    </Row.Body>
                                </Row>
                            </td>
                            <td>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>This Row with hoverable</Row.Text>
                                    </Row.Body>
                                </Row>
                            </td>
                            <td>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>This Row with hoverable</Row.Text>
                                    </Row.Body>
                                </Row>
                            </td>
                            <td>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>Primary text</Row.Text>
                                        <Row.Caption>Secondary text</Row.Caption>
                                    </Row.Body>
                                </Row>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export const DefaultDark: IStorybookComponent = () => {
    return (
        <>
            <div className={themes['dark'].containerClasses.join(' ')}>
                <div className="mtheme__typo mtheme--bg--demo">
                    <div className="lbrick-2" />
                    <div className="lflex">
                        <div className="lgap-4-0" />
                        <div style={{flex: 1}}>
                            <div className="t-lead t-lead-24">{themes['dark'].title}</div>
                            <div className="inputs-container">
                                <StoryTitle>Input Sans Narrow</StoryTitle>
                                <div className="lflex--y-axis">
                                    <Row>
                                        <Row.Body>
                                            <Row.Text>This Row</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row disabled>
                                        <Row.Body>
                                            <Row.Text>This disabled</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row hoverable>
                                        <Row.Body>
                                            <Row.Text>This hoverable</Row.Text>
                                        </Row.Body>
                                    </Row>
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
                                    <Row ffFont>
                                        <Row.Body>
                                            <Row.Text>This Row</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row disabled ffFont>
                                        <Row.Body>
                                            <Row.Text>This disabled Row</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row hoverable ffFont>
                                        <Row.Body>
                                            <Row.Text>This Row with hoverable</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row ffFont>
                                        <Row.Icon>
                                            <AddIcon />
                                        </Row.Icon>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row hoverable ffFont>
                                        <Row.Icon>
                                            <AddIcon />
                                        </Row.Icon>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row disabled ffFont>
                                        <Row.Icon>
                                            <AddIcon />
                                        </Row.Icon>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row ffFont>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                        <Row.Icon right>
                                            <AddIcon />
                                        </Row.Icon>
                                    </Row>
                                    <Row hoverable ffFont>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                        <Row.Icon right>
                                            <AddIcon />
                                        </Row.Icon>
                                    </Row>
                                    <Row disabled ffFont>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                        <Row.Icon right>
                                            <AddIcon />
                                        </Row.Icon>
                                    </Row>
                                    <Row ffFont>
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
                                    <Row hoverable ffFont>
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
                                    <Row disabled ffFont>
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
                                    <Row ffFont>
                                        <Spacer />
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row hoverable ffFont>
                                        <Spacer />
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row disabled ffFont>
                                        <Spacer />
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <hr />
                                    <Row ffFont>
                                        <Row.Body>
                                            <Row.Text>Primary text</Row.Text>
                                            <Row.Caption>Secondary text</Row.Caption>
                                        </Row.Body>
                                    </Row>
                                    <Row hoverable ffFont>
                                        <Row.Body>
                                            <Row.Text>Primary text</Row.Text>
                                            <Row.Caption>Secondary text</Row.Caption>
                                        </Row.Body>
                                    </Row>
                                    <Row disabled ffFont>
                                        <Row.Body>
                                            <Row.Text>Primary text</Row.Text>
                                            <Row.Caption>Secondary text</Row.Caption>
                                        </Row.Body>
                                    </Row>
                                    <Row ffFont>
                                        <Row.Icon top>
                                            <AddIcon />
                                        </Row.Icon>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                            <Row.Caption>Caption</Row.Caption>
                                        </Row.Body>
                                    </Row>
                                    <Row hoverable ffFont>
                                        <Row.Icon top>
                                            <AddIcon />
                                        </Row.Icon>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                            <Row.Caption>Caption</Row.Caption>
                                        </Row.Body>
                                    </Row>

                                    <Row disabled ffFont>
                                        <Row.Icon top>
                                            <AddIcon />
                                        </Row.Icon>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                            <Row.Caption>Caption</Row.Caption>
                                        </Row.Body>
                                    </Row>

                                    <Row ffFont>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                            <Row.Caption>Caption</Row.Caption>
                                        </Row.Body>
                                        <Row.Icon right top>
                                            <AddIcon />
                                        </Row.Icon>
                                    </Row>

                                    <Row hoverable ffFont>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                            <Row.Caption>Caption</Row.Caption>
                                        </Row.Body>
                                        <Row.Icon right top>
                                            <AddIcon />
                                        </Row.Icon>
                                    </Row>

                                    <Row disabled ffFont>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                            <Row.Caption>Caption</Row.Caption>
                                        </Row.Body>
                                        <Row.Icon right top>
                                            <AddIcon />
                                        </Row.Icon>
                                    </Row>

                                    <Row ffFont>
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
                                    <Row hoverable ffFont>
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
                                    <Row disabled ffFont>
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
                            </div>
                        </div>
                        <div className="lgap-4-0" />
                    </div>
                </div>
            </div>
        </>
    );
};

export const Small: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Input Sans Narrow</StoryTitle>
            <div className="lflex--y-axis">
                <Row small>
                    <Row.Body>
                        <Row.Text>This Row</Row.Text>
                    </Row.Body>
                </Row>
                <Row small disabled>
                    <Row.Body>
                        <Row.Text>This disabled row</Row.Text>
                    </Row.Body>
                </Row>
                <Row small hoverable>
                    <Row.Body>
                        <Row.Text>This Row with hoverable</Row.Text>
                    </Row.Body>
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
                <Row small ffFont>
                    <Row.Body>
                        <Row.Text>This Row</Row.Text>
                    </Row.Body>
                </Row>
                <Row small disabled ffFont>
                    <Row.Body>
                        <Row.Text>This disabled Row</Row.Text>
                    </Row.Body>
                </Row>
                <Row small hoverable ffFont>
                    <Row.Body>
                        <Row.Text>This Row with hoverable</Row.Text>
                    </Row.Body>
                </Row>
                <Row small ffFont>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small hoverable ffFont>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small disabled ffFont>
                    <Row.Icon>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small ffFont>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small hoverable ffFont>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small disabled ffFont>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                    <Row.Icon right>
                        <AddIcon />
                    </Row.Icon>
                </Row>
                <Row small ffFont>
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
                <Row small hoverable ffFont>
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
                <Row small disabled ffFont>
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
                <Row small ffFont>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small hoverable ffFont>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <Row small disabled ffFont>
                    <Spacer />
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                    </Row.Body>
                </Row>
                <hr />
                <Row small ffFont>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small hoverable ffFont>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small disabled ffFont>
                    <Row.Body>
                        <Row.Text>Primary text</Row.Text>
                        <Row.Caption>Secondary text</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small ffFont>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>
                <Row small hoverable ffFont>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>

                <Row small disabled ffFont>
                    <Row.Icon top>
                        <AddIcon />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                </Row>

                <Row small ffFont>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row small hoverable ffFont>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row small disabled ffFont>
                    <Row.Body>
                        <Row.Text>List item</Row.Text>
                        <Row.Caption>Caption</Row.Caption>
                    </Row.Body>
                    <Row.Icon right top>
                        <AddIcon />
                    </Row.Icon>
                </Row>

                <Row small ffFont>
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
                <Row small hoverable ffFont>
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
                <Row small disabled ffFont>
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

export const SmallDark: IStorybookComponent = () => {
    return (
        <>
            <div className={themes['dark'].containerClasses.join(' ')}>
                <div className="mtheme__typo mtheme--bg--demo">
                    <div className="lbrick-2" />
                    <div className="lflex">
                        <div className="lgap-4-0" />
                        <div style={{flex: 1}}>
                            <div className="t-lead t-lead-24">{themes['dark'].title}</div>
                            <div className="inputs-container">
                                <StoryTitle>Input Sans Narrow</StoryTitle>
                                <div className="lflex--y-axis">
                                    <Row small>
                                        <Row.Body>
                                            <Row.Text>This Row</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row small disabled>
                                        <Row.Body>
                                            <Row.Text>This disabled row</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row small hoverable>
                                        <Row.Body>
                                            <Row.Text>This Row with hoverable</Row.Text>
                                        </Row.Body>
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
                                    <Row small ffFont>
                                        <Row.Body>
                                            <Row.Text>This Row</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row small disabled ffFont>
                                        <Row.Body>
                                            <Row.Text>This disabled Row</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row small hoverable ffFont>
                                        <Row.Body>
                                            <Row.Text>This Row with hoverable</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row small ffFont>
                                        <Row.Icon>
                                            <AddIcon />
                                        </Row.Icon>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row small hoverable ffFont>
                                        <Row.Icon>
                                            <AddIcon />
                                        </Row.Icon>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row small disabled ffFont>
                                        <Row.Icon>
                                            <AddIcon />
                                        </Row.Icon>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row small ffFont>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                        <Row.Icon right>
                                            <AddIcon />
                                        </Row.Icon>
                                    </Row>
                                    <Row small hoverable ffFont>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                        <Row.Icon right>
                                            <AddIcon />
                                        </Row.Icon>
                                    </Row>
                                    <Row small disabled ffFont>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                        <Row.Icon right>
                                            <AddIcon />
                                        </Row.Icon>
                                    </Row>
                                    <Row small ffFont>
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
                                    <Row small hoverable ffFont>
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
                                    <Row small disabled ffFont>
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
                                    <Row small ffFont>
                                        <Spacer />
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row small hoverable ffFont>
                                        <Spacer />
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <Row small disabled ffFont>
                                        <Spacer />
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                        </Row.Body>
                                    </Row>
                                    <hr />
                                    <Row small ffFont>
                                        <Row.Body>
                                            <Row.Text>Primary text</Row.Text>
                                            <Row.Caption>Secondary text</Row.Caption>
                                        </Row.Body>
                                    </Row>
                                    <Row small hoverable ffFont>
                                        <Row.Body>
                                            <Row.Text>Primary text</Row.Text>
                                            <Row.Caption>Secondary text</Row.Caption>
                                        </Row.Body>
                                    </Row>
                                    <Row small disabled ffFont>
                                        <Row.Body>
                                            <Row.Text>Primary text</Row.Text>
                                            <Row.Caption>Secondary text</Row.Caption>
                                        </Row.Body>
                                    </Row>
                                    <Row small ffFont>
                                        <Row.Icon top>
                                            <AddIcon />
                                        </Row.Icon>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                            <Row.Caption>Caption</Row.Caption>
                                        </Row.Body>
                                    </Row>
                                    <Row small hoverable ffFont>
                                        <Row.Icon top>
                                            <AddIcon />
                                        </Row.Icon>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                            <Row.Caption>Caption</Row.Caption>
                                        </Row.Body>
                                    </Row>

                                    <Row small disabled ffFont>
                                        <Row.Icon top>
                                            <AddIcon />
                                        </Row.Icon>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                            <Row.Caption>Caption</Row.Caption>
                                        </Row.Body>
                                    </Row>

                                    <Row small ffFont>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                            <Row.Caption>Caption</Row.Caption>
                                        </Row.Body>
                                        <Row.Icon right top>
                                            <AddIcon />
                                        </Row.Icon>
                                    </Row>

                                    <Row small hoverable ffFont>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                            <Row.Caption>Caption</Row.Caption>
                                        </Row.Body>
                                        <Row.Icon right top>
                                            <AddIcon />
                                        </Row.Icon>
                                    </Row>

                                    <Row small disabled ffFont>
                                        <Row.Body>
                                            <Row.Text>List item</Row.Text>
                                            <Row.Caption>Caption</Row.Caption>
                                        </Row.Body>
                                        <Row.Icon right top>
                                            <AddIcon />
                                        </Row.Icon>
                                    </Row>

                                    <Row small ffFont>
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
                                    <Row small hoverable ffFont>
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
                                    <Row small disabled ffFont>
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
                            </div>
                        </div>
                        <div className="lgap-4-0" />
                    </div>
                </div>
            </div>
        </>
    );
};