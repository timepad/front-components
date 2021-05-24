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

const Prefix: React.FC = () => <Button variant={ButtonVariant.secondary} icon={<AddIcon />} />;
const Suffix: React.FC = () => <Button variant={ButtonVariant.secondary} icon={<AddIcon />} />;

export const Menu: IStorybookComponent = () => {
    return (
        <Theme light={true}>
            <StoryTitle>Menu</StoryTitle>
            <List as={'nav'}>
                <List.Group as={'a'} href={'#'} prefix={Prefix} suffix={Suffix}>
                    Главная
                </List.Group>
                <List.Item as={'a'} href={'#'} prefix={<AddIcon />} suffix={<AddIcon />} label={'События'} />
                <List.Item prefix={<AddIcon />}>Рассылки</List.Item>
                <List.Item as={'button'} type={'button'} suffix={<AddIcon />}>
                    Участники
                </List.Item>
                <List.Item as={'a'} href={'#'}>
                    Организация
                </List.Item>
            </List>
            <div className="lbrick-2" />
            <StoryTitle>Menu full</StoryTitle>
            <List full={true}>
                <List.Item>Главная</List.Item>
                <List.Item as={'a'} href={'#'} prefix={<AddIcon />} suffix={<AddIcon />} label={'События'} />
                <List.Item prefix={<AddIcon />}>Рассылки</List.Item>
                <List.Item suffix={<AddIcon />}>Участники</List.Item>
                <List.Item href={'#'} as={'a'}>
                    Организация
                </List.Item>
            </List>
            <div className="lbrick-2" />
            <StoryTitle>Menu Dark</StoryTitle>
            <List variant={'dark'} size={'lg'}>
                <List.Item>Главная</List.Item>
                <List.Item as={'a'} href={'#'} prefix={<AddIcon />} suffix={<AddIcon />} label={'События'} />
                <List.Item prefix={<AddIcon />}>Рассылки</List.Item>
                <List.Item suffix={<AddIcon />}>Участники</List.Item>
                <List.Item href={'#'} as={'a'}>
                    Организация
                </List.Item>
            </List>
            <div className="lbrick-2" />
            <StoryTitle>Menu Divider</StoryTitle>
            <List size="lg">
                <List.Item>Главная</List.Item>
                <List.Divider />
                <List.Item as={'a'} href={'#'} prefix={<AddIcon />} suffix={<AddIcon />} label={'События'} />
                <List.Divider />
                <List.Item prefix={<AddIcon />}>Рассылки</List.Item>
                <List.Divider />
                <List.Item suffix={<AddIcon />}>Участники</List.Item>
                <List.Divider />
                <List.Item href={'#'} as={'a'}>
                    Организация
                </List.Item>
            </List>
            <div className="lbrick-2" />
            <StoryTitle>Menu secondary text</StoryTitle>
            <List size="lg">
                <List.Item as={'a'} href={'#'} secondaryText={'Наша супер главная страница'}>
                    Главная
                </List.Item>
            </List>
            <div className="lbrick-2" />
            <StoryTitle>Text position</StoryTitle>
            <List full={true}>
                <List.Item>Default</List.Item>
                <List.Item textPosition={'start'}>Left</List.Item>
                <List.Item textPosition={'center'}>Center</List.Item>
                <List.Item textPosition={'end'}>Right</List.Item>
            </List>
            <div className="lbrick-2" />
        </Theme>
    );
};
