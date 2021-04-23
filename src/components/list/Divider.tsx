import React from 'react';
import cx from 'classnames';

interface IProps {
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}

export const Divider: React.FC<IProps> = ({className, as = 'div', ...props}) => {
    const Tag = as;
    const rowClass = cx('clist-divider', className);
    return <Tag className={rowClass} {...props} />;
};
