import React, {useRef, useState} from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Dropdown} from './index';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import {List} from '../list';
import {Button} from '../button';
import {IDropdownProps} from './Dropdown';

export default {
    title: 'DropDown',
    component: Dropdown,
} as Meta;

const DropBtn: React.FC<IDropdownProps> = (props) => {
    return (
        <>
            <Dropdown {...props}>
                <Dropdown.ToggleButton>Open dropdown</Dropdown.ToggleButton>
                <Dropdown.Body>
                    <List variant={'dark'}>
                        <List.Item as={'button'} type={'button'}>
                            Главная
                        </List.Item>
                        <List.Item>Организация</List.Item>
                        <List.Item>Рассылки</List.Item>
                    </List>
                </Dropdown.Body>
            </Dropdown>
        </>
    );
};

const DropCustomBody: React.FC = (props) => {
    return (
        <>
            <Dropdown {...props}>
                <Dropdown.ToggleButton>Open dropdown</Dropdown.ToggleButton>
                <Dropdown.Body className="my-super-class">
                    <List variant={'white'}>
                        <List.Item>Главная</List.Item>
                        <List.Item>Организация</List.Item>
                        <List.Item>Рассылки</List.Item>
                    </List>
                </Dropdown.Body>
            </Dropdown>
        </>
    );
};

const DropShowBtn: React.FC = () => {
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLButtonElement | null>(null);

    const toggleShow = () => setShow(!show);
    const handleClose = () => setShow(false);

    return (
        <>
            <Button buttonRef={ref as React.MutableRefObject<HTMLButtonElement>} onClick={toggleShow}>
                Open
            </Button>
            <Dropdown parent={ref} show={show} onClose={handleClose}>
                <Dropdown.Body>
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

const DropItemBtn: React.FC = () => {
    const [show, setShow] = React.useState(false);
    const ref = React.useRef<HTMLButtonElement | null>(null);

    const toggleShow = () => {
        setShow(!show);
    };

    return (
        <>
            <List>
                <List.Item ref={ref} as={'button'} type={'button'} onClick={toggleShow}>
                    Btn
                </List.Item>
            </List>
            <Dropdown parent={ref} show={show} onClose={toggleShow}>
                <Dropdown.Body>
                    <List variant={'dark'}>
                        <List.Item>Открыть главную страницу профиля</List.Item>
                        <List.Item>Организация</List.Item>
                        <List.Item>Рассылки</List.Item>
                        <List.Item>Рассылки</List.Item>
                        <Dropdown.Button textPosition={'center'} label="Стать организатором" />
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
            <DropBtn priorityPositions={['tr']} />
            <div className="lbrick-2" />
            <StoryTitle>Custom body</StoryTitle>
            <DropCustomBody />
            <div className="lbrick-2" />
            <StoryTitle>Outside open</StoryTitle>
            <DropShowBtn />
            <div className="lbrick-2" />
            <StoryTitle>List item as button</StoryTitle>
            <DropItemBtn />
        </>
    );
};
