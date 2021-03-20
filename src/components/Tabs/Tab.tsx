import React, {FC, HTMLAttributes, ReactNode} from 'react';
import cx from 'classnames';

export type TId = number | string;

interface ITabProps extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
    isActive: boolean;
    onTabClick: (id: TId) => void;
    id: TId;
    children: ReactNode;
}

export const Tab: FC<ITabProps> = ({children, className, id, isActive, onTabClick, ...restProps}) => {
    const liClasses = cx('ctab-bar__li', className);

    return (
        <li {...restProps} className={`${liClasses} ${isActive ? 'ctab-bar__li--is-active' : ''}`}>
            <button className="ctab-bar__button" onClick={() => onTabClick(id)}>
                {children}
            </button>
        </li>
    );
};
