import React, {FC, ReactNode, useState} from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Tabs} from './Tabs';
import {TId} from './Tab';
import 'css/bundle.less';

//todo:@glotov refacror after storybookHelpers pr
const StoryTitle = ({children}: {children: ReactNode}) => {
    return (
        <>
            <span className="t-caption t-caption-16" style={{color: '#808080'}}>
                {children}
            </span>
            <hr className="cdivider cdivider--thin" />
            <div className="lbrick-2" />
        </>
    );
};

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Tabs',
    component: Tabs,
} as Meta;

export const Primary: IStorybookComponent = () => {
    const [activeId, setActiveId] = useState<TId>(1);
    const testTabclick = (id: TId) => {
        //this is a custom click handler
        setActiveId(id);
    };
    const items: {id: TId; label: string; content: string; onTabClick?: (id: TId) => void}[] = [
        {
            id: 0,
            label: 'First',
            content: 'firstContent',
        },
        {
            id: 1,
            label: 'Second',
            content: 'secondContent',
        },
        {
            id: 3,
            label: 'Third',
            content: 'thirdContent',
        },
        {
            id: 'Fourth',
            label: 'Fourth',
            content: 'some stringId content',
            onTabClick: testTabclick,
        },
    ];

    return (
        <>
            <StoryTitle>Tabs</StoryTitle>
            <Tabs duration={150} activeId={activeId}>
                <Tabs.List>
                    {items.map(({id, label, onTabClick = setActiveId}) => (
                        <Tabs.Tab key={id} id={id} onTabClick={onTabClick}>
                            {label}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>
                {items.map(({id, content}) => (
                    <Tabs.Content key={id} id={id}>
                        {content}
                    </Tabs.Content>
                ))}
            </Tabs>
        </>
    );
};
