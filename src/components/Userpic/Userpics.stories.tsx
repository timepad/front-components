import React from 'react';
import {Brick} from '../utility/Modifiers/Brick';
import {Gap} from '../utility/Modifiers/Gap';
import './stories/lib/userpics.less';
import {Userpic, Orgpic} from '../../index';

export default {
    title: 'Userpics',
};

type size = 'small' | 'medium' | 'big' | 'bigger' | 'biggest';
enum fillType {
    CHAR,
    URL,
}
// eslint-disable-next-line
const clickHandler = () => {};
const char = 'A';
const url = 'https://ucarecdn.com/a6b28451-2340-4b61-9776-8e186bf976fa/';

const roundButtons = [
    [
        {onClick: clickHandler, fillType: undefined},
        {onClick: clickHandler, fillType: fillType.CHAR},
        {onClick: clickHandler, fillType: fillType.URL},
    ],
];

const squareButtons = [
    [
        {onClick: clickHandler, fillType: fillType.CHAR, size: 'small'},
        {onClick: clickHandler, fillType: fillType.URL, size: 'small'},
    ],
    [
        {onClick: clickHandler, fillType: fillType.CHAR, size: 'medium'},
        {onClick: clickHandler, fillType: fillType.URL, size: 'medium'},
    ],
    [
        {onClick: clickHandler, fillType: fillType.CHAR, size: 'big'},
        {onClick: clickHandler, fillType: fillType.URL, size: 'big'},
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
    const urlKnob = url;
    const charKnob = char;
    const fill = (type: fillType | undefined) => {
        switch (type) {
            case fillType.CHAR:
                return {fillChar: charKnob[0]};
            case fillType.URL:
                return {fillURL: urlKnob};
            default:
                return undefined;
        }
    };

    return (
        <div className="sb-userpics lflex--y-axis">
            <Brick size={4} />
            <div className="lflex">
                <Gap size={4} />
                <div className="content">
                    <div>
                        <div className="t-caption t-caption-16 separator-bottom">Buttons</div>
                    </div>
                    <Brick size={2} />
                    {roundButtons.map((buttons, index) => (
                        <div className="lflex--y-axis" key={index}>
                            <div className="lflex">
                                {buttons.map((button, index) => (
                                    <div className="lflex" key={index}>
                                        <Userpic onClick={button.onClick} {...fill(button.fillType)} />
                                        <Gap size={2} />
                                    </div>
                                ))}
                            </div>
                            <Brick size={2} />
                        </div>
                    ))}
                    {squareButtons.map((buttons, index) => (
                        <div className="lflex--y-axis" key={index}>
                            <div className="lflex">
                                <Gap size={2} />
                                <Gap size={2} />
                                {buttons.map((button, index) => (
                                    <div className="lflex" key={index}>
                                        <Orgpic
                                            onClick={button.onClick}
                                            {...fill(button.fillType)}
                                            size={button.size as size}
                                        />
                                        <Gap size={2} />
                                    </div>
                                ))}
                            </div>
                            <Brick size={2} />
                        </div>
                    ))}
                    <Brick size={2} />
                    <div>
                        <div className="t-caption t-caption-16 separator-bottom">Organization page</div>
                    </div>
                    <Brick size={2} />
                    {organizationPagePic.map((buttons, index) => (
                        <div className="lflex--y-axis" key={index}>
                            <div className="lflex">
                                <Gap size={2} />
                                <Gap size={2} />
                                {buttons.map((button, index) => (
                                    <div className="lflex" key={index}>
                                        <Orgpic
                                            onClick={button.onClick}
                                            {...fill(button.fillType)}
                                            size={button.size as size}
                                        />
                                        <Gap size={2} />
                                    </div>
                                ))}
                            </div>
                            <Brick size={2} />
                        </div>
                    ))}
                </div>
                <Gap size={4} />
            </div>
            <Brick size={4} />
        </div>
    );
};
