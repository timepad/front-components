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
    const ref = useRef();
    const [show, setShow] = useState(false);
    return (
        <>
            <Button type={'button'} buttonRef={ref} onClick={() => setShow(!show)}>
                parent
            </Button>
            <Dropdown parent={ref} show={show} onClose={() => setShow(false)} {...props}>
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
    const ref = useRef();
    const [show, setShow] = useState(false);
    return (
        <>
            <Button type={'button'} buttonRef={ref} onClick={() => setShow(!show)}>
                parent
            </Button>
            <Dropdown parent={ref} show={show} onClose={() => setShow(false)} {...props}>
                <div className="my-super-class">
                    <List>
                        <List.Item>Главная</List.Item>
                        <List.Item>Организация</List.Item>
                        <List.Item>Рассылки</List.Item>
                    </List>
                </div>
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
