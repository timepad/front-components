import React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {DropdownPopup} from './index';
import {IDropdownProps} from '../dropdown/Dropdown';
import {List} from '../list';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Button} from '../button';
import {cities} from '../../data/cities';
// import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';

// import 'css/bundle.less';
// import './storybook/demo.less';
// import {List} from '../list';
// import {Button} from '../button';
// import {IDropdownProps} from '../dropdown/Dropdown';
// import AddIcon from 'svg/24/icon-plus-24.svg';
// import {cities} from '../../data/cities';
// import {Pic} from '../userpic';

export default {
    title: 'DropDown-popup',
    component: DropdownPopup,
} as Meta;

const DropBtn: React.FC<IDropdownProps> = () => {
    return (
        <>
            <DropdownPopup
                trigger={() => <Button>Выпадающий список</Button>}
                position="right-center"
                on={['click', 'hover']}
                closeOnDocumentClick
                mouseLeaveDelay={100}
                mouseEnterDelay={0}
                contentStyle={{padding: '0px', border: 'none'}}
            >
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
            </DropdownPopup>
        </>
    );
};
const DropBtnLong: React.FC<IDropdownProps> = () => {
    return (
        <>
            <DropdownPopup
                trigger={() => <Button>Выпадающий список</Button>}
                position="right-center"
                on={['click', 'hover']}
                closeOnDocumentClick
                mouseLeaveDelay={100}
                mouseEnterDelay={0}
                contentStyle={{maxHeight: '200px', overflow: 'scroll'}}
            >
                <List size={'lg'} variant={'dark'}>
                    {cities.map((item, index) => {
                        return <List.Item key={index}>{item}</List.Item>;
                    })}
                </List>
            </DropdownPopup>
        </>
    );
};
const DropBtnNested: React.FC<IDropdownProps> = () => {
    return (
        <>
            <DropdownPopup
                trigger={() => <Button>Выпадающий список</Button>}
                position="right-top"
                on={['click', 'hover']}
                closeOnDocumentClick
                mouseLeaveDelay={100}
                mouseEnterDelay={0}
                contentStyle={{padding: '0px', border: 'none'}}
                nested
            >
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
                    <List.Item>
                        <DropdownPopup
                            trigger={() => <Button>Выпадающий список</Button>}
                            position="right-top"
                            on={['click', 'hover']}
                            closeOnDocumentClick
                            mouseLeaveDelay={100}
                            mouseEnterDelay={0}
                            contentStyle={{padding: '0px', border: 'none'}}
                            nested
                        >
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
                        </DropdownPopup>
                    </List.Item>
                </List>
            </DropdownPopup>
        </>
    );
};
const ModalBtn: React.FC<IDropdownProps> = () => {
    return (
        <>
            <DropdownPopup
                trigger={() => <Button>Выпадающий список</Button>}
                overlayStyle={{background: '#ffffffdf'}}
                modal
            >
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
                    <List.Item>
                        <DropdownPopup
                            trigger={() => <Button>Выпадающий список</Button>}
                            position="right-top"
                            on={['click', 'hover']}
                            closeOnDocumentClick
                            mouseLeaveDelay={100}
                            mouseEnterDelay={0}
                            contentStyle={{padding: '0px', border: 'none'}}
                            nested
                        >
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
                        </DropdownPopup>
                    </List.Item>
                </List>
            </DropdownPopup>
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
export const LongList: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Long List</StoryTitle>
            <div style={{marginTop: '130px'}}>
                <DropBtnLong />
            </div>
        </>
    );
};
export const Nested: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Nested</StoryTitle>
            <div style={{marginTop: '130px'}}>
                <DropBtnNested />
            </div>
        </>
    );
};
export const Modal: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Nested</StoryTitle>
            <div style={{marginTop: '130px'}}>
                <ModalBtn />
            </div>
        </>
    );
};
// const Prefix: React.FC = () => <Pic interactive />;
// const Suffix: React.FC = () => <AddIcon />;
