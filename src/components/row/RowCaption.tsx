import * as React from 'react';
import cx from 'classnames';
import './index.less';

const Caption: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (
    props,
): JSX.Element => {
    const {children, className} = props;
    const classNames = cx('crow--body--caption', className);

    return (
        <div {...props} className={classNames}>
            {children}
        </div>
    );
};

export default Caption;
