import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Brick} from './Brick';
import {Modules} from '../modules';
import '../../assets/css/bundle.less';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Brick',
    component: Brick,
} as Meta;

export const Default: IStorybookComponent = () => {
    return (
        <Modules>
            <Modules.M>
                <div style={{backgroundColor: 'lightcoral'}}>Заголовок</div>
                <Brick />
                <div style={{backgroundColor: 'lightblue'}}>Сверху отступ 16 пикселей</div>
            </Modules.M>
        </Modules>
    );
};
Default.storyName = 'Default';

export const Custom: IStorybookComponent = () => {
    return (
        <Modules>
            <Modules.M>
                <div style={{backgroundColor: 'lightcoral'}}>Заголовок</div>
                <Brick size={2} />
                <div style={{backgroundColor: 'lightblue'}}>Сверху отступ 32 пикселя</div>
            </Modules.M>
        </Modules>
    );
};

Custom.storyName = 'Custom sizing';
