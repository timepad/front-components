import React, {FC, useState, MouseEvent} from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Dropdown} from './index';
import {IStorybookComponent, StoryDescription, StoryTitle} from '../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import './storybook/demo.less';
import {List} from '../list';
import {Button, IButtonProps} from '../button';
import AddIcon from 'svg/24/icon-plus-24.svg';
import {cities} from '../../data/cities';
import {Pic} from '../userpic';
import {IDropdownProps} from './interfaces';
import {Brick, Form, Typography} from 'index';

export default {
    title: 'DropDown',
    component: Dropdown,
} as Meta;

const Prefix: React.FC = () => <Pic hoverable />;
const Suffix: React.FC = () => <AddIcon />;

const DropBtn: React.FC<Omit<IButtonProps & IDropdownProps, 'trigger'>> = (props) => {
    return (
        <>
            <Dropdown {...props} trigger={() => <Button label={'Выпадающий список'} {...props} />}>
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

const DropSortable: React.FC = () => {
    const data: number[] = [];
    for (let i = 1; i < 10; i++) {
        data.push(i);
    }
    const [sortedData, setSortedData] = useState<number[]>([]);

    const handleItemClick = (e: MouseEvent<HTMLDivElement>, value: number) => {
        // eslint-disable-next-line no-console
        console.log('Clicked value: ', value);
    };

    return (
        <>
            <StoryDescription>Отсортированный список: {sortedData.join(' ')}</StoryDescription>
            <Dropdown.SList
                priorityPositions="right-top"
                onClose={(sortedValues) => setSortedData(sortedValues)}
                onSort={(sortedValues) => setSortedData(sortedValues)}
                trigger={() => <Button>Выпадающий список</Button>}
            >
                {data.map((el) => (
                    <Dropdown.SItem value={el} key={el} onClick={handleItemClick}>
                        Перемещаемый элемент {el}
                    </Dropdown.SItem>
                ))}
            </Dropdown.SList>
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
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Dropdown trigger={() => <List.Item>Выпадающий список</List.Item>} on="hover">
                        <List variant="dark" size="lg">
                            <List.Item href={'#'} as={'a'}>
                                Мои события
                            </List.Item>
                            <List.Item href={'#'} as={'a'}>
                                Мои подписки
                            </List.Item>
                        </List>
                    </Dropdown>
                </div>
                <List.Item as={'button'} type={'button'} label="Выход" />
                <Dropdown.Button label="Стать организатором" />
            </List>
        </Dropdown>
    );
};

const DropLongItemList: React.FC<Omit<IDropdownProps, 'trigger'>> = (props) => {
    return (
        <Dropdown {...props} trigger={() => <Button>Выпадающий список</Button>}>
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
    const allPositions: IDropdownProps['priorityPositions'][] = [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
    ];
    const bottomTopPos: IDropdownProps['priorityPositions'][] = [
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
                <div className="horizontal-grid">
                    {bottomTopPos.map((pos) => (
                        <DropBtn
                            style={{width: '100%', justifyContent: 'center'}}
                            key={pos as string}
                            priorityPositions={pos}
                            label={pos as string}
                        />
                    ))}
                </div>
                <div className="vertical-grid">
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

export const RecursiveEditableDropdownExample: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Profile Drop</StoryTitle>
            <StoryDescription>
                Возможность вкладывать дропдауны друг в друга. Может быть использовано для настройки таблиц (например
                участников)
            </StoryDescription>
            <div style={{marginTop: '130px'}}>
                <RecursiveEditableDropdown />
            </div>
        </>
    );
};

export const WithLongItemList: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>With long item list</StoryTitle>
            <StoryDescription>Ниже есть еще 2 кнопки</StoryDescription>
            <div style={{marginTop: '130px', display: 'flex', justifyContent: 'space-between'}}>
                <DropLongItemList />
                <DropLongItemList priorityPositions={'left-center'} />
            </div>
            <div style={{marginTop: '1000px', display: 'flex', justifyContent: 'space-between'}}>
                <DropLongItemList />
                <DropLongItemList priorityPositions={'left-center'} />
            </div>
        </>
    );
};

const RecursiveEditableDropdown: FC<{text?: string}> = () => {
    const [nextBlockText, setNextBlockText] = useState('');
    return (
        <Dropdown
            nested
            trigger={() => {
                return (
                    <div className="mtheme--darkpic">
                        <Button>Open</Button>
                    </div>
                );
            }}
        >
            <List variant="dark">
                <List.Item
                    suffix={<RecursiveEditableDropdown text={nextBlockText} />}
                    className="mtheme--darkpic"
                    onClick={(e: any) => e.stopPropagation()}
                >
                    {nextBlockText || 'Вложенный фильтр'}
                </List.Item>
                <List.Item className="mtheme--darkpic" onClick={(e: any) => e.stopPropagation()}>
                    <input type="text" name="name" onChange={(e: any) => setNextBlockText(e.target.value)} />
                </List.Item>
            </List>
        </Dropdown>
    );
};

export const RepositionOnChangeContent: FC = () => {
    const [str, setStr] = useState('Some text');
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Dropdown
                trigger={() => <Button label={'Пересчитывает положение при изменении контента'} />}
                priorityPositions={'bottom-center'}
                repositionOnChangeContent={true}
                onClose={() => setStr('Some text')}
            >
                <div className="mtheme--darkpic" style={{padding: '8px', background: '#252525', color: '#ffffff'}}>
                    <Typography.Body size={16}>{str}</Typography.Body>
                    <Brick />
                    <Form.Text value={str} onChange={(e) => setStr(e.target.value)} />
                </div>
            </Dropdown>
            <Brick size={10} />
            <Dropdown
                trigger={() => <Button label={'Находится там, где был открыт изначально'} />}
                priorityPositions={'bottom-center'}
                repositionOnChangeContent={false}
                onClose={() => setStr('Some text')}
            >
                <div className="mtheme--darkpic" style={{padding: '8px', background: '#252525', color: '#ffffff'}}>
                    <Typography.Body size={16}>{str}</Typography.Body>
                    <Brick />
                    <Form.Text value={str} onChange={(e) => setStr(e.target.value)} />
                </div>
            </Dropdown>
        </div>
    );
};
