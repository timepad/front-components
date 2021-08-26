import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Logo} from './Logo';
import {Brick} from '../brick';
import '../../assets/css/bundle.less';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Logo',
    component: Logo,
} as Meta;

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Simple Logo</StoryTitle>
            <Logo />
        </>
    );
};
Simple.storyName = 'Simple';

export const Short: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Short Logo</StoryTitle>
            <Logo short />
        </>
    );
};
Short.storyName = 'Short';

export const ShortExpandable: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Expandable Logo</StoryTitle>
            <Logo short action="expandable" />
        </>
    );
};
ShortExpandable.storyName = 'Short expandable';

export const ShortHoverable: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Hoverable Logo</StoryTitle>
            <Logo short action="hoverable" />
        </>
    );
};
ShortHoverable.storyName = 'Short Hoverable';

export const Colored: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>
                Colored Logo. Possible color values: gray, white, blue, purple. Black is default color.
            </StoryTitle>
            <Logo />
            <Brick />
            <Logo short color="gray" />
            <Brick />
            <Logo short action="expandable" color="blue" />
            <Brick />
            <Logo short action="hoverable" color="purple" />
            <Brick />
            <div style={{backgroundColor: '#3a6881', padding: 10, width: 'fit-content'}}>
                <Logo color="white" />
            </div>
        </>
    );
};
Colored.storyName = 'Colored Logo';
