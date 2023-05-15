import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Modules} from '../modules';
import '../../assets/css/bundle.less';
import {Divider} from './Divider';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Divider',
    component: Divider,
} as Meta;

export const Default: IStorybookComponent = () => {
    return (
        <Modules>
            <Modules.M>
                <div>Заголовок</div>
                <Divider />
                <div>Сверху отступ 16 пикселей</div>
            </Modules.M>
        </Modules>
    );
};

export const VerticalWithMargin: IStorybookComponent = () => {
    return (
        <Modules>
            <Modules.M>
                <div style={{display: 'flex'}}>
                    <div>Divider имеет левый и</div>
                    <Divider vertical margin={[0, 5]} />
                    <div>правый margin по 5px</div>
                </div>
            </Modules.M>
        </Modules>
    );
};

export const DefaultWithMargin: IStorybookComponent = () => {
    return (
        <Modules>
            <Modules.M>
                <div>Divider имеет верхний и</div>
                <Divider margin={[5, 0]} />
                <div>нижний margin по 5px</div>
            </Modules.M>
        </Modules>
    );
};

export const VerticalAsSpan: IStorybookComponent = () => {
    return (
        <Modules>
            <Modules.M>
                <span>Divider обозначен через тег span</span>
                <Divider vertical as="span" margin={5} />
                <span>и имеет margin 5px</span>
            </Modules.M>
        </Modules>
    );
};
