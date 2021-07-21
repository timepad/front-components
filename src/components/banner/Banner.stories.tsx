import {Meta} from '@storybook/react/types-6-0';
import {Banner} from './Banner';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import React from 'react';

export default {
    title: 'Banner',
    component: Banner,
} as Meta;

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Just content</StoryTitle>
            <Banner theme={Banner.themes.info}>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
            </Banner>
            <StoryTitle>Closeable</StoryTitle>
            <Banner theme={Banner.themes.info} closeable>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
            </Banner>
            <StoryTitle>With Icon</StoryTitle>
            <Banner theme={Banner.themes.info} icon>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
            </Banner>
            <StoryTitle>With Icon & Closable</StoryTitle>
            <Banner closeable icon>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
            </Banner>
        </>
    );
};
