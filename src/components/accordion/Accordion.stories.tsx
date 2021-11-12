import React from 'react';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Meta} from '@storybook/react/types-6-0';
import {Accordion} from './index';
import AddIcon from 'svg/24/icon-plus-24.svg';

import 'css/bundle.less';

export default {
    title: 'Accordion',
    component: Accordion,
} as Meta;

const themes = {
    default: {
        title: 'Default theme',
        containerClasses: [],
    },
    dark: {
        title: 'Dark theme',
        containerClasses: ['mtheme--darkpic'],
    },
};

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Default Accordion</StoryTitle>
            <Accordion text="Text">
                <p>Inner content</p>
            </Accordion>
            <Accordion text="Text" caption="Caption">
                <p>Inner content</p>
            </Accordion>
            <Accordion text="Text" caption="Caption" secondIcon={<AddIcon />}>
                <p>Inner content</p>
            </Accordion>
            <Accordion text="Text" big>
                <p>Inner content</p>
            </Accordion>
            <Accordion text="Text" caption="Caption" big>
                <p>Inner content</p>
            </Accordion>
            <Accordion text="Text" caption="Caption" big reverse>
                <p>Inner content</p>
            </Accordion>
            <Accordion text="Text" caption="Caption" big secondIcon={<AddIcon />}>
                <p>Inner content</p>
            </Accordion>
        </>
    );
};

export const Dark: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Dark Accordion</StoryTitle>
            <div className={themes['dark'].containerClasses.join(' ')}>
                <div className="mtheme__typo mtheme--bg--demo">
                    <div className="lbrick-2"></div>
                    <div className="lflex">
                        <div className="lgap-4-0"></div>
                        <div className="lflex--y-axis" style={{flexGrow: 1}}>
                            <Accordion text="Text">
                                <p>Inner content</p>
                            </Accordion>
                            <Accordion text="Text" caption="Caption">
                                <p>Inner content</p>
                            </Accordion>
                            <Accordion text="Text" caption="Caption" secondIcon={<AddIcon />}>
                                <p>Inner content</p>
                            </Accordion>
                            <Accordion text="Text" big>
                                <p>Inner content</p>
                            </Accordion>
                            <Accordion text="Text" caption="Caption" big>
                                <p>Inner content</p>
                            </Accordion>
                            <Accordion text="Text" caption="Caption" big reverse>
                                <p>Inner content</p>
                            </Accordion>
                            <Accordion text="Text" caption="Caption" big secondIcon={<AddIcon />}>
                                <p>Inner content</p>
                            </Accordion>
                        </div>
                        <div className="lgap-4-0"></div>
                    </div>
                    <div className="lbrick-2"></div>
                </div>
            </div>
        </>
    );
};

export const WithPadding: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Accordion with padding</StoryTitle>
            <Accordion text="Text">
                <p>Inner content</p>
            </Accordion>
            <Accordion text="Text" caption="Caption" horizontalPadding={8}>
                <p>Inner content</p>
            </Accordion>
            <Accordion text="Text" big horizontalPadding={16}>
                <p>Inner content</p>
            </Accordion>
            <Accordion text="Text" caption="Caption" big horizontalPadding={24}>
                <p>Inner content</p>
            </Accordion>
            <Accordion text="Text" caption="Caption" big reverse horizontalPadding={32}>
                <p>Inner content</p>
            </Accordion>
        </>
    );
};
