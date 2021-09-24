import React, {FC} from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Dropdown} from './index';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import './storybook/demo.less';
import {List} from '../list';
import {Button} from '../button';
import AddIcon from 'svg/24/icon-plus-24.svg';
import {cities} from '../../data/cities';
import {Pic} from '../userpic';

export default {
    title: 'DropDown',
    component: Dropdown,
} as Meta;

const Prefix: React.FC = () => <Pic interactive />;
const Suffix: React.FC = () => <AddIcon />;

const DropBtn: React.FC = () => {
    return (
        <>
            <Dropdown trigger={() => <Button>Выпадающий список</Button>}>
                <List size={'lg'} variant={'dark'}>
                    <List.Item as={'button'} type={'button'}>
                        Primary text
                    </List.Item>
                    <List.Item href={'#'} as={'a'}>
                        Primary text
                    </List.Item>
                    <List.Item href={'#'} as={'a'}>
                        Primary text
                    </List.Item>
                </List>
            </Dropdown>
        </>
    );
};

const DropCustomBody: React.FC = () => {
    return (
        <>
            <Dropdown modifier={'custombody'} trigger={() => <Button>Выпадающий список</Button>}>
                <List size={'lg'} variant={'dark'}>
                    <List.Item as={'button'} type={'button'}>
                        Primary text
                    </List.Item>
                    <List.Item href={'#'} as={'a'}>
                        Primary text
                    </List.Item>
                    <List.Item href={'#'} as={'a'}>
                        Primary text
                    </List.Item>
                </List>
            </Dropdown>
        </>
    );
};

const DropProfile: React.FC = () => {
    return (
        <Dropdown trigger={() => <Button>Выпадающий список</Button>}>
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
                <List.Item className={'mtheme--darkpic'} as={'button'} type={'button'}>
                    <Button label="Стать организатором" />
                </List.Item>
            </List>
        </Dropdown>
    );
};

const DropLongItemList: React.FC = () => {
    return (
        <Dropdown trigger={() => <Button>Выпадающий список</Button>}>
            <List variant="dark" size="lg">
                {cities.map((item, index) => {
                    return <List.Item key={index}>{item}</List.Item>;
                })}
            </List>
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
                <DropBtn />
            </div>
        </>
    );
};

export const CustomBody: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Custom body</StoryTitle>
            <div style={{marginTop: '130px'}}>
                <DropCustomBody />
            </div>
        </>
    );
};

export const ProfileDrop: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Profile Drop</StoryTitle>
            <div style={{marginTop: '130px'}}>
                <DropProfile />
            </div>
        </>
    );
};

export const MemberFiltersEdit: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Profile Drop</StoryTitle>
            <div style={{marginTop: '130px'}}>
                <MemberFiltersEditCurrentTemplate />
            </div>
        </>
    );
};

export const WithLongItemList: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>With long item list</StoryTitle>
            <div style={{marginTop: '130px'}}>
                <DropLongItemList />
            </div>
        </>
    );
};

const MemberFiltersEditCurrentTemplate: FC = () => {
    return (
        <Dropdown
            trigger={() => {
                return (
                    <div className="mtheme--darkpic">
                        <Button>open</Button>
                    </div>
                );
            }}
        >
            <List variant="dark">
                <List.Item
                    suffix={<MemberFiltersEditCurrentTemplate />}
                    className="mtheme--darkpic"
                    onClick={(e: any) => e.stopPropagation()}
                >
                    тест
                </List.Item>
                <List.Item className="mtheme--darkpic" onClick={(e: any) => e.stopPropagation()}>
                    <input type="text" name="name" />
                </List.Item>
            </List>
        </Dropdown>
    );
};
