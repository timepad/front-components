import '../../assets/css/bundle.less';
import React from 'react';
import {Userpic} from './Userpic';
import {StoryTitle, dummy, Spacer} from '../../services/helpers/storyBookHelpers';
import {Orgpic} from './Orgpic';

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

export const Variants: React.FC = () => {
    return (
        <div className="lflex lflex--y-axis">
            <StoryTitle>Userpic with image</StoryTitle>
            <Userpic fillURL={imageUrl} onClick={dummy} />
            <div className="lbrick-2" />
            <StoryTitle>Userpic with character</StoryTitle>
            <Userpic fillChar="A" onClick={dummy} />
        </div>
    );
};

type size = 'small' | 'medium' | 'big' | 'bigger' | 'biggest';

enum fillType {
    CHAR,
    URL,
}

const squareButtons = [
    [
        {onClick: dummy, fillType: fillType.CHAR, size: 'small'},
        {onClick: dummy, fillType: fillType.URL, size: 'small'},
    ],
    [
        {onClick: dummy, fillType: fillType.CHAR, size: 'medium'},
        {onClick: dummy, fillType: fillType.URL, size: 'medium'},
    ],
    [
        {onClick: dummy, fillType: fillType.CHAR, size: 'big'},
        {onClick: dummy, fillType: fillType.URL, size: 'big'},
    ],
];

const organizationPagePic = [
    [
        {onClick: undefined, fillType: fillType.CHAR, size: 'bigger'},
        {onClick: undefined, fillType: fillType.URL, size: 'bigger'},
    ],
    [
        {onClick: undefined, fillType: fillType.CHAR, size: 'biggest'},
        {onClick: undefined, fillType: fillType.URL, size: 'biggest'},
    ],
];

export const Userpics: React.FC = () => {
    const fill = (type: fillType) => {
        switch (type) {
            case fillType.CHAR:
                return {fillChar: char};
            case fillType.URL:
                return {fillURL: imageUrl};
            default:
                return undefined;
        }
    };

    return (
        <>
            <StoryTitle>Buttons</StoryTitle>
            {squareButtons.map((buttons, index) => (
                <>
                    <div className="lflex" key={index}>
                        {buttons.map((button, index) => (
                            <React.Fragment key={index}>
                                <Orgpic
                                    onClick={button.onClick}
                                    {...fill(button.fillType)}
                                    size={button.size as size}
                                />
                                <Spacer />
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="lbrick-2" />
                </>
            ))}
            <StoryTitle>Organization page</StoryTitle>
            {organizationPagePic.map((buttons, index) => (
                <>
                    <div className="lflex" key={index}>
                        {buttons.map((button, index) => (
                            <React.Fragment key={index}>
                                <Orgpic
                                    onClick={button.onClick}
                                    {...fill(button.fillType)}
                                    size={button.size as size}
                                />
                                <Spacer />
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="lbrick-2" />
                </>
            ))}
        </>
    );
};
