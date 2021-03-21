import React, {FC, HTMLAttributes, useContext} from 'react';
import cx from 'classnames';
import {TabsContext} from './Tabs';
import {TId} from './Tab';

export interface ITabContent extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
    id: TId;
}

export const TabContent: FC<ITabContent> = ({children, id, className, ...restProps}) => {
    const divClasses = cx('ctab-bar__content', className);
    const {activeId} = useContext(TabsContext);

    return activeId === id ? (
        <div {...restProps} className={divClasses}>
            {children}
        </div>
    ) : null;
};
