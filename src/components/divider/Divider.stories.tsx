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
