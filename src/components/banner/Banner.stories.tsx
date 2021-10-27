import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import React from 'react';
import IconEdit from 'svg/24/icon-edit-24.svg';
import {Banner, InfoBanner, WarningBanner} from './index';
import {Button, ButtonIconAlignment, ButtonVariant, SliderButton} from '../button/index';

export default {
    title: 'Banner',
    component: Banner,
} as Meta;

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Just content</StoryTitle>
            <Banner>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
            </Banner>
            <StoryTitle>Closeable</StoryTitle>
            <Banner closeable>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
            </Banner>
            <StoryTitle>With Icon</StoryTitle>
            <InfoBanner>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
            </InfoBanner>
            <StoryTitle>With Warning Icon</StoryTitle>
            <WarningBanner>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
            </WarningBanner>
            <StoryTitle>With custom Icon & Closable</StoryTitle>
            <Banner closeable icon={<IconEdit />}>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
            </Banner>
            <StoryTitle>With button</StoryTitle>
            <Banner closeable>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
                <Button variant={ButtonVariant.secondary} label="Auto secondary" />
            </Banner>
        </>
    );
};
