import React, {FC, useState} from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Tabs} from './Tabs';

import 'css/bundle.less';
//todo:@glotov refacror after storybookHelpers pr
import {StoryTitle} from '../button/Button.stories';
import {TId} from './Tab';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'TabBar',
    component: Tabs,
} as Meta;

export const Primary: IStorybookComponent = () => {
    const [activeId, setActiveId] = useState<TId>('wwx2');
    const testTabclick = (id: TId) => {
        setActiveId(id);
        alert(`id of this item is ${id}`);
    };
    const items: {id: TId; label: string; content: string; onTabClick?: (id: TId) => void}[] = [
        {
            id: 0,
            label: 'first',
            content: 'firstContent',
        },
        {
            id: 1,
            label: 'second',
            content: 'secondContent',
        },
        {
            id: 3,
            label: 'third',
            content: 'thirdContent',
        },
        {
            id: 'wwx2',
            label: 'string Id',
            content: 'some stringId content',
            onTabClick: testTabclick,
        },
    ];

    return (
        <>
            <StoryTitle>Tabs</StoryTitle>
            <Tabs>
                <Tabs.List>
                    {items.map(({id, label, onTabClick = setActiveId}) => (
                        <Tabs.Tab key={id} id={id} isActive={id === activeId} onTabClick={onTabClick}>
                            {label}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>
                {items.map(({id, content}) => (
                    <Tabs.Content key={id} isActive={id === activeId}>
                        {content}
                    </Tabs.Content>
                ))}
            </Tabs>
        </>
    );
};
