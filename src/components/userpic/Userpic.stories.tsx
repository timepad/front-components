import * as React from 'react';
import {StoryTitle, Spacer, IStorybookComponent} from '../../services/helpers/storyBookHelpers';
import {Pic} from './Pic';
import {Meta} from '@storybook/react/types-6-0';
import {Brick} from '../brick';

export default {
    title: 'Pics',
    component: Pic,
} as Meta;

export const Basic: IStorybookComponent = () => {
    const clickCb = () => alert('Pic clicked');

    return (
        <>
            <StoryTitle>Basic Pic. Modes: light, standart, dark. With border and borderless.</StoryTitle>
            <div className="lflex">
                <Pic bordered />
                <Spacer />
                <Pic />
                <Spacer />
                <Pic bordered />
                <Spacer />
                <Pic bordered label="A" />
                <Spacer />
                <Pic label="B" />
                <Spacer />
                <Pic bordered label="c" />
                <Spacer />

                <div style={{background: 'black', padding: '20px'}}>
                    <Pic bordered />
                </div>
            </div>
            <Brick />
            <StoryTitle>Same basic Pic with click handler or just hover effect.</StoryTitle>
            <div className="lflex">
                <Pic bordered onClick={clickCb} />
                <Spacer />
                <Pic hoverable />
                <Spacer />
                <Pic bordered hoverable />
            </div>
            <Brick />
            <StoryTitle>Same basic Pic with image, first symbol of name.</StoryTitle>
            <div className="lflex">
                <Pic
                    imgURL="https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg"
                    hoverable
                />
                <Spacer />
                <Pic label="Avatar" hoverable />
                <Spacer />
                <div style={{background: 'black', padding: '20px'}}>
                    <Pic
                        imgURL="https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg"
                        hoverable
                    />
                </div>
                <Spacer />
                <div style={{background: 'black', padding: '20px'}}>
                    <Pic label="Avatar" hoverable />
                </div>
                <Spacer />
            </div>
        </>
    );
};
Basic.storyName = 'Basic Pic';

export const PicSizes: IStorybookComponent = () => {
    const imageUrl =
        'https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg';
    const label = 'Simon';

    return (
        <>
            <StoryTitle>Default icon (size 32x32px)</StoryTitle>
            <div className="lflex">
                <Pic hoverable />
                <Spacer />
                <Pic label={label} hoverable />
                <Spacer />
                <Pic imgURL={imageUrl} hoverable />
                <Spacer />
                <Pic hoverable square />
                <Spacer />
                <Pic label={label} hoverable square />
                <Spacer />
                <Pic imgURL={imageUrl} hoverable square />
            </div>
            <Brick size={2} />

            <StoryTitle>Icon in size S</StoryTitle>
            <div className="lflex">
                <Pic size="s" hoverable />
                <Spacer />
                <Pic size="s" label={label} hoverable />
                <Spacer />
                <Pic size="s" imgURL={imageUrl} hoverable />
                <Spacer />
                <Pic size="s" hoverable square />
                <Spacer />
                <Pic size="s" label={label} hoverable square />
                <Spacer />
                <Pic size="s" imgURL={imageUrl} hoverable square />
            </div>
            <Brick size={2} />

            <StoryTitle>Icon in size M</StoryTitle>
            <div className="lflex">
                <Pic size="m" hoverable />
                <Spacer />
                <Pic size="m" label={label} hoverable />
                <Spacer />
                <Pic size="m" imgURL={imageUrl} hoverable />
                <Spacer />
                <Pic size="m" hoverable square />
                <Spacer />
                <Pic size="m" label={label} hoverable square />
                <Spacer />
                <Pic size="m" imgURL={imageUrl} hoverable square />
            </div>
            <Brick size={2} />

            <StoryTitle>Icon in size MS</StoryTitle>
            <div className="lflex">
                <Pic size="ml" hoverable />
                <Spacer />
                <Pic size="ml" label={label} hoverable />
                <Spacer />
                <Pic size="ml" imgURL={imageUrl} hoverable />
                <Spacer />
                <Pic size="ml" hoverable square />
                <Spacer />
                <Pic size="ml" label={label} hoverable square />
                <Spacer />
                <Pic size="ml" imgURL={imageUrl} hoverable square />
            </div>
            <Brick size={2} />

            <StoryTitle>Icon in size L</StoryTitle>
            <div className="lflex">
                <Pic size="l" hoverable />
                <Spacer />
                <Pic size="l" label={label} hoverable />
                <Spacer />
                <Pic size="l" imgURL={imageUrl} hoverable />
                <Spacer />
                <Pic size="l" hoverable square />
                <Spacer />
                <Pic size="l" label={label} hoverable square />
                <Spacer />
                <Pic size="l" imgURL={imageUrl} hoverable square />
            </div>
            <Brick size={2} />

            <StoryTitle>Icon in size XL</StoryTitle>
            <div className="lflex">
                <Pic size="xl" hoverable />
                <div style={{minWidth: 32}} />
                <Pic size="xl" label={label} hoverable />
                <div style={{minWidth: 32}} />
                <Pic size="xl" imgURL={imageUrl} hoverable />
                <div style={{minWidth: 32}} />
                <Pic size="xl" hoverable square />
                <div style={{minWidth: 32}} />
                <Pic size="xl" label={label} hoverable square />
                <div style={{minWidth: 32}} />
                <Pic size="xl" imgURL={imageUrl} hoverable square />
            </div>
            <Brick size={2} />
        </>
    );
};
PicSizes.storyName = 'Pic sizes';
