import * as React from 'react';
import {FC} from 'react';
import '../../assets/css/bundle.less';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Grid} from './Grid';
import {Typography} from '../typography';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Grid',
    component: Grid,
};

const Child: React.FC<React.PropsWithChildren<unknown>> = () => (
    <div style={{width: '100%', height: '100px', backgroundColor: 'blue'}} />
);
const ChildRed: React.FC<React.PropsWithChildren<unknown>> = () => (
    <div style={{width: '100%', height: '100px', backgroundColor: 'red'}} />
);

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Default Grid</StoryTitle>
            <Typography.Body>
                Для тестирования Grid для tablet, mobile, необходимо открыть инструменты разработчика и выбрать нужное
                вам устройство
            </Typography.Body>
            <Grid>
                <Grid.Col desktop={3} tablet={1}>
                    <Child />
                </Grid.Col>
                <Grid.Col desktop={6} tablet={4}>
                    <ChildRed />
                </Grid.Col>
                <Grid.Col desktop={3} tablet={1}>
                    <Child />
                </Grid.Col>
            </Grid>
        </>
    );
};
Default.storyName = 'Default';
