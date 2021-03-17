import 'app/styles.less';
import './lib/main.less';
import React from 'react';
import {Userpic} from '../src/components/TPUI/Userpic';
import {StoryTitle} from './components/StoryTitle';
import {Brick} from './Elements/helpers';

const imageUrl = 'https://ucarecdn.com/a6b28451-2340-4b61-9776-8e186bf976fa/';

const argTypes = {
    fillUrl: {
        type: {required: false},
        table: {
            type: {summary: 'String'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    fillChar: {
        type: {required: false},
        table: {
            type: {summary: 'String'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    onClick: {
        type: {required: false},
        table: {
            type: {summary: '() => void'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
};

// TODO: Отрефакторить
// eslint-disable-next-line
const dummy = () => {};

export default {
    title: 'Elements/Avatars/Userpic',
    argTypes,
};

export const Basic: React.FC = () => {
    return (
        <div>
            <Userpic />
        </div>
    );
};

export const Interactive: React.FC = () => {
    return (
        <div>
            <Userpic onClick={dummy} />
        </div>
    );
};

export const Variants: React.FC = () => {
    return (
        <div className="lflex lflex--y-axis">
            <StoryTitle>Userpic with image</StoryTitle>
            <Userpic fillURL={imageUrl} onClick={dummy} />
            <Brick size={2} />
            <StoryTitle>Userpic with character</StoryTitle>
            <Userpic fillChar="A" onClick={dummy} />
        </div>
    );
};
