import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import 'css/bundle.less';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Tooltip} from './Tooltip';

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
                <Tooltip message={'Подсказка к тексту'} width={180} style={{color: 'red'}}>
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
                <Tooltip message={'Бхутавад - какой-то чувак'} width={220} style={{color: 'red'}}>
                    Бхутавад
                </Tooltip>
                , следовательно, принимает во внимание типичный смысл жизни.
            </p>

            <StoryTitle>Second Tooltip Example</StoryTitle>
            <div style={{display: 'flex', margin: '0 auto', justifyContent: 'center'}}>
                <Tooltip message={'Текст в котором подробно рассказанопроисходящем на экране'} style={{color: 'red'}}>
                    <div style={{borderRadius: '50%', width: '15px', height: '15px', backgroundColor: '#ccc'}} />
                </Tooltip>
            </div>
        </>
    );
};
