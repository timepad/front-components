import * as React from 'react';
import {createContext, FC, HTMLAttributes, useMemo, useState} from 'react';
import {Tab, TabId} from './Tab';
import {TabContent} from './TabContent';
import {TabList} from './TabList';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

import './index.less';

interface ITabsStoreContext {
    handleOnTabClick: TabClickHandler;
    activeTabId: string;
    setActiveTabId: (id: string) => void;
}

export const TabsContext = createContext<ITabsStoreContext>({} as ITabsStoreContext);

type TabClickHandler = (TabId: string) => void;

export interface ITabProps extends HTMLAttributes<HTMLDivElement> {
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
    ...rest
}) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialTabId = useMemo(() => defaultTabId, [defaultTabId]);
    const [currentTabId, setCurrentTabId] = useState(initialTabId ?? activeTabId ?? '');
    const divClasses = cx(component('tab-bar')(), className);

    const handleOnTabClick: TabClickHandler = onTabClick
        ? (TabId: string) => {
              onTabClick(TabId, setCurrentTabId);
          }
        : (TabId: string) => {
              setCurrentTabId(TabId);
          };

    return (
        <div {...rest} className={divClasses}>
            <TabsContext.Provider
                value={{
                    handleOnTabClick: handleOnTabClick,
                    activeTabId: currentTabId,
                    setActiveTabId: setCurrentTabId,
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
