import {Meta} from '@storybook/react/types-6-0';
import {PageHeader} from './index';
import {IStorybookComponent} from '../../services/helpers/storyBookHelpers';
import React from 'react';
import {IPageHeaderProps} from './PageHeader';
import {Brick, Button, ButtonVariant} from 'index';
import Typography from '../typography/Typography';

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

const HeaderVariansLongContent: IPageHeaderProps[] = [
    {
        label: Label,
        children: [
            SecondaryButton,
            MainButton,
            SecondaryButton,
            MainButton,
            SecondaryButton,
            MainButton,
            SecondaryButton,
        ],
    },
    {
        label: 'A veryveryveryveryveryveryveryvery looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong label',
        caption: Caption,
    },
    {
        label: 'A very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong label',
        caption: Caption,
        children: [SecondaryButton, MainButton],
    },
    {
        label: (
            <Typography variant="header" fontWeight="bold" className="dsadas">
                A veryveryveryveryveryveryveryvery
                looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong label
            </Typography>
        ),
        caption: Caption,
        children: [SecondaryButton, MainButton],
    },
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

export const TooLongContent: IStorybookComponent = () => {
    return (
        <>
            {HeaderVariansLongContent.map((el, index) => (
                <>
                    <PageHeader key={index} {...el} />
                    <Brick size={2} />
                </>
            ))}
        </>
    );
};
