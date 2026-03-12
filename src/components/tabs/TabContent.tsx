import * as React from 'react';
import {FC, HTMLAttributes, useContext} from 'react';
import cx from 'classnames';
import {TabsContext} from './Tabs';
import {TabId} from './Tab';
import {component} from '../../services/helpers/classHelpers';
import {observer} from 'mobx-react';
import {qaTags} from '../../services';

export interface ITabContent extends HTMLAttributes<HTMLDivElement> {
    tabId: TabId;
}

export const TabContent: FC<React.PropsWithChildren<ITabContent>> = observer(
    ({children, tabId, className, ...restProps}) => {
        const {tabsStore} = useContext(TabsContext);
        const divClasses = cx(component('tab-bar', 'content')(), className);

        return tabsStore.activeTabId === tabId ? (
            <div {...restProps} className={divClasses} data-qa={qaTags.tabsItemContent}>
                {children}
            </div>
        ) : null;
    },
);
