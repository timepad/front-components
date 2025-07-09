import React, {FC} from 'react';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Meta} from '@storybook/react/types-6-0';
import {Row} from './index';
import {IconPlus24} from '../../icons';

import 'css/bundle.less';
import {IRowProps} from './Row';

export default {
    title: 'Row',
    component: Row,
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

type IconPosition = 'top' | 'bottom' | 'center';

interface IRow extends IRowProps {
    haveCaption?: boolean;
    leftIconPosition?: IconPosition;
    rightIconPosition?: IconPosition;
}
interface ICreateRowProps extends IRowProps {
    text: string;
    caption?: string;
    leftIcon?: {
        icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
        position: IconPosition;
    };
    rightIcon?: {
        icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
        position: IconPosition;
    };
}

const CreateRowObject = ({
    haveCaption = false,
    leftIconPosition = undefined,
    rightIconPosition = undefined,
    ...props
}: IRow): ICreateRowProps => {
    return {
        text: 'Primary text',
        caption: haveCaption ? 'Secondary text' : '',
        leftIcon: leftIconPosition
            ? {
                  icon: <IconPlus24 />,
                  position: leftIconPosition,
              }
            : undefined,
        rightIcon: rightIconPosition
            ? {
                  icon: <IconPlus24 />,
                  position: rightIconPosition,
              }
            : undefined,
        ...props,
    };
};
const CreateRowObjects = (ffFont = false, small = false): ICreateRowProps[] => [
    CreateRowObject({ffFont, small, activable: true}),
    CreateRowObject({ffFont, small, hoverable: true}),
    CreateRowObject({ffFont, small, disabled: true}),
    CreateRowObject({ffFont, small, selectable: true}),
    CreateRowObject({ffFont, small, leftIconPosition: 'center'}),
    CreateRowObject({ffFont, small, leftIconPosition: 'center', hoverable: true}),
    CreateRowObject({ffFont, small, leftIconPosition: 'center', disabled: true}),
    CreateRowObject({ffFont, small, leftIconPosition: 'center', selectable: true}),
    CreateRowObject({ffFont, small, leftIconPosition: 'center', rightIconPosition: 'center'}),
    CreateRowObject({ffFont, small, leftIconPosition: 'center', rightIconPosition: 'center', hoverable: true}),
    CreateRowObject({ffFont, small, leftIconPosition: 'center', rightIconPosition: 'center', disabled: true}),
    CreateRowObject({ffFont, small, leftIconPosition: 'center', rightIconPosition: 'center', selectable: true}),
    CreateRowObject({ffFont, small, haveCaption: true}),
    CreateRowObject({ffFont, small, haveCaption: true, hoverable: true}),
    CreateRowObject({ffFont, small, haveCaption: true, disabled: true}),
    CreateRowObject({ffFont, small, haveCaption: true, selectable: true}),
    CreateRowObject({ffFont, small, haveCaption: true, leftIconPosition: 'center'}),
    CreateRowObject({ffFont, small, haveCaption: true, leftIconPosition: 'center', hoverable: true}),
    CreateRowObject({ffFont, small, haveCaption: true, leftIconPosition: 'center', disabled: true}),
    CreateRowObject({ffFont, small, haveCaption: true, leftIconPosition: 'center', selectable: true}),
    CreateRowObject({ffFont, small, haveCaption: true, leftIconPosition: 'center', rightIconPosition: 'center'}),
    CreateRowObject({
        ffFont,
        small,
        haveCaption: true,
        leftIconPosition: 'center',
        rightIconPosition: 'center',
        hoverable: true,
    }),
    CreateRowObject({
        ffFont,
        small,
        haveCaption: true,
        leftIconPosition: 'center',
        rightIconPosition: 'center',
        disabled: true,
    }),
    CreateRowObject({
        ffFont,
        small,
        haveCaption: true,
        leftIconPosition: 'center',
        rightIconPosition: 'center',
        selectable: true,
    }),
    CreateRowObject({
        ffFont,
        small,
        haveCaption: true,
        leftIconPosition: 'top',
        rightIconPosition: 'top',
        hoverable: true,
    }),
    CreateRowObject({
        ffFont,
        small,
        haveCaption: true,
        leftIconPosition: 'bottom',
        rightIconPosition: 'bottom',
        hoverable: true,
    }),
];
const CreateRow: FC<React.PropsWithChildren<{row: ICreateRowProps}>> = (props) => {
    const {text, caption, leftIcon, rightIcon, disabled, hoverable, small, ffFont, horizontalPadding, ...otherProps} =
        props.row;
    return (
        <Row
            disabled={disabled}
            hoverable={hoverable}
            small={small}
            ffFont={ffFont}
            horizontalPadding={horizontalPadding}
            {...otherProps}
        >
            {leftIcon && (
                <Row.Icon bottom={leftIcon.position === 'bottom'} top={leftIcon.position === 'top'}>
                    {leftIcon.icon}
                </Row.Icon>
            )}
            <Row.Body>
                <Row.Text>{text}</Row.Text>
                {caption && <Row.Caption>{caption}</Row.Caption>}
            </Row.Body>
            {rightIcon && (
                <Row.Icon bottom={rightIcon.position === 'bottom'} top={rightIcon.position === 'top'}>
                    {rightIcon.icon}
                </Row.Icon>
            )}
        </Row>
    );
};

const DefaultRowGenerated = CreateRowObjects().map((row, key) => <CreateRow key={key} row={row} />);
const DefaultFFRowGenerated = CreateRowObjects(true).map((row, key) => <CreateRow key={key} row={row} />);

const SmallRowGenerated = CreateRowObjects(false, true).map((row, key) => <CreateRow key={key} row={row} />);
const SmallFFRowGenerated = CreateRowObjects(true, true).map((row, key) => <CreateRow key={key} row={row} />);

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Input Sans Narrow</StoryTitle>
            {DefaultRowGenerated}
            <StoryTitle>Neue Haas Unica W1G</StoryTitle>
            {DefaultFFRowGenerated}
        </>
    );
};

export const DefaultDark: IStorybookComponent = () => {
    return (
        <>
            <div className={themes['dark'].containerClasses.join(' ')}>
                <StoryTitle>Input Sans Narrow</StoryTitle>
                <div className="mtheme__typo mtheme--bg--demo">{DefaultRowGenerated}</div>
                <StoryTitle>Neue Haas Unica W1G</StoryTitle>
                <div className="mtheme__typo mtheme--bg--demo">{DefaultFFRowGenerated}</div>
            </div>
        </>
    );
};

export const Small: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Input Sans Narrow</StoryTitle>
            {SmallRowGenerated}
            <StoryTitle>Neue Haas Unica W1G</StoryTitle>
            {SmallFFRowGenerated}
        </>
    );
};

export const SmallDark: IStorybookComponent = () => {
    return (
        <>
            <div className={themes['dark'].containerClasses.join(' ')}>
                <StoryTitle>Input Sans Narrow</StoryTitle>
                <div className="mtheme__typo mtheme--bg--demo">{SmallRowGenerated}</div>
                <StoryTitle>Neue Haas Unica W1G</StoryTitle>
                <div className="mtheme__typo mtheme--bg--demo">{SmallFFRowGenerated}</div>
            </div>
        </>
    );
};
