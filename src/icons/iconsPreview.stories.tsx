import * as React from 'react';
import {StoryTitle, IStorybookComponent} from '../services/helpers/storyBookHelpers';
import {Meta} from '@storybook/react/types-6-0';
import * as IconNames from 'tpIcons';
import cx from 'classnames';
import '../assets/css/bundle.less';
import {component} from '../services/helpers/classHelpers';
import './iconsPreview.less';

interface IProps {
    iconSampleName: string;
    children: any;
}

const story = true;

const IconSample: React.FC<IProps> = ({iconSampleName, children}: IProps) => {
    const classNames = cx(
        component('icon')({
            story,
            iconSampleName,
        }),
    );

    return (
        <div className={classNames}>
            {children}
            <div>{iconSampleName}</div>
        </div>
    );
};

export default {
    title: 'Icons Preview',
    component: IconSample,
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
                        <IconSample key={ind} iconSampleName={Item.name}>
                            <Item />
                        </IconSample>
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
                        <IconSample key={ind} iconSampleName={Item.name}>
                            <Item />
                        </IconSample>
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
                    <IconSample key={ind} iconSampleName={Item.name}>
                        <Item className="colored" />
                    </IconSample>
                ))}
            </div>
        </>
    );
};

IconsColored.storyName = 'All icons colored';
