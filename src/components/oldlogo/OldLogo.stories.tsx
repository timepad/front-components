import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {OldLogo} from './OldLogo';
import {Brick} from '../brick';
import '../../assets/css/bundle.less';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'OldLogo',
    component: OldLogo,
} as Meta;

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Simple Logo</StoryTitle>
            <OldLogo />
        </>
    );
};
Simple.storyName = 'Simple';

export const Short: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Short Logo</StoryTitle>
            <OldLogo short />
        </>
    );
};
Short.storyName = 'Short';

export const ShortExpandable: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Expandable Logo</StoryTitle>
            <OldLogo short action="expandable" />
        </>
    );
};
ShortExpandable.storyName = 'Short expandable';

export const ShortHoverable: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Hoverable Logo</StoryTitle>
            <OldLogo short action="hoverable" />
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
            <OldLogo />
            <Brick />
            <OldLogo short color="gray" />
            <Brick />
            <OldLogo short action="expandable" color="blue" />
            <Brick />
            <OldLogo short action="hoverable" color="purple" />
            <Brick />
            <div style={{backgroundColor: '#3a6881', padding: 10, width: 'fit-content'}}>
                <OldLogo color="white" />
            </div>
        </>
    );
};
Colored.storyName = 'Colored OldLogo';
