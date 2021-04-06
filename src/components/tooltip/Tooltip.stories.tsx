import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import 'css/bundle.less';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Tooltip} from './Tooltip';
import {Button, ButtonVariant} from '../button';
import AddIcon from 'svg/24/icon-plus-24.svg';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Tooltip',
    component: Tooltip,
} as Meta;

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>First Tooltip Example</StoryTitle>
            <p>
                <h2> Реферат по философии</h2>
                <br />
                <b>Тема: «Почему поразительно освобождение?»</b>
                <br />
                Конфликт, как следует из{' '}
                <Tooltip message={'Подсказка к тексту'} style={{color: 'red'}}>
                    вышесказанного
                </Tooltip>
                , прост. Ощущение мира категорически контролирует сложный бабувизм. Врожденная интуиция откровенна.
                Актуализация, следовательно, контролирует субъективный принцип восприятия. Дуализм преобразует
                сенсибельный катарсис. Позитивизм заполняет знак. Концепция, как принято считать, нетривиальна.
                <Tooltip
                    message={
                        'Позитиви́зм (фр. positivisme, от лат. positivus — положительный) — философское учение и направление в методологии науки, определяющее единственным источником истинного, действительного знания эмпирические исследования и отрицающее познавательную ценность философского исследования.'
                    }
                    style={{color: 'red'}}
                >
                    Позитивизм
                </Tooltip>
                ясен не всем.{' '}
                <Tooltip message={'Бхутавад - какой-то чувак'} style={{color: 'red'}}>
                    Бхутавад
                </Tooltip>
                , следовательно, принимает во внимание типичный смысл жизни.
            </p>

            <StoryTitle>Second Tooltip Example</StoryTitle>
            <Tooltip message={'Текст в котором подробно рассказанопроисходящем на экране'} style={{color: 'red'}}>
                <Button variant={ButtonVariant.primary} label="Click me" icon={<AddIcon />} />
            </Tooltip>
        </>
    );
};
