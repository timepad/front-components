import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import {Carousel} from './Carousel';
import {Slide} from './Slide';

export default {
    title: 'Carousel',
    component: Carousel,
} as Meta;

export const CarouselDefault: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Carousel</StoryTitle>
            <Carousel>
                {Array(20)
                    .fill(true)
                    .map(({}, index) => {
                        return (
                            <Slide key={index}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'burlywood',
                                        width: 260,
                                        height: 200,
                                        margin: '0 5px',
                                    }}
                                >
                                    <div>{index}</div>
                                </div>
                            </Slide>
                        );
                    })}
            </Carousel>
        </>
    );
};
