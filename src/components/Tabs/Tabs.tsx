import React, {createContext, FC, HTMLAttributes} from 'react';
import {Tab} from './Tab';
import {TabContent} from './TabContent';
import {TabList} from './TabList';
import cx from 'classnames';

import './ctabBar.less';

export const DurationContext = createContext<number>(0);

export interface ITabProps extends HTMLAttributes<HTMLDivElement> {
    duration?: number;
}

const tabComponents = {
    Tab,
    Content: TabContent,
    List: TabList,
};

const BaseTabBar: FC<ITabProps> = ({children, duration = 150, className, ...restProps}) => {
    const divClasses = cx('ctab-bar', className);

    return (
        <div {...restProps} className={divClasses}>
            <DurationContext.Provider value={duration}>{children}</DurationContext.Provider>
        </div>
    );
};

export const Tabs = Object.assign(BaseTabBar, tabComponents);
