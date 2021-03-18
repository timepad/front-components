import React, {useEffect, useRef, useState} from 'react';

import {Dropdown} from '../src';
import {Button, ButtonVariant, Userpic} from '../src';

import IconTicket from '../src/assets/svg/24/icon-ticket-24.svg';
import IconBookmark from '../src/assets/svg/24/icon-bookmark-24.svg';
import IconLogout from '../src/assets/svg/24/icon-logout-24.svg';
import IconEdit from '../src/assets/svg/24/icon-edit-24.svg';

import StoryRouter from 'storybook-react-router';
import {action} from '@storybook/addon-actions';

import {cities} from './data/cities';

const argTypes = {
    options: {name: 'Список элементов', control: {type: 'array'}},
    selection: {name: 'Выбранные элементы', control: {type: 'array'}},
    phone: {name: 'Телефон', control: {type: 'text'}},
    links: {name: 'Список', control: {type: 'array'}},
    buttons: {name: 'Кнопки', control: {type: 'array'}},
    name: {name: 'Имя', control: {type: 'text'}},
    picURL: {name: 'Аватар', control: {type: 'text'}},
};

const defaultStoryArgs = {
    phone: '+7 926 371 17 12',
    name: 'Григорий',
    picURL: 'https://ucarecdn.com/a6b28451-2340-4b61-9776-8e186bf976fa/',
    links: ['Мои события', 'Избранное', 'Выход'],
    buttons: ['Стать организатором'],
    narrowOptions: ['Москва', 'Россия', 'Онлайн'],
    longOptions: cities,
    wideOptions: [
        'ООО Психология и самопознание через творчество и реализацию',
        'Институт медиа и архитектуры «Стрелка»',
    ],
    linksWithIcons: [
        {label: 'Мои события', icon: <IconTicket />},
        {label: 'Избранное', icon: <IconBookmark />},
        {label: 'События', icon: null},
        {label: 'Выход', icon: <IconLogout />},
    ],
};

const rootStyle = {
    height: '80vh',
};

function parseIntArray(array: string[]) {
    return array.reduce((acc: number[], item: string) => {
        const value = Number.parseInt(item.trim());
        if (!Number.isNaN(value)) {
            acc.push(value);
        }
        return acc;
    }, []);
}

interface IKeyValue {
    [key: string]: unknown;
}

function reduceObject(obj: IKeyValue, names: string[]) {
    return names.reduce((acc: IKeyValue, name: string) => {
        if (name in argTypes) {
            acc[name] = obj[name];
        }
        return acc;
    }, {});
}

export default {
    title: 'Dropdown',
    decorators: [StoryRouter(undefined, {initialEntries: ['/']})],
};

// Base story

interface IBaseProps {
    options: string[];
}

export const Base = ({options}: IBaseProps): React.ReactElement => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const [show, setShow] = useState(true);

    const openHandler = () => setShow(true);
    const closeHandler = () => setShow(false);

    return (
        <div style={rootStyle}>
            <Button buttonRef={ref} label="Выпадающий список" onClick={openHandler} />
            <Dropdown parent={ref} show={show} onClose={closeHandler} priorityPositions={['br']}>
                {options.map((value, index) => (
                    <Dropdown.Option key={index} label={value} />
                ))}
            </Dropdown>
        </div>
    );
};

Base.args = {
    options: defaultStoryArgs.narrowOptions,
};
Base.argTypes = reduceObject(argTypes, ['options']);

// WithLongItemList story

interface IWithLongItemListProps {
    options: string[];
    selection: string[];
}

export const WithLongItemList = ({options, selection}: IWithLongItemListProps): React.ReactElement => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    const _selection = parseIntArray(selection);
    // Чтобы DD не скакал относительно парента при рефреша, связано из за того что parent.current.getBoundingClientRect()
    // в реализации DD не успевает получить корректную вычисляемую ширину
    useEffect(() => {
        setTimeout(() => setShow(true), 0);
    }, []);

    const openHandler = () => setShow(true);
    const closeHandler = () => setShow(false);

    return (
        <div style={rootStyle}>
            <Button buttonRef={ref} label="Выпадающий список" onClick={openHandler} />
            <Dropdown parent={ref} show={show} onClose={closeHandler} priorityPositions={['br']}>
                {options.map((value, index) => (
                    <Dropdown.Option key={index} label={value} isSelected={_selection.includes(index)} />
                ))}
            </Dropdown>
        </div>
    );
};

WithLongItemList.args = {
    options: defaultStoryArgs.longOptions,
    selection: ['0', '8'],
};
WithLongItemList.argTypes = reduceObject(argTypes, ['options', 'selection']);

// WithWideItems story

export const WithWideItems = ({options}: IBaseProps): React.ReactElement => {
    const ref = useRef(null);
    const [show, setShow] = useState(true);

    const openHandler = () => setShow(true);
    const closeHandler = () => setShow(false);

    return (
        <div style={rootStyle}>
            <Button buttonRef={ref} label="Выпадающий список" onClick={openHandler} />
            <Dropdown parent={ref} show={show} onClose={closeHandler} priorityPositions={['br']}>
                {options.map((value, index) => (
                    <Dropdown.Option key={index} label={value} />
                ))}
            </Dropdown>
        </div>
    );
};

WithWideItems.args = {
    options: defaultStoryArgs.wideOptions,
};
WithWideItems.argTypes = reduceObject(argTypes, ['options']);

// WithHeaderAndButton story

interface IWithHeaderAndButtonProps {
    phone: string;
    links: string[];
    buttons: string[];
}

export const WithHeaderAndButton = ({buttons, phone, links}: IWithHeaderAndButtonProps): React.ReactElement => {
    const ref = useRef(null);
    const [show, setShow] = useState(true);

    const openHandler = () => setShow(true);
    const closeHandler = () => setShow(false);

    return (
        <div style={rootStyle}>
            <Button buttonRef={ref} label="Выпадающий список" onClick={openHandler} />
            <Dropdown parent={ref} show={show} onClose={closeHandler} priorityPositions={['br']}>
                <Dropdown.Row>
                    <span className="mdrop__profile lflex--align-centered">
                        <Userpic onClick={action('Userpick click')} />
                        <div className="lflex lflex--y-axis mdrop__profile--info">
                            <div className="lflex lflex--y-axis mdrop__profile--name">
                                <span className="mdrop__profile--main">{phone}</span>
                            </div>
                        </div>
                        <div className="mdrop__profile--icon--edit">
                            <Button
                                icon={<IconEdit />}
                                variant={ButtonVariant.transparent}
                                onClick={action('Edit icon click')}
                            />
                        </div>
                    </span>
                </Dropdown.Row>
                {links.map((linkLabel, index) => (
                    <Dropdown.Link key={index} label={linkLabel} href="#" />
                ))}
                {buttons.map((buttonLabel, index) => (
                    <Dropdown.Button key={index} label={buttonLabel} onClick={action(buttonLabel)} />
                ))}
            </Dropdown>
        </div>
    );
};

WithHeaderAndButton.args = reduceObject(defaultStoryArgs, ['phone', 'links', 'buttons']);
WithHeaderAndButton.argTypes = reduceObject(argTypes, ['phone', 'links', 'buttons']);

// WithHeaderAndButton2 story

interface IWithHeaderAndButton2Props extends IWithHeaderAndButtonProps {
    name: string;
    picURL: string;
}

export const WithHeaderAndButton2 = ({
    buttons,
    name,
    phone,
    picURL,
    links,
}: IWithHeaderAndButton2Props): React.ReactElement => {
    const ref = useRef(null);
    const [show, setShow] = useState(true);

    const openHandler = () => setShow(true);
    const closeHandler = () => setShow(false);

    return (
        <div style={rootStyle}>
            <Button buttonRef={ref} label="Выпадающий список" onClick={openHandler} />
            <Dropdown parent={ref} show={show} onClose={closeHandler} priorityPositions={['br']}>
                <Dropdown.Row>
                    <span className="mdrop__profile lflex--align-centered">
                        <Userpic fillURL={picURL} onClick={action('Userpick click')} />
                        <div className="lflex lflex--y-axis mdrop__profile--info">
                            <div className="lflex lflex--y-axis mdrop__profile--name">
                                <span className="mdrop__profile--main t-caption--desktop t-body--mobile">{name}</span>
                                <span className="t-small">{phone}</span>
                            </div>
                        </div>
                        <div className="mdrop__profile--icon--edit">
                            <Button
                                icon={<IconEdit />}
                                variant={ButtonVariant.transparent}
                                onClick={action('Edit icon click')}
                            />
                        </div>
                    </span>
                </Dropdown.Row>
                {links.map((linkLabel, index) => (
                    <Dropdown.Link key={index} label={linkLabel} href="#" />
                ))}
                {buttons.map((buttonLabel, index) => (
                    <Dropdown.Button key={index} label={buttonLabel} onClick={action(buttonLabel)} />
                ))}
            </Dropdown>
        </div>
    );
};

WithHeaderAndButton2.args = reduceObject(defaultStoryArgs, ['phone', 'links', 'buttons', 'name', 'picURL']);
WithHeaderAndButton2.argTypes = reduceObject(argTypes, ['phone', 'links', 'buttons', 'name', 'picURL']);

// WithHeaderAndIconItemList story

interface IWithHeaderAndIconItemListProps {
    phone: string;
    buttons: string[];
}

export const WithHeaderAndIconItemList = ({buttons, phone}: IWithHeaderAndIconItemListProps): React.ReactElement => {
    const ref = useRef(null);
    const [show, setShow] = useState(true);

    const openHandler = () => setShow(true);
    const closeHandler = () => setShow(false);

    return (
        <div style={rootStyle}>
            <Button buttonRef={ref} label="Выпадающий список" onClick={openHandler} />
            <Dropdown parent={ref} show={show} onClose={closeHandler} priorityPositions={['br']} withIcons>
                <Dropdown.Row>
                    <span className="mdrop__profile lflex--align-centered">
                        <Userpic onClick={action('Userpick click')} />
                        <div className="lflex lflex--y-axis mdrop__profile--info">
                            <div className="lflex lflex--y-axis mdrop__profile--name">
                                <span className="mdrop__profile--main">{phone}</span>
                            </div>
                        </div>
                        <div className="mdrop__profile--icon--edit">
                            <Button
                                icon={<IconEdit />}
                                variant={ButtonVariant.transparent}
                                onClick={action('Edit icon click')}
                            />
                        </div>
                    </span>
                </Dropdown.Row>
                {defaultStoryArgs.linksWithIcons.map((item, index) => (
                    <Dropdown.Link key={index} label={item.label} href="#" subitem icon={item.icon ?? undefined} />
                ))}
                {buttons.map((buttonLabel, index) => (
                    <Dropdown.Button key={index} label={buttonLabel} onClick={action(buttonLabel)} />
                ))}
            </Dropdown>
        </div>
    );
};

WithHeaderAndIconItemList.args = reduceObject(defaultStoryArgs, ['phone', 'buttons', 'name', 'picURL']);
WithHeaderAndIconItemList.argTypes = reduceObject(argTypes, ['phone', 'buttons', 'name', 'picURL']);
