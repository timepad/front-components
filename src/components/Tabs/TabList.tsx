import React, {FC, HTMLAttributes} from 'react';
import cx from 'classnames';

export const TabList: FC<HTMLAttributes<HTMLDListElement>> = ({children, className, ...restProps}) => {
    const ulClasses = cx('ctab-bar__list', className);

    return (
        <ul {...restProps} className={ulClasses}>
            {children}
        </ul>
    );
};
