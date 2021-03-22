import React, {FC, HTMLAttributes, ReactNode, useContext} from 'react';
import cx from 'classnames';
import {TabsContext} from './Tabs';
import {component} from '../../services/helpers/classHelpers';

export type TId = number | string;

interface ITabProps extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
    onTabClick: (id: TId) => void;
    id: TId;
}

export const Tab: FC<ITabProps> = ({children, className, id, onTabClick, ...restProps}) => {
    const {activeId} = useContext(TabsContext);
    const liClasses = cx(component('ctab-bar', 'li')({['is-active']: activeId === id}), className);
    const buttonClasses = component('ctab-bar', 'button')();

    return (
        <li {...restProps} className={liClasses}>
            <button className={buttonClasses} onClick={() => onTabClick(id)}>
                {children}
            </button>
        </li>
    );
};
