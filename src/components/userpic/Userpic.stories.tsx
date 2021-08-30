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
                <Pic border mode="light" />
                <Spacer />
                <Pic />
                <Spacer />
                <Pic border mode="dark" />
            </div>
            <Brick />
            <StoryTitle>Same basic Pic with click handler or just hover effect</StoryTitle>
            <div className="lflex">
                <Pic border mode="light" onClick={clickCb} />
                <Spacer />
                <Pic hoverable />
                <Spacer />
                <Pic border mode="dark" hoverable />
            </div>
            <Brick />
            <StoryTitle>Same basic Pic with image, first symbol of name.</StoryTitle>
            <div className="lflex">
                <Pic
                    imgURL="https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg"
                    hoverable
                />
                <Spacer />
                <Pic label="Avatar" mode="light" hoverable />
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
                <Pic size="S" hoverable />
                <Spacer />
                <Pic size="S" label={label} hoverable />
                <Spacer />
                <Pic size="S" imgURL={imageUrl} hoverable />
                <Spacer />
                <Pic size="S" hoverable square />
                <Spacer />
                <Pic size="S" label={label} hoverable square />
                <Spacer />
                <Pic size="S" imgURL={imageUrl} hoverable square />
            </div>
            <Brick size={2} />

            <StoryTitle>Icon in size M</StoryTitle>
            <div className="lflex">
                <Pic size="M" hoverable />
                <Spacer />
                <Pic size="M" label={label} hoverable />
                <Spacer />
                <Pic size="M" imgURL={imageUrl} hoverable />
                <Spacer />
                <Pic size="M" hoverable square />
                <Spacer />
                <Pic size="M" label={label} hoverable square />
                <Spacer />
                <Pic size="M" imgURL={imageUrl} hoverable square />
            </div>
            <Brick size={2} />

            <StoryTitle>Icon in size L</StoryTitle>
            <div className="lflex">
                <Pic size="L" hoverable />
                <Spacer />
                <Pic size="L" label={label} hoverable />
                <Spacer />
                <Pic size="L" imgURL={imageUrl} hoverable />
                <Spacer />
                <Pic size="L" hoverable square />
                <Spacer />
                <Pic size="L" label={label} hoverable square />
                <Spacer />
                <Pic size="L" imgURL={imageUrl} hoverable square />
            </div>
            <Brick size={2} />

            <StoryTitle>Icon in size XL</StoryTitle>
            <div className="lflex">
                <Pic size="XL" hoverable />
                <div style={{minWidth: 32}} />
                <Pic size="XL" label={label} hoverable />
                <div style={{minWidth: 32}} />
                <Pic size="XL" imgURL={imageUrl} hoverable />
                <div style={{minWidth: 32}} />
                <Pic size="XL" hoverable square />
                <div style={{minWidth: 32}} />
                <Pic size="XL" label={label} hoverable square />
                <div style={{minWidth: 32}} />
                <Pic size="XL" imgURL={imageUrl} hoverable square />
            </div>
            <Brick size={2} />
        </>
    );
};
PicSizes.storyName = 'Pic sizes';
