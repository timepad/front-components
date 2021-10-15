import React from 'react';
import {IStorybookComponent, StoryTitle, StoryDescription} from '../../services/helpers/storyBookHelpers';
import {Meta} from '@storybook/react/types-6-0';
import {SegmentedControl} from './index';

import 'css/bundle.less';

export default {
    title: 'SegmentedControl',
    component: SegmentedControl,
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
            <StoryTitle>Default Segmented Control</StoryTitle>
            <SegmentedControl activeControlId={'first'}>
                <SegmentedControl.List>
                    <SegmentedControl.Control controlId={'first'}>First</SegmentedControl.Control>
                    <SegmentedControl.Control controlId={'second'}>Second</SegmentedControl.Control>
                    <SegmentedControl.Control controlId={'third'}>Third</SegmentedControl.Control>
                </SegmentedControl.List>
            </SegmentedControl>

            <SegmentedControl activeControlId={'first'} fix={true}>
                <SegmentedControl.List>
                    <SegmentedControl.Control controlId={'first'}>First</SegmentedControl.Control>
                    <SegmentedControl.Control controlId={'second'}>Second</SegmentedControl.Control>
                    <SegmentedControl.Control controlId={'third'}>Third</SegmentedControl.Control>
                </SegmentedControl.List>
            </SegmentedControl>
        </>
    );
};

export const Light: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Light Segmented Control</StoryTitle>
            <div className={themes['light'].containerClasses.join(' ')}>
                <SegmentedControl activeControlId={'first'}>
                    <SegmentedControl.List>
                        <SegmentedControl.Control controlId={'first'}>First</SegmentedControl.Control>
                        <SegmentedControl.Control controlId={'second'}>Second</SegmentedControl.Control>
                        <SegmentedControl.Control controlId={'third'}>Third</SegmentedControl.Control>
                    </SegmentedControl.List>
                </SegmentedControl>
                <SegmentedControl activeControlId={'first'} fix={true}>
                    <SegmentedControl.List>
                        <SegmentedControl.Control controlId={'first'}>First</SegmentedControl.Control>
                        <SegmentedControl.Control controlId={'second'}>Second</SegmentedControl.Control>
                        <SegmentedControl.Control controlId={'third'}>Third</SegmentedControl.Control>
                    </SegmentedControl.List>
                </SegmentedControl>
            </div>
        </>
    );
};

export const Dark: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Dark Segmented Control</StoryTitle>
            <div className={themes['dark'].containerClasses.join(' ')}>
                <div className="mtheme__typo mtheme--bg--demo">
                    <div className="lbrick-2"></div>
                    <div className="lflex">
                        <div className="lgap-4-0"></div>
                        <div className="lflex--y-axis" style={{flexGrow: 1}}>
                            <SegmentedControl activeControlId={'first'}>
                                <SegmentedControl.List>
                                    <SegmentedControl.Control controlId={'first'}>First</SegmentedControl.Control>
                                    <SegmentedControl.Control controlId={'second'}>Second</SegmentedControl.Control>
                                    <SegmentedControl.Control controlId={'third'}>Third</SegmentedControl.Control>
                                </SegmentedControl.List>
                            </SegmentedControl>
                            <SegmentedControl activeControlId={'first'} fix={true}>
                                <SegmentedControl.List>
                                    <SegmentedControl.Control controlId={'first'}>First</SegmentedControl.Control>
                                    <SegmentedControl.Control controlId={'second'}>Second</SegmentedControl.Control>
                                    <SegmentedControl.Control controlId={'third'}>Third</SegmentedControl.Control>
                                </SegmentedControl.List>
                            </SegmentedControl>
                        </div>
                        <div className="lgap-4-0"></div>
                    </div>
                    <div className="lbrick-2"></div>
                </div>
            </div>
        </>
    );
};

export const CustomClick: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Custom click Segmented Control</StoryTitle>
            <StoryDescription>
                This control will log <b>controlId</b> to console on click.
            </StoryDescription>
            <SegmentedControl
                activeControlId={'first'}
                onControlClick={(controlId, setActiveControlId) => {
                    window.console.log(controlId);
                    setActiveControlId(controlId);
                }}
            >
                <SegmentedControl.List>
                    <SegmentedControl.Control controlId={'first'}>First</SegmentedControl.Control>
                    <SegmentedControl.Control controlId={'second'}>Second</SegmentedControl.Control>
                    <SegmentedControl.Control controlId={'third'}>Third</SegmentedControl.Control>
                </SegmentedControl.List>
            </SegmentedControl>
        </>
    );
};
