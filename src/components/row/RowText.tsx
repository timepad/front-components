import React from 'react';
import './index.less';

const Text: React.FC = ({children}) => {
    return <div className="crow--body--text">{children}</div>;
};

export default Text;
