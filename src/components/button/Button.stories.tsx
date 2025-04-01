import React from 'react';

import {IconPlus24} from '../../icons';
import {Meta} from '@storybook/react/types-6-0';
import {Button, ButtonIconAlignment, ButtonVariant, SliderButton} from './index';
import {dummy, IStorybookComponent, Spacer, StoryTitle} from '../../services/helpers/storyBookHelpers';

import 'css/bundle.less';

export default {
    title: 'Button',
    component: Button,
} as Meta;

export const Primary: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Primary</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.primary} icon={<IconPlus24 />} />
                <Spacer />
                <Button variant={ButtonVariant.primary} label="Auto primary" />
                <Spacer />
                <Button variant={ButtonVariant.primary} label="Fixed primary" fixed />
                <Spacer />
                <Button
                    variant={ButtonVariant.primary}
                    label="Auto icon primary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.primary}
                    label="Auto icon primary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                />
            </div>
            <div className="lbrick-2" />
            <StoryTitle>Primary disabled</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.primary} icon={<IconPlus24 />} disabled />
                <Spacer />
                <Button variant={ButtonVariant.primary} label="Auto primary" disabled />
                <Spacer />
                <Button variant={ButtonVariant.primary} label="Fixed primary" fixed disabled />
                <Spacer />
                <Button
                    variant={ButtonVariant.primary}
                    label="Auto icon primary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    disabled
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.primary}
                    label="Auto icon primary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    disabled
                />
            </div>
        </>
    );
};

export const PrimaryLarge: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Primary large</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.primary} icon={<IconPlus24 />} large />
                <Spacer />
                <Button variant={ButtonVariant.primary} label="Auto primary" large />
                <Spacer />
                <Button variant={ButtonVariant.primary} label="Fixed primary" fixed large />
                <Spacer />
                <Button
                    variant={ButtonVariant.primary}
                    label="Auto icon primary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    large
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.primary}
                    label="Auto icon primary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    large
                />
            </div>
            <div className="lbrick-2" />
            <StoryTitle>Primary large disabled</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.primary} icon={<IconPlus24 />} large disabled />
                <Spacer />
                <Button variant={ButtonVariant.primary} label="Auto primary" large disabled />
                <Spacer />
                <Button variant={ButtonVariant.primary} label="Fixed primary" fixed large disabled />
                <Spacer />
                <Button
                    variant={ButtonVariant.primary}
                    label="Auto icon primary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    large
                    disabled
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.primary}
                    label="Auto icon primary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    large
                    disabled
                />
            </div>
        </>
    );
};
PrimaryLarge.storyName = 'Primary large';

export const Secondary: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Secondary</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.secondary} icon={<IconPlus24 />} />
                <Spacer />
                <Button variant={ButtonVariant.secondary} label="Auto secondary" />
                <Spacer />
                <Button variant={ButtonVariant.secondary} label="Fixed secondary" fixed />
                <Spacer />
                <Button
                    variant={ButtonVariant.secondary}
                    label="Auto icon secondary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.secondary}
                    label="Auto icon secondary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                />
            </div>
            <div className="lbrick-2" />
            <StoryTitle>Secondary disabled</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.secondary} icon={<IconPlus24 />} disabled />
                <Spacer />
                <Button variant={ButtonVariant.secondary} label="Auto secondary" disabled />
                <Spacer />
                <Button variant={ButtonVariant.secondary} label="Fixed secondary" fixed disabled />
                <Spacer />
                <Button
                    variant={ButtonVariant.secondary}
                    label="Auto icon secondary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    disabled
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.secondary}
                    label="Auto icon secondary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    disabled
                />
            </div>
        </>
    );
};

export const CustomColor: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Custom text color</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.secondary} icon={<IconPlus24 />} labelColor="red" />
                <Spacer />
                <Button variant={ButtonVariant.secondary} label="Auto secondary" labelColor="blue" />
                <Spacer />
                <Button variant={ButtonVariant.secondary} label="Fixed secondary" fixed labelColor="orange" />
                <Spacer />
                <Button
                    variant={ButtonVariant.secondary}
                    label="Auto icon secondary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    labelColor="green"
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.secondary}
                    label="Auto icon secondary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    labelColor="red"
                />
            </div>
            <div className="lbrick-2" />
            <StoryTitle>Custom text color disabled</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.secondary} icon={<IconPlus24 />} disabled labelColor="red" />
                <Spacer />
                <Button variant={ButtonVariant.secondary} label="Auto secondary" disabled labelColor="blue" />
                <Spacer />
                <Button variant={ButtonVariant.secondary} label="Fixed secondary" fixed disabled labelColor="orange" />
                <Spacer />
                <Button
                    variant={ButtonVariant.secondary}
                    label="Auto icon secondary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    disabled
                    labelColor="green"
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.secondary}
                    label="Auto icon secondary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    disabled
                    labelColor="red"
                />
            </div>
        </>
    );
};

CustomColor.storyName = 'Custom color';

export const SecondaryLarge: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Secondary large</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.secondary} icon={<IconPlus24 />} large />
                <Spacer />
                <Button variant={ButtonVariant.secondary} label="Auto secondary" large />
                <Spacer />
                <Button variant={ButtonVariant.secondary} label="Fixed secondary" fixed large />
                <Spacer />
                <Button
                    variant={ButtonVariant.secondary}
                    label="Auto icon secondary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    large
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.secondary}
                    label="Auto icon secondary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    large
                />
            </div>
            <div className="lbrick-2" />
            <StoryTitle>Secondary large disabled</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.secondary} icon={<IconPlus24 />} large disabled />
                <Spacer />
                <Button variant={ButtonVariant.secondary} label="Auto secondary" large disabled />
                <Spacer />
                <Button variant={ButtonVariant.secondary} label="Fixed secondary" fixed large disabled />
                <Spacer />
                <Button
                    variant={ButtonVariant.secondary}
                    label="Auto icon secondary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    large
                    disabled
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.secondary}
                    label="Auto icon secondary"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    large
                    disabled
                />
            </div>
        </>
    );
};
SecondaryLarge.storyName = 'Secondary large';

export const Stroke: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Stroke</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.stroke} icon={<IconPlus24 />} />
                <Spacer />
                <Button variant={ButtonVariant.stroke} label="Auto stroke" />
                <Spacer />
                <Button variant={ButtonVariant.stroke} label="Fixed stroke" fixed />
                <Spacer />
                <Button
                    variant={ButtonVariant.stroke}
                    label="Auto icon stroke"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.stroke}
                    label="Auto icon stroke"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                />
            </div>
            <div className="lbrick-2" />
            <StoryTitle>Stroke disabled</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.stroke} icon={<IconPlus24 />} disabled />
                <Spacer />
                <Button variant={ButtonVariant.stroke} label="Auto stroke" disabled />
                <Spacer />
                <Button variant={ButtonVariant.stroke} label="Fixed stroke" fixed disabled />
                <Spacer />
                <Button
                    variant={ButtonVariant.stroke}
                    label="Auto icon stroke"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    disabled
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.stroke}
                    label="Auto icon stroke"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    disabled
                />
            </div>
        </>
    );
};

export const StrokeLarge: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Stroke large</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.stroke} icon={<IconPlus24 />} large />
                <Spacer />
                <Button variant={ButtonVariant.stroke} label="Auto stroke" large />
                <Spacer />
                <Button variant={ButtonVariant.stroke} label="Fixed stroke" fixed large />
                <Spacer />
                <Button
                    variant={ButtonVariant.stroke}
                    label="Auto icon stroke"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    large
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.stroke}
                    label="Auto icon stroke"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    large
                />
            </div>
            <div className="lbrick-2" />
            <StoryTitle>Stroke large disabled</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.stroke} icon={<IconPlus24 />} large disabled />
                <Spacer />
                <Button variant={ButtonVariant.stroke} label="Auto stroke" large disabled />
                <Spacer />
                <Button variant={ButtonVariant.stroke} label="Fixed stroke" fixed large disabled />
                <Spacer />
                <Button
                    variant={ButtonVariant.stroke}
                    label="Auto icon stroke"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    large
                    disabled
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.stroke}
                    label="Auto icon stroke"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    large
                    disabled
                />
            </div>
        </>
    );
};
StrokeLarge.storyName = 'Stroke large';

export const Transparent: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Transparent</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.transparent} icon={<IconPlus24 />} />
                <Spacer />
                <Button variant={ButtonVariant.transparent} label="Auto transparent" />
                <Spacer />
                <Button variant={ButtonVariant.transparent} label="Fixed transparent" fixed />
                <Spacer />
                <Button
                    variant={ButtonVariant.transparent}
                    label="Auto icon transparent"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.transparent}
                    label="Auto icon transparent"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                />
            </div>
            <div className="lbrick-2" />
            <StoryTitle>Transparent disabled</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.transparent} icon={<IconPlus24 />} disabled />
                <Spacer />
                <Button variant={ButtonVariant.transparent} label="Auto transparent" disabled />
                <Spacer />
                <Button variant={ButtonVariant.transparent} label="Fixed transparent" fixed disabled />
                <Spacer />
                <Button
                    variant={ButtonVariant.transparent}
                    label="Auto icon transparent"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    disabled
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.transparent}
                    label="Auto icon transparent"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    disabled
                />
            </div>
        </>
    );
};

export const TransparentLarge: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Transparent large</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.transparent} icon={<IconPlus24 />} large />
                <Spacer />
                <Button variant={ButtonVariant.transparent} label="Auto transparent" large />
                <Spacer />
                <Button variant={ButtonVariant.transparent} label="Fixed transparent" fixed large />
                <Spacer />
                <Button
                    variant={ButtonVariant.transparent}
                    label="Auto icon transparent"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    large
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.transparent}
                    label="Auto icon transparent"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    large
                />
            </div>
            <div className="lbrick-2" />
            <StoryTitle>Transparent large disabled</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.transparent} icon={<IconPlus24 />} large disabled />
                <Spacer />
                <Button variant={ButtonVariant.transparent} label="Auto transparent" large disabled />
                <Spacer />
                <Button variant={ButtonVariant.transparent} label="Fixed transparent" fixed large disabled />
                <Spacer />
                <Button
                    variant={ButtonVariant.transparent}
                    label="Auto icon transparent"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    large
                    disabled
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.transparent}
                    label="Auto icon transparent"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    large
                    disabled
                />
            </div>
        </>
    );
};
TransparentLarge.storyName = 'Transparent large';

export const TransparentWithHoverLabel: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Transparent with hover label</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.transparent} icon={<IconPlus24 />} hoverLabel="Hover text" />
                <Spacer />
                <Button variant={ButtonVariant.transparent} label="Auto transparent" hoverLabel="Hover text" />
                <Spacer />
                <Button variant={ButtonVariant.transparent} label="Fixed transparent" hoverLabel="Hover text" fixed />
                <Spacer />
                <Button
                    variant={ButtonVariant.transparent}
                    label="Auto icon transparent"
                    hoverLabel="Hover text"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.transparent}
                    label="Auto icon transparent"
                    hoverLabel="Hover text"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                />
            </div>
            <div className="lbrick-2" />
            <StoryTitle>Transparent with hover label disabled</StoryTitle>
            <div className="lflex">
                <Button variant={ButtonVariant.transparent} icon={<IconPlus24 />} disabled />
                <Spacer />
                <Button variant={ButtonVariant.transparent} label="Auto transparent" disabled />
                <Spacer />
                <Button variant={ButtonVariant.transparent} label="Fixed transparent" fixed disabled />
                <Spacer />
                <Button
                    variant={ButtonVariant.transparent}
                    label="Auto icon transparent"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.left}
                    disabled
                />
                <Spacer />
                <Button
                    variant={ButtonVariant.transparent}
                    label="Auto icon transparent"
                    icon={<IconPlus24 />}
                    iconAlignment={ButtonIconAlignment.right}
                    disabled
                />
            </div>
        </>
    );
};
TransparentWithHoverLabel.storyName = 'Transparent with hover label';

export const Tumbler: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Tumbler</StoryTitle>
            <div className="lflex">
                <SliderButton value={true} onChange={dummy} />
                <Spacer />
                <SliderButton value={false} onChange={dummy} />
            </div>
            <div className="lbrick-2" />
            <StoryTitle>Tumbler disabled</StoryTitle>
            <div className="lflex">
                <SliderButton value={true} onChange={dummy} disabled />
                <Spacer />
                <SliderButton value={false} onChange={dummy} disabled />
            </div>
        </>
    );
};
