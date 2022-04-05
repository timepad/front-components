import {Meta} from '@storybook/react/types-6-0';
import {PageHeader} from './index';
import {IStorybookComponent} from '../../services/helpers/storyBookHelpers';
import React from 'react';
import {IPageHeaderProps} from './PageHeader';
import {Button, ButtonVariant} from 'index';

export default {
    title: 'Page Header',
    component: PageHeader,
} as Meta;

const MainButton = <Button>Main button</Button>;
const SecondaryButton = <Button variant={ButtonVariant.secondary}>Secondary button</Button>;
const Label = 'Page Header';
const Caption = 'Status text';
const onBackClick = () => {
    window.alert('Back button is cliked');
};

const HeaderVariansWithoutBack: IPageHeaderProps[] = [
    {label: Label},
    {label: Label, children: [MainButton]},
    {label: Label, children: [SecondaryButton, MainButton]},
    {label: Label, caption: Caption, children: [SecondaryButton, MainButton]},
    {label: Label, caption: Caption},
];

const HeaderVariansWithBack: IPageHeaderProps[] = [
    {label: Label, children: [SecondaryButton, MainButton], onBackClick},
    {label: Label, caption: Caption, children: [SecondaryButton, MainButton], onBackClick},
    {label: Label, onBackClick},
    {label: Label, caption: Caption, onBackClick},
];

export const WithoutBackButton: IStorybookComponent = () => {
    return (
        <>
            {HeaderVariansWithoutBack.map((el, index) => (
                <PageHeader key={index} {...el} />
            ))}
        </>
    );
};

export const WithBackButton: IStorybookComponent = () => {
    return (
        <>
            {HeaderVariansWithBack.map((el, index) => (
                <PageHeader key={index} {...el} />
            ))}
        </>
    );
};
