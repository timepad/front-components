import * as React from 'react';
import {createContext, FC, HTMLAttributes, useMemo} from 'react';
import {Tab, TabId} from './Tab';
import {TabContent} from './TabContent';
import {TabList} from './TabList';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {action, observable} from 'mobx';

import './index.less';

class TabsStore {
    constructor(activeTabId = '') {
        this.activeTabId = activeTabId;
    }

    @observable activeTabId: string;
    @action.bound setActiveTabId(id: string) {
        this.activeTabId = id;
    }
}

interface ITabsStoreContext {
    tabsStore: TabsStore;
    handleOnTabClick: TabClickHandler;
}

export const TabsContext = createContext<ITabsStoreContext>({} as ITabsStoreContext);

type TabClickHandler = (TabId: string) => void;

export interface ITabProps extends HTMLAttributes<HTMLDivElement> {
    activeTabId: TabId;
    onTabClick?: (TabId: string, setActiveTabId: (id: string) => void) => void;
}

const TabsBase: FC<ITabProps> = ({children, activeTabId, onTabClick, className, ...rest}) => {
    const divClasses = cx(component('tab-bar')(), className);
    const tabsStore = useMemo(() => new TabsStore(activeTabId), [activeTabId]);
    const handleOnTabClick: TabClickHandler = onTabClick
        ? (TabId: string) => {
              onTabClick(TabId, tabsStore.setActiveTabId);
          }
        : (TabId: string) => {
              tabsStore.setActiveTabId(TabId);
          };

    return (
        <div {...rest} className={divClasses}>
            <TabsContext.Provider
                value={{
                    tabsStore: tabsStore,
                    handleOnTabClick: handleOnTabClick,
                }}
            >
                {children}
            </TabsContext.Provider>
        </div>
    );
};

const tabsChildren = {
    Tab,
    Content: TabContent,
    List: TabList,
};

export const Tabs = Object.assign(TabsBase, tabsChildren);
