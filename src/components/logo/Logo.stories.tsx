import React, {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';

import {Logo} from './Logo';
import '../../assets/css/bundle.less';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Logo',
    component: Logo,
} as Meta;

export const FullLogo: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Full Logo</StoryTitle>
            <Logo />
        </>
    );
};
FullLogo.storyName = 'FullLogo';

export const ShortLogo: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Short Logo</StoryTitle>
            <Logo short />
        </>
    );
};
ShortLogo.storyName = 'ShortLogo';
