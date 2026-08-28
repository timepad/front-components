import * as React from 'react';
import {FC, HTMLAttributes, useContext, useEffect} from 'react';
import cx from 'classnames';
import {TabsContext} from './Tabs';
import {component} from '../../services/helpers/classHelpers';
import {IAdditionalAttributes} from '../../../types';
import {qaTags} from '../../services';

export type TabId = string;

interface ITabProps extends HTMLAttributes<HTMLLIElement>, IAdditionalAttributes {
    tabId: TabId;
}

export const Tab: FC<React.PropsWithChildren<ITabProps>> = ({children, className, tabId, ...props}) => {
    const {activeTabId, setActiveTabId, handleOnTabClick} = useContext(TabsContext);
    const isActive = activeTabId === tabId;

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
        <li {...props} className={liClasses} data-qa={isActive ? qaTags.tabsItemSelected : props['data-qa']}>
            <button className={buttonClasses} onClick={() => handleOnTabClick(tabId)}>
                {children}
            </button>
        </li>
    );
};
