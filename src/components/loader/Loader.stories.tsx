import React, {useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {SpinLoader} from './SpinLoader';
import {Theme} from './theme';
import {WithSpinLoader} from './WithSpinLoader';
import {Button} from '../button';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import 'css/bundle.less';

export default {
    title: 'SpinLoader',
} as Meta;

const themes = {
    default: {
        title: 'Default theme',
        theme: Theme.default,
        containerClasses: [],
    },
    light: {
        title: 'Light theme',
        theme: Theme.lightpic,
        containerClasses: ['mtheme--lightpic'],
    },
    dark: {
        title: 'Dark theme',
        theme: Theme.darkpic,
        containerClasses: ['mtheme--darkpic'],
    },
};

interface ILoadersContainer {
    themeColor: keyof typeof themes;
    theme: Theme;
}

const LoadersContainer: React.FC<ILoadersContainer> = (props) => {
    const {theme, themeColor} = props;
    return (
        <div className={themes[themeColor].containerClasses.join(' ')}>
            <div className="mtheme__typo mtheme--bg--demo">
                <div className="lbrick-2" />
                <div className="lflex">
                    <div className="lgap-4-0" />
                    <div>
                        <div className="t-lead t-lead-24">{themes[themeColor].title}</div>
                        <div className="inputs-container lfelx-y-axis">
                            <LoaderCase theme={theme} />
                            <WithLoaderCase theme={theme} />
                        </div>
                    </div>
                    <div className="lgap-4-0" />
                </div>
                <div className="lbrick-2" />
            </div>
        </div>
    );
};

const LoaderCase: React.FC<{theme: Theme}> = ({theme}) => {
    return (
        <div className={`mtheme mtheme--${theme}`}>
            <div style={{padding: 16}} className="mtheme__typo">
                <SpinLoader theme={theme} />
            </div>
        </div>
    );
};

const WithLoaderCase: React.FC<{theme: Theme}> = ({theme}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className={`mtheme mtheme--${theme}`}>
            <div style={{padding: 16}} className="mtheme__typo lflex lflex--align-centered">
                <Button onClick={() => setIsLoaded(!isLoaded)}>Switch state</Button>
                <WithSpinLoader isLoaded={isLoaded} theme={theme}>
                    Some content
                </WithSpinLoader>
            </div>
        </div>
    );
};

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Primary</StoryTitle>
            {Object.keys(themes)
                .filter((item): item is keyof typeof themes => item !== undefined)
                .map((themeColor, index) => (
                    <LoadersContainer theme={themes[themeColor].theme} themeColor={themeColor} key={index} />
                ))}
        </>
    );
};
