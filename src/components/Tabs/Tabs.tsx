import React, {FC, HTMLAttributes} from 'react';
import {Tab} from './Tab';
import {TabContent} from './TabContent';
import {TabList} from './TabList';
import cx from 'classnames';

import './ctabBar.less';

const tabComponents = {
    Tab,
    Content: TabContent,
    List: TabList,
};

const BaseTabBar: FC<HTMLAttributes<HTMLDivElement>> = ({children, className, ...restProps}) => {
    const divClasses = cx('ctab-bar', className);

    return (
        <div {...restProps} className={divClasses}>
            {children}
        </div>
    );
};

export const Tabs = Object.assign(BaseTabBar, tabComponents);
