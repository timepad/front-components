import React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {List} from './List';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';

import {Button, ButtonVariant} from '../button';
import {IconPlus24} from '../../icons';
import {ThemeContainer} from '../utility/Modifiers';

import 'css/bundle.less';

export default {
    title: 'List',
    component: List,
} as Meta;

const Prefix: React.FC<React.PropsWithChildren<unknown>> = () => (
    <Button variant={ButtonVariant.secondary} icon={<IconPlus24 />} />
);
const Suffix: React.FC<React.PropsWithChildren<unknown>> = () => (
    <Button variant={ButtonVariant.secondary} icon={<IconPlus24 />} />
);

export const Menu: IStorybookComponent = () => {
    return (
        <ThemeContainer light={true}>
            <div style={{maxWidth: '320px'}}>
                <StoryTitle>Menu active element</StoryTitle>
                <List full={true} as={'nav'} size="lg">
                    <List.Group as={'a'} href={'#'} prefix={Prefix} suffix={Suffix}>
                        Главная
                    </List.Group>
                    <List.Item
                        active={true}
                        as={'a'}
                        href={'#'}
                        prefix={<IconPlus24 />}
                        suffix={<IconPlus24 />}
                        label={'События'}
                    />
                    <List.Item as={'a'} href={'#'} prefix={<IconPlus24 />}>
                        Рассылки
                    </List.Item>
                    <List.Item as={'button'} type={'button'} suffix={<IconPlus24 />}>
                        Участники
                    </List.Item>
                    <List.Item as={'a'} href={'#'}>
                        Организация
                    </List.Item>
                </List>
                <div className="lbrick-2" />
                <StoryTitle>Menu full</StoryTitle>
                <List full={true} size="lg">
                    <List.Item href={'#'} as={'a'}>
                        Главная
                    </List.Item>
                    <List.Item as={'a'} href={'#'} prefix={<IconPlus24 />} suffix={<IconPlus24 />} label={'События'} />
                    <List.Item as={'a'} href={'#'} prefix={<IconPlus24 />}>
                        Рассылки
                    </List.Item>
                    <List.Item as={'a'} href={'#'} suffix={<IconPlus24 />}>
                        Участники
                    </List.Item>
                    <List.Item href={'#'} as={'a'}>
                        Организация
                    </List.Item>
                </List>
                <div className="lbrick-2" />
                <StoryTitle>Menu Dark</StoryTitle>
                <List full={true} variant={'dark'} size={'lg'}>
                    <List.Item href={'#'} as={'a'}>
                        Главная
                    </List.Item>
                    <List.Item as={'a'} href={'#'} prefix={<IconPlus24 />} suffix={<IconPlus24 />} label={'События'} />
                    <List.Item as={'a'} href={'#'} prefix={<IconPlus24 />}>
                        Рассылки
                    </List.Item>
                    <List.Item as={'a'} href={'#'} suffix={<IconPlus24 />}>
                        Участники
                    </List.Item>
                    <List.Item href={'#'} as={'a'}>
                        Организация
                    </List.Item>
                </List>
                <div className="lbrick-2" />
                <StoryTitle>Menu Divider</StoryTitle>
                <List full={true} size="lg">
                    <List.Item href={'#'} as={'a'}>
                        Главная
                    </List.Item>
                    <List.Divider />
                    <List.Item as={'a'} href={'#'} prefix={<IconPlus24 />} suffix={<IconPlus24 />} label={'События'} />
                    <List.Divider />
                    <List.Item as={'a'} href={'#'} prefix={<IconPlus24 />}>
                        Рассылки
                    </List.Item>
                    <List.Divider />
                    <List.Item as={'a'} href={'#'} suffix={<IconPlus24 />}>
                        Участники
                    </List.Item>
                    <List.Divider />
                    <List.Item href={'#'} as={'a'}>
                        Организация
                    </List.Item>
                </List>
                <div className="lbrick-2" />
                <StoryTitle>Menu secondary text Font-Family InputSansNarrow font-size 15</StoryTitle>
                <List full={true} size="lg">
                    <List.Item as={'a'} href={'#'} secondaryText={'Secondary text'}>
                        Primary text
                    </List.Item>
                    <List.Item prefix={<IconPlus24 />} as={'a'} href={'#'} secondaryText={'Caption'}>
                        List item
                    </List.Item>
                    <List.Item suffix={<IconPlus24 />} as={'a'} href={'#'} secondaryText={'Secondary text'}>
                        Primary text
                    </List.Item>
                    <List.Item
                        prefix={<IconPlus24 />}
                        suffix={<IconPlus24 />}
                        as={'a'}
                        href={'#'}
                        secondaryText={'Secondary text'}
                    >
                        Primary text
                    </List.Item>
                </List>
                <StoryTitle>Menu secondary text Font-Family NeueHaasUnica font-size 15</StoryTitle>
                <List full={true} size="lg" fontFamily={'main'} fontSize={'lg'}>
                    <List.Item as={'a'} href={'#'} secondaryText={'Secondary text'}>
                        Primary text
                    </List.Item>
                    <List.Item prefix={<IconPlus24 />} as={'a'} href={'#'} secondaryText={'Caption'}>
                        List item
                    </List.Item>
                    <List.Item suffix={<IconPlus24 />} as={'a'} href={'#'} secondaryText={'Secondary text'}>
                        Primary text
                    </List.Item>
                    <List.Item
                        prefix={<IconPlus24 />}
                        suffix={<IconPlus24 />}
                        as={'a'}
                        href={'#'}
                        secondaryText={'Secondary text'}
                    >
                        Primary text
                    </List.Item>
                </List>
                <div className="lbrick-2" />
                <StoryTitle>Text position</StoryTitle>
                <List full={true} size="lg">
                    <List.Item href={'#'} as={'a'}>
                        Default
                    </List.Item>
                    <List.Item as={'a'} href={'#'} textPosition={'start'}>
                        Left
                    </List.Item>
                    <List.Item as={'a'} href={'#'} textPosition={'center'}>
                        Center
                    </List.Item>
                    <List.Item as={'a'} href={'#'} textPosition={'end'}>
                        Right
                    </List.Item>
                </List>
                <div className="lbrick-2" />
                <StoryTitle>Font-Family NeueHaasUnica</StoryTitle>
                <List full={true} size="lg" fontFamily={'main'}>
                    <List.Item href={'#'} as={'a'}>
                        Главная
                    </List.Item>
                    <List.Item href={'#'} as={'a'}>
                        События
                    </List.Item>
                    <List.Item href={'#'} as={'a'}>
                        Рассылки
                    </List.Item>
                    <List.Item href={'#'} as={'a'}>
                        Участники
                    </List.Item>
                </List>
                <div className="lbrick-2" />
            </div>
        </ThemeContainer>
    );
};
