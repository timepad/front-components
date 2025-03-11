import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent} from '../../services/helpers/storyBookHelpers';
import {IconsTable} from './IconsTable';
import {
    icons16,
    icons24,
    iconsAppbank,
    iconsAppShops,
    iconsLogo,
    iconsMap,
    iconsPaymentSystems,
    iconsSocialMedia,
} from './icons';

export default {
    title: 'Icons',
} as Meta;

export const Icon16: IStorybookComponent = () => <IconsTable titleTable="16" icons={icons16} />;

export const Icon24: IStorybookComponent = () => <IconsTable titleTable="24" icons={icons24} />;

export const Map: IStorybookComponent = () => <IconsTable titleTable="Map" icons={iconsMap} />;

export const AppShops: IStorybookComponent = () => <IconsTable titleTable="AppShops" icons={iconsAppShops} />;

export const Bank: IStorybookComponent = () => <IconsTable titleTable="Bank" icons={iconsAppbank} />;

export const Logo: IStorybookComponent = () => <IconsTable titleTable="Logo" icons={iconsLogo} />;

export const PaymentSystems: IStorybookComponent = () => (
    <IconsTable titleTable="PaymentSystems" icons={iconsPaymentSystems} />
);

export const SocialMedia: IStorybookComponent = () => <IconsTable titleTable="SocialMedia" icons={iconsSocialMedia} />;
