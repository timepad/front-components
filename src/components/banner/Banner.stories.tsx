import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle, StoryDescription} from '../../services/helpers/storyBookHelpers';
import React from 'react';
import {IconEdit24} from '../../icons';
import {Banner, InfoBanner, WarningBanner} from './index';
import {Button, ButtonVariant} from '../button/index';

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
            <Banner closeable icon={<IconEdit24 />}>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
            </Banner>
            <StoryTitle>With button</StoryTitle>
            <Banner closeable>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
                <Button variant={ButtonVariant.secondary} label="Auto secondary" />
            </Banner>
            <StoryTitle>With callback</StoryTitle>
            <StoryDescription>
                This banner will log <b>close clicked</b> to console on click close button.
            </StoryDescription>
            <Banner closeable onCloseClick={() => window.console.log('close clicked')}>
                Note: If you login to Figma via Google SSO or SAML SSO, you wont be able to enable two-factor in Figma.
                You will need to enable two-factor or multi-factor authentication with your identity provider instead.
                <Button variant={ButtonVariant.secondary} label="Auto secondary" />
            </Banner>
        </>
    );
};
