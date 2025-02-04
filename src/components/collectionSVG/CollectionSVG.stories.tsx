import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent} from '../../services/helpers/storyBookHelpers';
import {CollectionTable} from './CollectionTable';
import {
    collectionSVG16,
    collectionSVG24,
    collectionSVGAppbank,
    collectionSVGAppShops,
    collectionSVGLogo,
    collectionSVGMap,
    collectionSVGPaymentSystems,
    collectionSVGSocialMedia,
} from './collections';

export default {
    title: 'CollectionsSVG',
} as Meta;

export const Icon16: IStorybookComponent = () => <CollectionTable titleTable="16" collectionsSVG={collectionSVG16} />;

export const Icon24: IStorybookComponent = () => <CollectionTable titleTable="24" collectionsSVG={collectionSVG24} />;

export const Map: IStorybookComponent = () => <CollectionTable titleTable="Map" collectionsSVG={collectionSVGMap} />;

export const AppShops: IStorybookComponent = () => (
    <CollectionTable titleTable="AppShops" collectionsSVG={collectionSVGAppShops} />
);

export const Bank: IStorybookComponent = () => (
    <CollectionTable titleTable="Bank" collectionsSVG={collectionSVGAppbank} />
);

export const Logo: IStorybookComponent = () => <CollectionTable titleTable="Logo" collectionsSVG={collectionSVGLogo} />;

export const PaymentSystems: IStorybookComponent = () => (
    <CollectionTable titleTable="PaymentSystems" collectionsSVG={collectionSVGPaymentSystems} />
);

export const SocialMedia: IStorybookComponent = () => (
    <CollectionTable titleTable="SocialMedia" collectionsSVG={collectionSVGSocialMedia} />
);
