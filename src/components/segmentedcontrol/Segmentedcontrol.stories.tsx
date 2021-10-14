import React from 'react';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Meta} from '@storybook/react/types-6-0';
import {Segmentedcontrol} from './index';

import 'css/bundle.less';

export default {
    title: 'SegmentedControl',
    component: Segmentedcontrol,
} as Meta;

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Simple Segmentedcontrol Example</StoryTitle>
            <Segmentedcontrol activeControlId={'first'}>
                <Segmentedcontrol.List>
                    <Segmentedcontrol.Control controlId={'first'}>First</Segmentedcontrol.Control>
                    <Segmentedcontrol.Control controlId={'second'}>Second</Segmentedcontrol.Control>
                </Segmentedcontrol.List>
            </Segmentedcontrol>
            <Segmentedcontrol activeControlId={'first'} light={true}>
                <Segmentedcontrol.List>
                    <Segmentedcontrol.Control controlId={'first'}>First</Segmentedcontrol.Control>
                    <Segmentedcontrol.Control controlId={'second'}>Second</Segmentedcontrol.Control>
                    <Segmentedcontrol.Control controlId={'third'}>Third</Segmentedcontrol.Control>
                </Segmentedcontrol.List>
            </Segmentedcontrol>
            <Segmentedcontrol
                activeControlId={'first'}
                dark={true}
                onControlClick={(controlId, setActiveControlId) => {
                    window.console.log(controlId);
                    setActiveControlId(controlId);
                }}
            >
                <Segmentedcontrol.List>
                    <Segmentedcontrol.Control controlId={'first'}>First</Segmentedcontrol.Control>
                    <Segmentedcontrol.Control controlId={'second'}>Second</Segmentedcontrol.Control>
                </Segmentedcontrol.List>
            </Segmentedcontrol>
            <Segmentedcontrol activeControlId={'first'} fix={true}>
                <Segmentedcontrol.List>
                    <Segmentedcontrol.Control controlId={'first'}>First</Segmentedcontrol.Control>
                    <Segmentedcontrol.Control controlId={'second'}>Second</Segmentedcontrol.Control>
                </Segmentedcontrol.List>
            </Segmentedcontrol>
            <Segmentedcontrol activeControlId={'first'} fix={true} light={true}>
                <Segmentedcontrol.List>
                    <Segmentedcontrol.Control controlId={'first'}>First</Segmentedcontrol.Control>
                    <Segmentedcontrol.Control controlId={'second'}>Second</Segmentedcontrol.Control>
                    <Segmentedcontrol.Control controlId={'third'}>Third</Segmentedcontrol.Control>
                </Segmentedcontrol.List>
            </Segmentedcontrol>
            <Segmentedcontrol activeControlId={'first'} fix={true} dark={true}>
                <Segmentedcontrol.List>
                    <Segmentedcontrol.Control controlId={'first'}>First</Segmentedcontrol.Control>
                    <Segmentedcontrol.Control controlId={'second'}>Second</Segmentedcontrol.Control>
                </Segmentedcontrol.List>
            </Segmentedcontrol>
        </>
    );
};
