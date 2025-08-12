import * as React from 'react';
import {FC, HTMLAttributes, useContext} from 'react';
import cx from 'classnames';
import {TabsContext} from './Tabs';
import {TabId} from './Tab';
import {component} from '../../services/helpers/classHelpers';

export interface ITabContent extends HTMLAttributes<HTMLDivElement> {
    tabId: TabId;
}

export const TabContent: FC<React.PropsWithChildren<ITabContent>> = ({children, tabId, className, ...restProps}) => {
    const {activeTabId} = useContext(TabsContext);
    const divClasses = cx(component('tab-bar', 'content')(), className);

    return activeTabId === tabId ? (
        <div {...restProps} className={divClasses}>
            {children}
        </div>
    ) : null;
};
