import '../../assets/css/bundle.less';
import * as React from 'react';
import {Userpic} from './Userpic';
import {StoryTitle, dummy, Spacer} from '../../services/helpers/storyBookHelpers';
import {Orgpic} from './Orgpic';
import {PicSize} from './Pic';

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

export default {
    title: 'Pics',
    argTypes,
};

const imageUrl = 'https://ucarecdn.com/a6b28451-2340-4b61-9776-8e186bf976fa/';
const char = 'A';

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

export const WithImage: React.FC = () => {
    return (
        <div>
            <Userpic fillURL={imageUrl} />
        </div>
    );
};

export const WithCharacter: React.FC = () => {
    return (
        <div>
            <Userpic fillChar={char} />
        </div>
    );
};

export const Orgpics: React.FC = () => {
    return (
        <>
            <StoryTitle>Organization square default icon</StoryTitle>
            <div className="lflex">
                <Orgpic fillChar={char} />
                <Spacer />
                <Orgpic fillURL={imageUrl} />
            </div>
            <div className="lbrick-2" />

            <StoryTitle>Organization square small icon</StoryTitle>
            <div className="lflex">
                <Orgpic fillChar={char} size={PicSize.small} />
                <Spacer />
                <Orgpic fillURL={imageUrl} size={PicSize.small} />
            </div>
            <div className="lbrick-2" />

            <StoryTitle>Organization square big icon</StoryTitle>
            <div className="lflex">
                <Orgpic fillChar={char} size={PicSize.big} />
                <Spacer />
                <Orgpic fillURL={imageUrl} size={PicSize.big} />
            </div>
            <div className="lbrick-2" />

            <StoryTitle>Organization square bigger icon</StoryTitle>
            <div className="lflex">
                <Orgpic fillChar={char} size={PicSize.bigger} />
                <Spacer />
                <Orgpic fillURL={imageUrl} size={PicSize.bigger} />
            </div>
            <div className="lbrick-2" />

            <StoryTitle>Organization square biggest icon</StoryTitle>
            <div className="lflex">
                <Orgpic fillChar={char} size={PicSize.biggest} />
                <Spacer />
                <Orgpic fillURL={imageUrl} size={PicSize.biggest} />
            </div>
            <div className="lbrick-2" />
        </>
    );
};
