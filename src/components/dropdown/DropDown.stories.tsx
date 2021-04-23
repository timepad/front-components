import React, {useRef, useState} from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Dropdown} from './index';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import {Button} from '../button';
import {List} from '../list';

export default {
    title: 'DropDown',
    component: Dropdown,
} as Meta;

const DropBtn = ({...props}) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Dropdown show={show} onClose={() => setShow(false)} {...props}>
                <Dropdown.ToggleButton>Open dropdown</Dropdown.ToggleButton>
                <Dropdown.Body>
                    <List mod={'dark'}>
                        <List.Item>Главная</List.Item>
                        <List.Item>Организация</List.Item>
                        <List.Item>Рассылки</List.Item>
                    </List>
                </Dropdown.Body>
            </Dropdown>
        </>
    );
};

const DropCustomBody = ({...props}) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Dropdown show={show} onClose={() => setShow(false)} {...props}>
                <Dropdown.ToggleButton>Open dropdown</Dropdown.ToggleButton>
                <Dropdown.Body className="my-super-class">
                    <List>
                        <List.Item>Главная</List.Item>
                        <List.Item>Организация</List.Item>
                        <List.Item>Рассылки</List.Item>
                    </List>
                </Dropdown.Body>
            </Dropdown>
        </>
    );
};

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Default</StoryTitle>
            <DropBtn />
            <div className="lbrick-2" />
            <StoryTitle>Top right position</StoryTitle>
            <DropBtn priorityPositions={'tr'} />
            <div className="lbrick-2" />
            <StoryTitle>Custom body</StoryTitle>
            <DropCustomBody />
        </>
    );
};
