import React, {FC, HTMLAttributes} from 'react';
import cx from 'classnames';

interface ITabContentProps extends HTMLAttributes<HTMLDivElement> {
    isActive: boolean;
}

export const TabContent: FC<ITabContentProps> = ({children, className, isActive, ...restProps}) => {
    const divClasses = cx('ctab-bar__content', className);

    return isActive ? (
        <div {...restProps} className={divClasses}>
            {children}
        </div>
    ) : null;
};
