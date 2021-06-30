import React from 'react';
import './index.less';

const Caption: React.FC = ({children}): JSX.Element => {
    return <div className="crow--body--caption">{children}</div>;
};

export default Caption;
