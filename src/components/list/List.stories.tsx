import React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {List} from './index';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';

import {Button, ButtonVariant} from '../button';
import AddIcon from 'svg/24/icon-plus-24.svg';
import {Theme} from '../utility/Modifiers';

import 'css/bundle.less';

export default {
    title: 'List',
    component: List,
} as Meta;

const Prefix = () => <Button variant={ButtonVariant.secondary} icon={<AddIcon />} />;
const Suffix = () => <Button variant={ButtonVariant.secondary} icon={<AddIcon />} />;

export const Menu: IStorybookComponent = () => {
    return (
        <Theme light={true}>
            <StoryTitle>Menu</StoryTitle>
            <List as={'nav'}>
                <List.Item>Главная</List.Item>
                <List.Item as={'a'} href={'#'} prefix={Prefix} suffix={Suffix} label={'События'} />
                <List.Item prefix={Prefix}>Рассылки</List.Item>
                <List.Item as={'button'} type={'button'} suffix={Suffix}>
                    Участники
                </List.Item>
                <List.Item href={'#'} as={'a'}>
                    Организация
                </List.Item>
            </List>
            <div className="lbrick-2" />
            <StoryTitle>Menu full</StoryTitle>
            <List full={true}>
                <List.Item>Главная</List.Item>
                <List.Item as={'a'} href={'#'} prefix={Prefix} suffix={Suffix} label={'События'} />
                <List.Item prefix={Prefix}>Рассылки</List.Item>
                <List.Item suffix={Suffix}>Участники</List.Item>
                <List.Item href={'#'} as={'a'}>
                    Организация
                </List.Item>
            </List>
            <div className="lbrick-2" />
            <StoryTitle>Menu Dark</StoryTitle>
            <List mod={'dark'}>
                <List.Item>Главная</List.Item>
                <List.Item as={'a'} href={'#'} prefix={Prefix} suffix={Suffix} label={'События'} />
                <List.Item prefix={Prefix}>Рассылки</List.Item>
                <List.Item suffix={Suffix}>Участники</List.Item>
                <List.Item href={'#'} as={'a'}>
                    Организация
                </List.Item>
            </List>
            <div className="lbrick-2" />
            <StoryTitle>Menu Divider</StoryTitle>
            <List>
                <List.Item>Главная</List.Item>
                <List.Divider />
                <List.Item as={'a'} href={'#'} prefix={Prefix} suffix={Suffix} label={'События'} />
                <List.Divider />
                <List.Item prefix={Prefix}>Рассылки</List.Item>
                <List.Divider />
                <List.Item suffix={Suffix}>Участники</List.Item>
                <List.Divider />
                <List.Item href={'#'} as={'a'}>
                    Организация
                </List.Item>
            </List>
        </Theme>
    );
};
