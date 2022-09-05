import React, {useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {SpinLoader} from './SpinLoader';
import {Theme} from './theme';
import {SpinLoaderWrapper} from './SpinLoaderWrapper';
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
                    <div style={{width: '100%'}}>
                        <div className="t-lead t-lead-24">{themes[themeColor].title}</div>
                        <div className="inputs-container lfelx-y-axis">
                            <LoaderCase theme={theme} />
                            <LoaderCase theme={theme} />
                            <WithLoaderCase theme={theme} />
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
        <div
            style={{
                display: 'grid',
                alignItems: 'center',
                gridTemplateColumns: '200px 1fr 1fr',
            }}
            className={`mtheme mtheme--${theme}`}
        >
            <div>Spin loader:</div>
            <div style={{padding: 16}} className="mtheme__typo">
                <SpinLoader theme={theme} />
            </div>
        </div>
    );
};

const WithLoaderCase: React.FC<{theme: Theme}> = ({theme}) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div
            style={{
                display: 'grid',
                alignItems: 'center',
                gridTemplateColumns: '200px 1fr 1fr',
            }}
            className={`mtheme mtheme--${theme}`}
        >
            <div>Container with spin loader:</div>
            <div
                style={{
                    padding: 16,
                    flexDirection: 'column',
                }}
                className="mtheme__typo lflex lflex--align-centered"
            >
                <SpinLoaderWrapper isLoading={isLoading} theme={theme}>
                    <div
                        style={{
                            width: '100%',
                            height: '32px',
                        }}
                        className="lflex lflex--justify-centered"
                    >
                        Some content
                    </div>
                </SpinLoaderWrapper>
            </div>
            <div>
                <Button onClick={() => setIsLoading(!isLoading)}>Switch state</Button>
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
