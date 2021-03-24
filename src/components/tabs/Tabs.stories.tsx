import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Tabs} from './Tabs';
import 'css/bundle.less';
import {StoryDescription, StoryTitle} from '../../services/helpers/storyBookHelpers';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Tabs',
    component: Tabs,
} as Meta;

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Simple Tabs Example</StoryTitle>
            <Tabs activeTabId={'first'}>
                <Tabs.List>
                    <Tabs.Tab tabId={'first'}>First Tab</Tabs.Tab>
                    <Tabs.Tab tabId={'second'}>Second Tab</Tabs.Tab>
                </Tabs.List>
                <Tabs.Content tabId={'first'}>
                    <p>This is the content of the first Tab.</p>
                </Tabs.Content>
                <Tabs.Content tabId={'second'}>
                    <p>Second tab content goes here!</p>
                </Tabs.Content>
            </Tabs>
        </>
    );
};

export const WithCustomClickHandler: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Tabs with custom click </StoryTitle>
            <StoryDescription>
                This tabs will log <b>tabId</b> to console on click.
            </StoryDescription>
            <Tabs
                activeTabId={'first'}
                onTabClick={(tabId, setActiveTabId) => {
                    window.console.log(tabId);
                    setActiveTabId(tabId);
                }}
            >
                <Tabs.List>
                    <Tabs.Tab tabId={'first'}>First Tab</Tabs.Tab>
                    <Tabs.Tab tabId={'second'}>Second Tab</Tabs.Tab>
                </Tabs.List>
                <Tabs.Content tabId={'first'}>
                    <p>This is the content of the first Tab.</p>
                </Tabs.Content>
                <Tabs.Content tabId={'second'}>
                    <p>Second tab content goes here!</p>
                </Tabs.Content>
            </Tabs>
        </>
    );
};
