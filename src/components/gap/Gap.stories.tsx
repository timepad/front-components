import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Gap} from './Gap';
import {Button} from '../button';
import {Modules} from '../modules';
import '../../assets/css/bundle.less';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Gap',
    component: Gap,
} as Meta;

export const Default: IStorybookComponent = () => {
    return (
        <Modules>
            <Modules.M className="lflex">
                <Button>Кнопка</Button>
                <Gap />
                <span style={{backgroundColor: 'lightblue'}}>Отступ слева 16 пикселей</span>
            </Modules.M>
        </Modules>
    );
};
Default.storyName = 'Default';

export const Custom: IStorybookComponent = () => {
    return (
        <Modules>
            <Modules.M className="lflex">
                <Button>Кнопка</Button>
                <Gap size={2} />
                <span style={{backgroundColor: 'lightblue'}}>Отступ слева 32 пикселя</span>
            </Modules.M>
        </Modules>
    );
};

Custom.storyName = 'Custom sizing';
