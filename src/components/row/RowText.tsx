import React from 'react';
import cx from 'classnames';
import './index.less';

const RowText: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
    const classNames = cx('crow--body--text', props.className);

    return (
        <div {...props} className={classNames}>
            {props.children}
        </div>
    );
};

export default RowText;
