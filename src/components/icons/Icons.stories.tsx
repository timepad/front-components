import * as React from 'react';
import {StoryTitle, IStorybookComponent} from '../../services/helpers/storyBookHelpers';
import {Icon} from './Icons';
import {Meta} from '@storybook/react/types-6-0';
import * as IconNames from '../../icons';

export default {
    title: 'Icons',
    component: Icon,
} as Meta;

const arrIcons: any[] = [];
for (const item in IconNames) {
    arrIcons.push(IconNames[item]);
}

export const Icons24: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Basic Icons 24.</StoryTitle>
            <div className="lgrid">
                {arrIcons
                    .filter((el) => el.name.includes('24'))
                    .map((Item, ind) => (
                        <Icon key={ind} iconName={Item.name}>
                            <Item />
                        </Icon>
                    ))}
            </div>
        </>
    );
};

Icons24.storyName = 'Basic icons 24';

export const Icons16: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Basic Icons 16.</StoryTitle>
            <div className="lgrid">
                {arrIcons
                    .filter((el) => el.name.includes('16'))
                    .map((Item, ind) => (
                        <Icon key={ind} iconName={Item.name}>
                            <Item />
                        </Icon>
                    ))}
            </div>
        </>
    );
};

Icons16.storyName = 'Basic icons 16';

export const IconsColored: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>All icons colored.</StoryTitle>
            <div className="lgrid">
                {arrIcons.map((Item, ind) => (
                    <Icon key={ind} iconName={Item.name}>
                        <Item className="colored" />
                    </Icon>
                ))}
            </div>
        </>
    );
};

IconsColored.storyName = 'All icons colored';
