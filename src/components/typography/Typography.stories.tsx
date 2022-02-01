import React from 'react';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Meta} from '@storybook/react/types-6-0';
import Typography from './Typography';

import 'css/bundle.less';
import {Brick} from 'index';

export default {
    title: 'Typography',
    component: Typography,
} as Meta;

export const Default: IStorybookComponent = () => {
    return (
        <div>
            <StoryTitle>Typography</StoryTitle>
            <div style={{backgroundColor: 'black', padding: '16px'}}>
                <Typography.Header style={{backgroundColor: 'white'}}>Header 32-32</Typography.Header>
                <Brick size={0.5} />
                <Typography.Header style={{backgroundColor: 'white'}} responsive>
                    Header responsive 32-32(32-36)
                </Typography.Header>
                <Brick size={0.5} />
                <Typography.Subheader style={{backgroundColor: 'white'}}>Subheader 32–32</Typography.Subheader>
                <Brick size={0.5} />
                <Typography.Subheader responsive style={{backgroundColor: 'white'}}>
                    Subheader responsive 32–32(24-28)
                </Typography.Subheader>
                <Brick size={0.5} />
                <Typography.Subheader size={24} style={{backgroundColor: 'white'}}>
                    Subheader 24–24
                </Typography.Subheader>
                <Brick size={0.5} />
                <Typography.Subheader size={24} responsive style={{backgroundColor: 'white'}}>
                    Subheader responsive 24–24(24-28)
                </Typography.Subheader>
                <Brick size={0.5} />
                <Typography.Lead style={{backgroundColor: 'white'}}>Lead 32–32</Typography.Lead>
                <Brick size={0.5} />
                <Typography.Lead responsive style={{backgroundColor: 'white'}}>
                    Lead responsive 32–32(20-26)
                </Typography.Lead>
                <Brick size={0.5} />
                <Typography.Lead size={24} style={{backgroundColor: 'white'}}>
                    Lead 24–24
                </Typography.Lead>
                <Brick size={0.5} />
                <Typography.Lead size={24} responsive style={{backgroundColor: 'white'}}>
                    Lead responsive 24–24(20-26)
                </Typography.Lead>
                <Brick size={0.5} />
                <Typography.Body style={{backgroundColor: 'white'}}>Body 32–32</Typography.Body>
                <Brick size={0.5} />
                <Typography.Body size={24} style={{backgroundColor: 'white'}}>
                    Body 24–24
                </Typography.Body>
                <Brick size={0.5} />
                <Typography.Body size={16} style={{backgroundColor: 'white'}}>
                    Body 16–16
                </Typography.Body>
                <Brick size={0.5} />
                <Typography.Caption style={{backgroundColor: 'white'}}>Caption 16–16</Typography.Caption>
                <Brick size={0.5} />
                <Typography.Small style={{backgroundColor: 'white'}}>Small 16–16</Typography.Small>
                <Brick size={0.5} />
                <Typography.Small size={8} style={{backgroundColor: 'white'}}>
                    Small 8–8
                </Typography.Small>
            </div>

            <hr className="cdivider" />
            <div style={{backgroundColor: 'black', padding: '16px'}}>
                <Typography.Multiple text="Body 16-16" caption="Small 16-16" style={{backgroundColor: 'white'}} />
                <Brick size={0.5} />
                <Typography.Multiple
                    text="Body 16-16"
                    caption="Small 16-16"
                    reverse
                    style={{backgroundColor: 'white'}}
                />
            </div>
        </div>
    );
};
