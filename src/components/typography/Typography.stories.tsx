import React from 'react';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Meta} from '@storybook/react/types-6-0';
import Typography from './Typography';

import 'css/bundle.less';

export default {
    title: 'Typography',
    component: Typography,
} as Meta;

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Typography</StoryTitle>
            <Typography.Header>Header 32-32</Typography.Header>
            <Typography.Header responsive>Header responsive 32-32</Typography.Header>
            <Typography.Subheader>Subheader 32–32</Typography.Subheader>
            <Typography.Subheader size={24}>Subheader 24–24</Typography.Subheader>
            <Typography.Subheader size={24} responsive>
                Subheader responsive 24–24
            </Typography.Subheader>
            <Typography.Lead>Lead 32–32</Typography.Lead>
            <Typography.Lead responsive>Lead responsive 32–32</Typography.Lead>
            <Typography.Lead size={24}>Lead 24–24</Typography.Lead>
            <Typography.Lead size={24} responsive>
                Lead responsive 24–24
            </Typography.Lead>
            <Typography.Body>Body 32–32</Typography.Body>
            <Typography.Body size={24}>Body 24–24</Typography.Body>
            <Typography.Body size={16}>Body 16–16</Typography.Body>
            <Typography.Caption>Caption 16–16</Typography.Caption>
            <Typography.Small>Small 16–16</Typography.Small>
            <Typography.Small size={8}>Small 8–8</Typography.Small>
            <hr />
            <Typography.Multiple text="Body 16-16" caption="Small 16-16" />
            <Typography.Multiple text="Body 16-16" caption="Small 16-16" reverse />
        </>
    );
};
