import React, {PropsWithChildren} from 'react';
import cx from 'classnames';

interface IProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
    className?: string;
}

export const Body: React.FC<IProps> = ({children, className}) => {
    const classNames = cx('cdrop__list', className);
    return <div className={classNames}>{children}</div>;
};
