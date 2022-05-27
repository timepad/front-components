import React from 'react';
import {Footer} from './Footer';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IFooterLinksItem} from './FooterLinks';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Footer',
    components: Footer,
} as Meta;

const links: Array<IFooterLinksItem> = [
    {
        title: 'Афиша событий',
        items: ['Найти событие', 'Рекомендуемое', 'Подписки'],
    },
    {
        title: 'Организаторам',
        items: ['Создать событие', 'Возможности', 'Тарифы', 'Реклама'],
    },
    {
        title: 'Timepad',
        items: ['О нас', 'Блог', 'Вакансии', 'Контакты', 'Документы'],
    },
    {
        title: 'Помощь',
        items: ['Задать вопрос', 'База знаний', 'Разработчикам'],
    },
];

export const FooterStories: IStorybookComponent = () => {
    return (
        <div>
            <Footer links={links} />
        </div>
    );
};

FooterStories.storyName = 'Page Footer';
