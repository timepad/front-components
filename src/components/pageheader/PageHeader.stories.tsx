import {Meta} from '@storybook/react/types-6-0';
import {PageHeader} from './index';
import {IStorybookComponent} from '../../services/helpers/storyBookHelpers';
import React from 'react';
import Typography from '../typography/Typography';

export default {
    title: 'Page Header',
    component: PageHeader,
} as Meta;

export const Test3: IStorybookComponent = () => {
    return (
        <PageHeader label="Page Header" caption="Status text">
            {/*<Button variant={ButtonVariant.secondary}>Secondary button</Button>*/}
            {/*<Button>Main button</Button>*/}
        </PageHeader>
    );
};

export const Test2: IStorybookComponent = () => {
    return <PageHeader label={<Typography variant="lead">Page Header</Typography>} />;
};
