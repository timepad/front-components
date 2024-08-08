import React, {FC, useState, MouseEvent, useMemo, ReactElement} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Dropdown} from './index';
import {IStorybookComponent, StoryDescription, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {List} from '../list';
import {Button, ButtonVariant} from '../button';
import IconEdit from 'assets/svg/24/icon-edit-24.svg';
import {cities} from '../../data/cities';
import {Pic} from '../userpic';
import {IDropdownProps} from './interfaces';
import {Brick, Form, Row, Typography, useMedia} from 'index';
import {Divider} from '../divider';

import 'css/bundle.less';
import './storybook/demo.less';

export default {
    title: 'DropDown',
    component: Dropdown,
} as Meta;

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Default</StoryTitle>
            <Dropdown trigger={() => <Button label={'Выпадающий список'} />}>
                <div className="mtheme--darkpic-bg mtheme--darkpic mtheme--darkpic-bg">
                    <Row hoverable>
                        <Row.Body>
                            <Row.Text>Primary text 1</Row.Text>
                            <Row.Caption>Secondary text</Row.Caption>
                        </Row.Body>
                    </Row>
                    <Row hoverable>
                        <Row.Body>
                            <Row.Text>Primary text 2</Row.Text>
                        </Row.Body>
                    </Row>
                    <Row hoverable>
                        <Row.Body>
                            <Row.Text>Primary text 3</Row.Text>
                        </Row.Body>
                    </Row>
                </div>
            </Dropdown>
        </>
    );
};

export const VariousPositions: IStorybookComponent = () => {
    const topBottomPositions: IDropdownProps['priorityPositions'][] = [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
    ];
    const leftRightPositions: IDropdownProps['priorityPositions'][] = [
        'right-top',
        'right-center',
        'right-bottom',
        'left-top',
        'left-center',
        'left-bottom',
    ];
    const cornerPositions: IDropdownProps['priorityPositions'][] = [
        'corner-top-left',
        'corner-bottom-left',
        'corner-bottom-right',
        'corner-top-right',
    ];
    return (
        <>
            <StoryTitle>Various positions</StoryTitle>
            <StoryDescription>Открывает дропдаун относительно контейнера кнопки</StoryDescription>
            <div style={{marginTop: '40px'}}>
                <div className="horizontal-grid">
                    {leftRightPositions.map((pos) => (
                        <Dropdown
                            key={pos as string}
                            priorityPositions={pos}
                            trigger={() => (
                                <Button label={pos as string} style={{width: '100%', justifyContent: 'center'}} />
                            )}
                        >
                            <div className="mtheme--darkpic-bg mtheme--darkpic mtheme--darkpic-bg">
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>Primary text 1</Row.Text>
                                        <Row.Caption>Secondary text</Row.Caption>
                                    </Row.Body>
                                </Row>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>Primary text 2</Row.Text>
                                    </Row.Body>
                                </Row>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>Primary text 3</Row.Text>
                                    </Row.Body>
                                </Row>
                            </div>
                        </Dropdown>
                    ))}
                </div>
                <div className="vertical-grid">
                    {topBottomPositions.map((pos) => (
                        <Dropdown
                            key={pos as string}
                            priorityPositions={pos}
                            trigger={() => (
                                <Button label={pos as string} style={{width: '100%', justifyContent: 'center'}} />
                            )}
                        >
                            <div className="mtheme--darkpic-bg mtheme--darkpic mtheme--darkpic-bg">
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>Primary text 1</Row.Text>
                                        <Row.Caption>Secondary text</Row.Caption>
                                    </Row.Body>
                                </Row>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>Primary text 2</Row.Text>
                                    </Row.Body>
                                </Row>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>Primary text 3</Row.Text>
                                    </Row.Body>
                                </Row>
                            </div>
                        </Dropdown>
                    ))}
                </div>
                <div style={{margin: '0 auto', display: 'table'}}>
                    <Dropdown priorityPositions="center-center" trigger={() => <Button label="center-center" />}>
                        <div className="mtheme--darkpic-bg mtheme--darkpic mtheme--darkpic-bg">
                            <Row hoverable>
                                <Row.Body>
                                    <Row.Text>Primary text 1</Row.Text>
                                    <Row.Caption>Secondary text</Row.Caption>
                                </Row.Body>
                            </Row>
                            <Row hoverable>
                                <Row.Body>
                                    <Row.Text>Primary text 2</Row.Text>
                                </Row.Body>
                            </Row>
                            <Row hoverable>
                                <Row.Body>
                                    <Row.Text>Primary text 3</Row.Text>
                                </Row.Body>
                            </Row>
                        </div>
                    </Dropdown>
                </div>
                <div className="horizontal-grid">
                    {cornerPositions.map((pos) => (
                        <Dropdown
                            key={pos as string}
                            priorityPositions={pos}
                            trigger={() => (
                                <Button label={pos as string} style={{width: '100%', justifyContent: 'center'}} />
                            )}
                        >
                            <div className="mtheme--darkpic-bg mtheme--darkpic mtheme--darkpic-bg">
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>Primary text 1</Row.Text>
                                        <Row.Caption>Secondary text</Row.Caption>
                                    </Row.Body>
                                </Row>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>Primary text 2</Row.Text>
                                    </Row.Body>
                                </Row>
                                <Row hoverable>
                                    <Row.Body>
                                        <Row.Text>Primary text 3</Row.Text>
                                    </Row.Body>
                                </Row>
                            </div>
                        </Dropdown>
                    ))}
                </div>
            </div>
        </>
    );
};

export const SortableList: IStorybookComponent = () => {
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
            <StoryTitle>Top right position</StoryTitle>
            <div style={{marginTop: '130px'}}>
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
            </div>
        </>
    );
};

export const CustomBodyImperative: IStorybookComponent = () => {
    const [isDPOpen, setIsDPOpen] = useState(false);
    const handleClose = () => {
        setIsDPOpen(false);
    };

    return (
        <>
            <StoryTitle>Custom body</StoryTitle>
            <div style={{marginTop: '130px'}}>
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
            </div>
        </>
    );
};

export const ProfileDrop: IStorybookComponent = () => {
    const {isMobilePortraitMax} = useMedia();
    const ProfileListData: string[] = useMemo(() => ['Мои покупки', 'Мои подписки', 'Избранное', 'Выйти'], []);
    const OrgListData: Array<{title: string; icon: ReactElement}> = useMemo(
        () => [
            {
                title: 'Организаторам',
                icon: <IconEdit />,
            },
            {
                title: 'Стать организатором',
                icon: <IconEdit />,
            },
        ],
        [],
    );
    return (
        <>
            <StoryTitle>Profile Drop</StoryTitle>
            <div className="floating-profile">
                <Dropdown
                    priorityPositions="bottom-left"
                    fixPositionOnScroll
                    triggerProps={{className: 'floating-profile__button'}}
                    trigger={() => (
                        <Pic
                            imgURL={'https://afisha.timepad.ru/static/images/main/eventcard.png'}
                            label="test_userpic"
                            hoverable
                        />
                    )}
                >
                    <Dropdown.Header mobile desktop>
                        <Row hoverable>
                            <Row.Icon>
                                <Pic
                                    imgURL={'https://afisha.timepad.ru/static/images/main/eventcard.png'}
                                    label="test_userpic"
                                    hoverable
                                />
                            </Row.Icon>
                            <Row.Body style={{padding: '9px 0'}}>
                                <Row.Text>
                                    <Typography variant="caption" fontWeight="bold" noPadding>
                                        Алексей
                                    </Typography>
                                </Row.Text>
                                <Row.Caption>
                                    <Typography variant="small" noPadding>
                                        +7 (985) 000 11 22
                                    </Typography>
                                </Row.Caption>
                            </Row.Body>
                            <Row.Icon>
                                <Button icon={<IconEdit />} variant={ButtonVariant.transparent} />
                            </Row.Icon>
                        </Row>
                    </Dropdown.Header>
                    <div className="mtheme--darkpic-bg mtheme--darkpic">
                        {ProfileListData.map((el) => (
                            <Row key={el} hoverable>
                                <Row.Body>
                                    <Row.Text>{el}</Row.Text>
                                </Row.Body>
                            </Row>
                        ))}
                        {isMobilePortraitMax && (
                            <>
                                <Divider />
                                {OrgListData.map((el) => (
                                    <Row key={el.title} hoverable>
                                        <Row.Body>
                                            <Row.Text>{el.title}</Row.Text>
                                        </Row.Body>
                                        <Row.Icon>{el.icon}</Row.Icon>
                                    </Row>
                                ))}
                            </>
                        )}
                        {!isMobilePortraitMax && <Dropdown.Button label="Стать организатором" />}
                    </div>
                </Dropdown>
            </div>
        </>
    );
};

export const RecursiveEditableDropdownExample: IStorybookComponent = () => {
    const RecursiveEditableDropdown: FC<React.PropsWithChildren<{text?: string}>> = () => {
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
                on={'hover'}
            >
                <List variant="dark">
                    <List.Item
                        suffix={<RecursiveEditableDropdown text={nextBlockText} />}
                        className="mtheme--darkpic"
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                    >
                        {nextBlockText || 'Вложенный фильтр'}
                    </List.Item>
                    <List.Item
                        className="mtheme--darkpic"
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                    >
                        <input
                            type="text"
                            name="name"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNextBlockText(e.target.value)}
                        />
                    </List.Item>
                </List>
            </Dropdown>
        );
    };

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
                <Dropdown trigger={() => <Button>Выпадающий список</Button>}>
                    <Dropdown.Header mobile>
                        <Row>
                            <Row.Body style={{padding: '9px 0'}}>
                                <Row.Text>
                                    <Typography variant="body" fontWeight="bold" noPadding>
                                        Длинный скролл для мобилки
                                    </Typography>
                                </Row.Text>
                            </Row.Body>
                        </Row>
                    </Dropdown.Header>
                    <div className="mtheme--darkpic-bg mtheme--darkpic">
                        {cities.map((item, index) => {
                            return (
                                <Row key={index} hoverable>
                                    <Row.Body>
                                        <Row.Text>{item}</Row.Text>
                                    </Row.Body>
                                </Row>
                            );
                        })}
                    </div>
                </Dropdown>
                <Dropdown priorityPositions={'left-center'} trigger={() => <Button>Выпадающий список</Button>}>
                    <Dropdown.Header mobile>
                        <Row>
                            <Row.Body style={{padding: '9px 0'}}>
                                <Row.Text>
                                    <Typography variant="body" fontWeight="bold" noPadding>
                                        Длинный скролл для мобилки
                                    </Typography>
                                </Row.Text>
                            </Row.Body>
                        </Row>
                    </Dropdown.Header>
                    <div className="mtheme--darkpic-bg mtheme--darkpic">
                        {cities.map((item, index) => {
                            return (
                                <Row key={index} hoverable>
                                    <Row.Body>
                                        <Row.Text>{item}</Row.Text>
                                    </Row.Body>
                                </Row>
                            );
                        })}
                    </div>
                </Dropdown>
            </div>
            <div style={{marginTop: '1000px', display: 'flex', justifyContent: 'space-between'}}>
                <Dropdown trigger={() => <Button>Выпадающий список</Button>}>
                    <Dropdown.Header mobile>
                        <Row>
                            <Row.Body style={{padding: '9px 0'}}>
                                <Row.Text>
                                    <Typography variant="body" fontWeight="bold" noPadding>
                                        Длинный скролл для мобилки
                                    </Typography>
                                </Row.Text>
                            </Row.Body>
                        </Row>
                    </Dropdown.Header>
                    <div className="mtheme--darkpic-bg mtheme--darkpic">
                        {cities.map((item, index) => {
                            return (
                                <Row key={index} hoverable>
                                    <Row.Body>
                                        <Row.Text>{item}</Row.Text>
                                    </Row.Body>
                                </Row>
                            );
                        })}
                    </div>
                </Dropdown>
                <Dropdown priorityPositions={'left-center'} trigger={() => <Button>Выпадающий список</Button>}>
                    <Dropdown.Header mobile>
                        <Row>
                            <Row.Body style={{padding: '9px 0'}}>
                                <Row.Text>
                                    <Typography variant="body" fontWeight="bold" noPadding>
                                        Длинный скролл для мобилки
                                    </Typography>
                                </Row.Text>
                            </Row.Body>
                        </Row>
                    </Dropdown.Header>
                    <div className="mtheme--darkpic-bg mtheme--darkpic">
                        {cities.map((item, index) => {
                            return (
                                <Row key={index} hoverable>
                                    <Row.Body>
                                        <Row.Text>{item}</Row.Text>
                                    </Row.Body>
                                </Row>
                            );
                        })}
                    </div>
                </Dropdown>
            </div>
        </>
    );
};

export const RepositionOnChangeContent: FC<React.PropsWithChildren<unknown>> = () => {
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
                    <Form.Text
                        value={str}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setStr(e.target.value)}
                    />
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
                    <Form.Text
                        value={str}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setStr(e.target.value)}
                    />
                </div>
            </Dropdown>
        </div>
    );
};
