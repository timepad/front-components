import {Form} from '../Form';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';
import React from 'react';

export default {
    title: 'Select (new)',
    component: Form,
} as Meta;

const themes = {
    default: {
        title: 'Default theme',
        containerClasses: [],
    },
    light: {
        title: 'Light theme',
        containerClasses: ['mtheme--lightpic'],
    },
    dark: {
        title: 'Dark theme',
        containerClasses: ['mtheme--darkpic'],
    },
};

interface IInputsContainerProps {
    data: string[];
    themeColor: keyof typeof themes;
}

const InputsContainer = (props: IInputsContainerProps) => {
    const {data, themeColor} = props;

    return (
        <div className={themes[themeColor].containerClasses.join(' ')}>
            <div className="mtheme__typo mtheme--bg--demo">
                <div className="lbrick-2" />
                <div className="lflex">
                    <div className="lgap-4-0" />
                    <div>
                        <div className="t-lead t-lead-24">{themes[themeColor].title}</div>
                        <div className="inputs-container lfelx-y-axis">
                            {data.map((input, index) => (
                                <div key={index}>
                                    <Form.Select
                                        value={'2'}
                                        options={[
                                            {value: '1', label: '1qweqwewqewqe'},
                                            {value: '2', label: '2qweqwew'},
                                        ]}
                                    />
                                    <div className="lbrick-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lgap-4-0" />
                </div>
                <div className="lbrick-2" />
            </div>
        </div>
    );
};

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Primary</StoryTitle>
            {Object.keys(themes).map((themeColor, index) => (
                <InputsContainer data={['1', '2']} themeColor={themeColor as keyof typeof themes} key={index} />
            ))}
        </>
    );
};
