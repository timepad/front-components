import * as React from 'react';
import {FC, HTMLAttributes, useContext, useEffect} from 'react';
import cx from 'classnames';
import {TabsContext} from './Tabs';
import {component} from '../../services/helpers/classHelpers';

export type TabId = string;

interface ITabProps extends HTMLAttributes<HTMLLIElement> {
    tabId: TabId;
}

export const Tab: FC<React.PropsWithChildren<ITabProps>> = ({children, className, tabId, ...rest}) => {
    const {activeTabId, setActiveTabId, handleOnTabClick} = useContext(TabsContext);
    const liClasses = cx(component('tab-bar', 'li')({['is-active']: activeTabId === tabId}), className);
    const buttonClasses = component('tab-bar', 'button')();

    // set default tab id to this id, if empty
    useEffect(() => {
        if (!activeTabId) {
            setActiveTabId(tabId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <li {...rest} className={liClasses}>
            <button className={buttonClasses} onClick={() => handleOnTabClick(tabId)}>
                {children}
            </button>
        </li>
    );
};
