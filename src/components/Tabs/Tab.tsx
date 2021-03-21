import React, {FC, HTMLAttributes, ReactNode, useContext} from 'react';
import cx from 'classnames';
import {TabsContext} from './Tabs';

export type TId = number | string;

interface ITabProps extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
    onTabClick: (id: TId) => void;
    id: TId;
    children: ReactNode;
}

export const Tab: FC<ITabProps> = ({children, className, id, onTabClick, ...restProps}) => {
    const liClasses = cx('ctab-bar__li', className);
    const {activeId} = useContext(TabsContext);

    return (
        <li {...restProps} className={`${liClasses} ${activeId === id ? 'ctab-bar__li--is-active' : ''}`}>
            <button className="ctab-bar__button" onClick={() => onTabClick(id)}>
                {children}
            </button>
        </li>
    );
};
