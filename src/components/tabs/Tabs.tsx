import * as React from 'react';
import {createContext, FC, HTMLAttributes, useMemo} from 'react';
import {Tab, TabId} from './Tab';
import {TabContent} from './TabContent';
import {TabList} from './TabList';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {action, observable} from 'mobx';

import './index.less';
import {IAdditionalAttributes} from '../../../types';
import {qaTags} from '../../services';

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

export interface ITabProps extends HTMLAttributes<HTMLDivElement>, IAdditionalAttributes {
    defaultTabId?: TabId;
    activeTabId?: TabId;
    onTabClick?: (TabId: string, setActiveTabId: (id: string) => void) => void;
}

const TabsBase: FC<React.PropsWithChildren<ITabProps>> = ({
    children,
    defaultTabId,
    activeTabId,
    onTabClick,
    className,
    ...props
}) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialTabId = useMemo(() => defaultTabId, []);
    const divClasses = cx(component('tab-bar')(), className);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const tabsStore = useMemo(
        () => new TabsStore(initialTabId !== undefined ? initialTabId : activeTabId),
        [activeTabId],
    );
    const handleOnTabClick: TabClickHandler = onTabClick
        ? (TabId: string) => {
              onTabClick(TabId, tabsStore.setActiveTabId);
          }
        : (TabId: string) => {
              tabsStore.setActiveTabId(TabId);
          };

    return (
        <div {...props} className={divClasses} data-qa={props['data-qa'] || qaTags.tabs}>
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
