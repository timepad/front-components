import React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Popup} from './index';
import {List} from '../list';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Button} from '../button';
import {cities} from '../../data/cities';

export default {
    title: 'Popup',
    component: Popup,
} as Meta;

const DropBtn: React.FC<React.PropsWithChildren<unknown>> = () => {
    return (
        <>
            <Popup
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
            </Popup>
        </>
    );
};
const DropBtnLong: React.FC<React.PropsWithChildren<unknown>> = () => {
    return (
        <>
            <Popup
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
            </Popup>
        </>
    );
};
const DropBtnNested: React.FC<React.PropsWithChildren<unknown>> = () => {
    return (
        <>
            <Popup
                trigger={() => <Button>Выпадающий список</Button>}
                position="right-top"
                on={['click', 'hover']}
                closeOnDocumentClick
                mouseLeaveDelay={100}
                mouseEnterDelay={0}
                contentStyle={{padding: '0px', border: 'none'}}
                keepTooltipInside
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
                        <Popup
                            trigger={() => <Button>Выпадающий список</Button>}
                            position="right-top"
                            on={['click', 'hover']}
                            closeOnDocumentClick
                            mouseLeaveDelay={100}
                            mouseEnterDelay={0}
                            contentStyle={{padding: '0px', border: 'none'}}
                            nested
                            keepTooltipInside
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
                        </Popup>
                    </List.Item>
                </List>
            </Popup>
        </>
    );
};
const ModalBtn: React.FC<React.PropsWithChildren<unknown>> = () => {
    return (
        <>
            <Popup trigger={() => <Button>Выпадающий список</Button>} overlayStyle={{background: '#ffffffdf'}} modal>
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
                        <Popup
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
                        </Popup>
                    </List.Item>
                </List>
            </Popup>
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
