import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import '../../assets/css/bundle.less';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Modules, ModuleAbsolute} from '.';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Modules',
    component: Modules,
} as Meta;

const Child: React.FC<React.PropsWithChildren<unknown>> = () => (
    <div style={{width: '100%', height: '100px', backgroundColor: 'blue'}} />
);

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Default Modules with 3 elements</StoryTitle>
            <Modules>
                <Modules.M>
                    <Child />
                </Modules.M>
                <Modules.M>
                    <Child />
                </Modules.M>
                <Modules.M>
                    <Child />
                </Modules.M>
            </Modules>
        </>
    );
};
Default.storyName = 'Default';

export const DefaultPosition: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Modules with 6 elements</StoryTitle>
            <Modules>
                <Modules.M>
                    <Child />
                </Modules.M>
                <Modules.M mobile={4}>
                    <Child />
                </Modules.M>
                <Modules.M mobile={4} desktop={4}>
                    <Child />
                </Modules.M>
                <Modules.M mobile={12} desktop={4}>
                    <Child />
                </Modules.M>
                <Modules.M mobile={6}>
                    <Child />
                </Modules.M>
                <Modules.M mobile={4} desktop={5}>
                    <Child />
                </Modules.M>
            </Modules>
        </>
    );
};

DefaultPosition.storyName = 'With sizing';

export const CenterPosition: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Centered Modules with 6 elements</StoryTitle>
            <Modules center>
                <Modules.M>
                    <Child />
                </Modules.M>
                <Modules.M mobile={4}>
                    <Child />
                </Modules.M>
                <Modules.M mobile={4} desktop={4}>
                    <Child />
                </Modules.M>
                <Modules.M desktop={4} mobile={12}>
                    <Child />
                </Modules.M>
                <Modules.M mobile={6}>
                    <Child />
                </Modules.M>
                <Modules.M mobile={4} desktop={5}>
                    <Child />
                </Modules.M>
            </Modules>
        </>
    );
};

CenterPosition.storyName = 'Centered with sizing';

export const Absolute: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>
                Module Absolute (Модуль абсолютной ширины, не зависит от ширины контейнера, в который помещен)
            </StoryTitle>
            <div style={{width: '500px', height: '200px', border: '2px solid red'}}>
                <ModuleAbsolute>
                    <Child />
                </ModuleAbsolute>
            </div>
        </>
    );
};

Absolute.storyName = 'Module Absolute';
