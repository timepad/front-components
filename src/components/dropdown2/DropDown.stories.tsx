import React, {FC, useRef, useState} from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Dropdown} from './index';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import './storybook/demo.less';
import {List} from '../list';
import {Button} from '../button';
import {IDropdownProps} from './Dropdown';
import AddIcon from 'svg/24/icon-plus-24.svg';
import {cities} from '../../data/cities';
import {Pic} from '../userpic';

export default {
    title: 'DropDown2',
    component: Dropdown,
} as Meta;

const Prefix: React.FC = () => <Pic interactive />;
const Suffix: React.FC = () => <AddIcon />;

const DropBtn: React.FC<IDropdownProps> = (props) => {
    return (
        <>
            <Dropdown show={true} {...props}>
                <Dropdown.ToggleButton>Выпадающий список</Dropdown.ToggleButton>
                <Dropdown.Body>
                    <List size={'lg'} variant={'dark'}>
                        <List.Item>Primary text</List.Item>
                        <List.Item as={'button'} type={'button'}>
                            Primary text
                        </List.Item>
                        <List.Item as={'button'} type={'button'}>
                            Primary text
                        </List.Item>
                    </List>
                </Dropdown.Body>
            </Dropdown>
        </>
    );
};

const DropCustomBody: React.FC = (props) => {
    return (
        <>
            <Dropdown show={true} {...props}>
                <Dropdown.ToggleButton>Выпадающий список</Dropdown.ToggleButton>
                <Dropdown.Body className="my-super-class">
                    <List size={'lg'} variant={'white'}>
                        <List.Item>Главная</List.Item>
                        <List.Item href={'#'} as={'a'}>
                            Организация
                        </List.Item>
                        <List.Item href={'#'} as={'a'}>
                            Рассылки
                        </List.Item>
                    </List>
                </Dropdown.Body>
            </Dropdown>
        </>
    );
};

const DropShowBtn: React.FC = () => {
    const [show, setShow] = useState(true);
    const ref = useRef<HTMLButtonElement | null>(null);

    const toggleShow = () => setShow(!show);
    const handleClose = () => setShow(false);

    return (
        <>
            <Button buttonRef={ref as React.MutableRefObject<HTMLButtonElement>} onClick={toggleShow}>
                Выпадающий список
            </Button>
            <Dropdown white={true} parent={ref} show={show} onClose={handleClose}>
                <Dropdown.Body>
                    <List size={'lg'} variant={'white'}>
                        <List.Item href={'#'} as={'a'}>
                            Главная
                        </List.Item>
                        <List.Item href={'#'} as={'a'}>
                            Организация
                        </List.Item>
                        <List.Item href={'#'} as={'a'}>
                            Рассылки
                        </List.Item>
                    </List>
                </Dropdown.Body>
            </Dropdown>
        </>
    );
};

const DropItemBtn: React.FC = () => {
    const [show, setShow] = React.useState(true);
    const ref = React.useRef<HTMLButtonElement | null>(null);

    const toggleShow = () => {
        setShow(!show);
    };
    const handleClose = () => setShow(false);

    return (
        <>
            <List>
                <List.Item ref={ref} as={'button'} type={'button'} onClick={toggleShow}>
                    Выпадающий список
                </List.Item>
            </List>
            <Dropdown parent={ref} show={show} onClose={handleClose}>
                <Dropdown.Body>
                    <List size={'lg'} variant={'dark'}>
                        <List.Item href={'#'} as={'a'}>
                            Открыть главную страницу профиля
                        </List.Item>
                        <List.Item href={'#'} as={'a'}>
                            Организация
                        </List.Item>
                        <List.Item href={'#'} as={'a'}>
                            Рассылки
                        </List.Item>
                        <List.Item href={'#'} as={'a'}>
                            Рассылки
                        </List.Item>
                        <Dropdown.Button textPosition={'center'} label="Стать организатором" />
                    </List>
                </Dropdown.Body>
            </Dropdown>
        </>
    );
};

const DropProfile: React.FC = (props) => {
    return (
        <Dropdown show={true} {...props}>
            <Dropdown.ToggleButton>Выпадающий список</Dropdown.ToggleButton>
            <Dropdown.Body>
                <List variant="dark" size="lg">
                    <List.Group header={true} as="button" type="button" prefix={Prefix} suffix={Suffix}>
                        <div className="lflex lflex--y-axis">
                            <div className="lflex lflex--y-axis profile--name">
                                <span className="profile--main">Алексей</span>
                                <span className="t-small t-color-gray">+7 (985) 000 11 22</span>
                            </div>
                        </div>
                    </List.Group>
                    <List.Item href={'#'} as={'a'}>
                        Мои события
                    </List.Item>
                    <List.Item href={'#'} as={'a'}>
                        Мои подписки
                    </List.Item>
                    <List.Item href={'#'} as={'a'}>
                        Избранное
                    </List.Item>
                    <List.Item as={'button'} type={'button'} label="Выход" />
                    <Dropdown.Button textPosition={'center'} label="Стать организатором" />
                </List>
            </Dropdown.Body>
        </Dropdown>
    );
};

const DropLongItemList: React.FC = () => {
    return (
        <Dropdown show={true}>
            <Dropdown.ToggleButton>Выпадающий список</Dropdown.ToggleButton>
            <Dropdown.Body>
                <List variant="dark" size="lg">
                    {cities.map((item, index) => {
                        return <List.Item key={index}>{item}</List.Item>;
                    })}
                </List>
            </Dropdown.Body>
        </Dropdown>
    );
};

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Default</StoryTitle>
            <DropBtn />
        </>
    );
};

export const TopRightPosition: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Top right position</StoryTitle>
            <div style={{marginTop: '130px'}}>
                <DropBtn positions={'top-start'} />
            </div>
        </>
    );
};

export const CustomBody: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Custom body</StoryTitle>
            <DropCustomBody />
        </>
    );
};

export const OutsideOpenBtn: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Outside open button</StoryTitle>
            <DropShowBtn />
        </>
    );
};

export const ListItemAsButton: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>List item as button</StoryTitle>
            <DropItemBtn />
        </>
    );
};

export const ProfileDrop: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Profile Drop</StoryTitle>
            <DropProfile />
        </>
    );
};

export const WithLongItemList: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>With long item list</StoryTitle>
            <DropLongItemList />
        </>
    );
};

const MemberFiltersEditCurrentTemplate: FC<any> = ({childrenRef}) => {
    return (
        <Dropdown positions={'bottom-end'}>
            <div className="mtheme--darkpic">
                <Dropdown.ToggleButton label="open" />
            </div>
            <Dropdown.Body ref={childrenRef}>
                <List variant="dark">
                    <List.Item
                        suffix={<DropProfile />}
                        className="mtheme--darkpic"
                        onClick={(e: any) => e.stopPropagation()}
                    >
                        тест
                    </List.Item>
                    <List.Item className="mtheme--darkpic" onClick={(e: any) => e.stopPropagation()}>
                        <input type="text" name="name" />
                    </List.Item>
                </List>
            </Dropdown.Body>
        </Dropdown>
    );
};

export const DropDownInDropDown: IStorybookComponent = () => {
    const childrenRef = useRef(null);
    return (
        <>
            <StoryTitle>DropDown in DropDown</StoryTitle>
            <Dropdown childrenRef={childrenRef} withIcons positions={'bottom-end'}>
                <Dropdown.ToggleButton label="Все" />
                <Dropdown.Body>
                    <List variant="dark">
                        <List.Item
                            suffix={<MemberFiltersEditCurrentTemplate childrenRef={childrenRef} />}
                            className="mtheme--darkpic"
                            onClick={(e: any) => e.stopPropagation()}
                        >
                            Сортируйте
                        </List.Item>
                    </List>
                </Dropdown.Body>
            </Dropdown>
        </>
    );
};
