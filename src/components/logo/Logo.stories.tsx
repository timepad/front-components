import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Logo, LogoVariant} from './Logo';
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

export const Mobile: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Mobile Logo</StoryTitle>
            <Logo variant={LogoVariant.mobile} />
        </>
    );
};

export const Short: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Short Logo</StoryTitle>
            <Logo variant={LogoVariant.short} />
        </>
    );
};

export const LinkLogo: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Link Logo</StoryTitle>
            <Logo link="#" />
        </>
    );
};
