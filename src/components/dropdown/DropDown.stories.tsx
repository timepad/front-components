import React, {FC, useState} from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Dropdown} from './index';
import {IStorybookComponent, StoryDescription, StoryTitle} from '../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import './storybook/demo.less';
import {List} from '../list';
import {Button} from '../button';
import AddIcon from 'svg/24/icon-plus-24.svg';
import {cities} from '../../data/cities';
import {Pic} from '../userpic';
import {SortableContainer, SortableElement, SortEnd} from 'react-sortable-hoc';
import {DropdownButtonProps} from './Dropdown';

export default {
    title: 'DropDown',
    component: Dropdown,
} as Meta;

const Prefix: React.FC = () => <Pic interactive />;
const Suffix: React.FC = () => <AddIcon />;

const DropBtn: React.FC<DropdownButtonProps> = (props) => {
    return (
        <>
            <Dropdown.Button label={'Выпадающий список'} {...props}>
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
            </Dropdown.Button>
        </>
    );
};

const Slist = SortableContainer(List);
const SListItem = SortableElement(List.Item);
const DropSortable: React.FC = () => {
    const [valueMap, setValueMap] = useState(
        new Map([
            [1, 1],
            [2, 2],
            [3, 3],
        ]),
    );

    const sortEndHandler = (sortEnd: SortEnd) => {
        const oldValue = valueMap.get(sortEnd.oldIndex);
        const newValue = valueMap.get(sortEnd.newIndex);
        if (oldValue && newValue) {
            valueMap.set(sortEnd.oldIndex, newValue);
            valueMap.set(sortEnd.newIndex, oldValue);

            setValueMap(new Map(valueMap.entries()));
        }
    };

    return (
        <>
            <Dropdown trigger={() => <Button>Выпадающий список</Button>}>
                <Slist onSortEnd={sortEndHandler} as={'ul'} size={'lg'} variant={'dark'}>
                    <SListItem className={'ztop'} as={'li'} key={'drop1'} index={1}>
                        {valueMap.get(1)}
                    </SListItem>
                    <SListItem className={'ztop'} as={'li'} href={'#'} key={'drop2'} index={2}>
                        {valueMap.get(2)}
                    </SListItem>
                    <SListItem className={'ztop'} as={'li'} href={'#'} key={'drop3'} index={3}>
                        {valueMap.get(3)}
                    </SListItem>
                </Slist>
            </Dropdown>
        </>
    );
};

const DropCustomBodyImperative: React.FC = () => {
    const [isDPOpen, setIsDPOpen] = useState(false);
    const handleClose = () => {
        setIsDPOpen(false);
    };

    return (
        <>
            <Dropdown
                show={isDPOpen}
                onClose={handleClose}
                modifier={'custombody'}
                trigger={({isOpen}) => <Button onClick={() => setIsDPOpen(!isOpen)}>Выпадающий список</Button>}
            >
                <List size={'lg'} variant={'dark'}>
                    <List.Item as={'button'} type={'button'} onClick={handleClose}>
                        Primary text
                    </List.Item>
                    <List.Item as={'div'} onClick={handleClose}>
                        Primary text
                    </List.Item>
                    <List.Item as={'div'} onClick={handleClose}>
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

export const VariousPositions: IStorybookComponent = () => {
    const allPositions: DropdownButtonProps['priorityPositions'][] = [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
    ];
    const bottomTopPos: DropdownButtonProps['priorityPositions'][] = [
        'right-top',
        'right-center',
        'right-bottom',
        'left-top',
        'left-center',
        'left-bottom',
    ];
    return (
        <>
            <StoryTitle>Various positions</StoryTitle>
            <StoryDescription>Открывает дропдаун относительно контейнера кнопки</StoryDescription>
            <div style={{marginTop: '40px'}}>
                <div className="vertical-grid">
                    {bottomTopPos.map((pos) => (
                        <DropBtn
                            style={{width: '100%', justifyContent: 'center'}}
                            key={pos as string}
                            priorityPositions={pos}
                            label={pos as string}
                        />
                    ))}
                </div>
                <div className="horizontal-grid">
                    {allPositions.map((pos) => (
                        <DropBtn
                            style={{width: '100%', justifyContent: 'center'}}
                            key={pos as string}
                            priorityPositions={pos}
                            label={pos as string}
                        />
                    ))}
                </div>
                <div style={{margin: '0 auto', display: 'table'}}>
                    <DropBtn priorityPositions="center-center" label="center-center" />
                </div>
            </div>
        </>
    );
};
export const SortableList: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Top right position</StoryTitle>
            Для обработки перетаскивания смотри аттрибут SortEnd
            <div style={{marginTop: '130px'}}>
                <DropSortable />
            </div>
        </>
    );
};
export const CustomBodyImperative: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Custom body</StoryTitle>
            <div style={{marginTop: '130px'}}>
                <DropCustomBodyImperative />
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
            nested
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
