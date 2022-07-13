import React from 'react';
import {Footer} from './Footer';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Footer',
    components: Footer,
} as Meta;

export const FooterStories: IStorybookComponent = () => {
    return (
        <div>
            <Footer />
        </div>
    );
};

FooterStories.storyName = 'Page Footer';
