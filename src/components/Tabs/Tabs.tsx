import React, {createContext, FC, HTMLAttributes} from 'react';
import {Tab, TId} from './Tab';
import {TabContent} from './TabContent';
import {TabList} from './TabList';
import cx from 'classnames';

import './ctabBar.less';

export interface ITabsContext {
    duration: number;
    activeId: TId;
}
export const TabsContext = createContext<ITabsContext>({duration: 150, activeId: 0});

export interface ITabProps extends HTMLAttributes<HTMLDivElement> {
    duration?: number;
    activeId: TId;
}

const tabComponents = {
    Tab,
    Content: TabContent,
    List: TabList,
};

const BaseTabBar: FC<ITabProps> = ({children, duration = 150, activeId, className, ...restProps}) => {
    const divClasses = cx('ctab-bar', className);

    return (
        <div {...restProps} className={divClasses}>
            <TabsContext.Provider value={{duration, activeId}}>{children}</TabsContext.Provider>
        </div>
    );
};

export const Tabs = Object.assign(BaseTabBar, tabComponents);
