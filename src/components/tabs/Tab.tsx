import * as React from 'react';
import {FC, HTMLAttributes, useContext} from 'react';
import cx from 'classnames';
import {TabsContext} from './Tabs';
import {component} from '../../services/helpers/classHelpers';
import {observer} from 'mobx-react';

export type TabId = string;

interface ITabProps extends HTMLAttributes<HTMLLIElement> {
    tabId: TabId;
}

export const Tab: FC<ITabProps> = observer(({children, className, tabId, ...rest}) => {
    const {tabsStore, handleOnTabClick} = useContext(TabsContext);
    const liClasses = cx(component('tab-bar', 'li')({['is-active']: tabsStore.activeTabId === tabId}), className);
    const buttonClasses = component('tab-bar', 'button')();

    return (
        <li {...rest} className={liClasses}>
            <button className={buttonClasses} onClick={() => handleOnTabClick(tabId)}>
                {children}
            </button>
        </li>
    );
});
