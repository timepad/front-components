import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {LogoWrapper} from './Logo';
import {LogoMobile, LogoDesktop, LogoShort} from './index';
import '../../assets/css/bundle.less';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Logo',
    component: LogoWrapper,
} as Meta;

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Simple Logo</StoryTitle>
            <LogoWrapper>
                <LogoDesktop />
            </LogoWrapper>
        </>
    );
};

export const Mobile: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Mobile Logo</StoryTitle>
            <LogoWrapper mobile>
                <LogoMobile />
            </LogoWrapper>
        </>
    );
};

export const Short: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Short Logo</StoryTitle>
            <LogoWrapper>
                <LogoShort />
            </LogoWrapper>
        </>
    );
};

export const LinkLogo: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Link Logo</StoryTitle>
            <LogoWrapper link="#">
                <LogoDesktop />
            </LogoWrapper>
        </>
    );
};
