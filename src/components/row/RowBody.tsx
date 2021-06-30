import React, {ReactNode} from 'react';
import './index.less';

const Body: React.FC<{children: ReactNode | ReactNode[]}> = ({children}): JSX.Element => {
    return <div className="crow--body">{children}</div>;
};

export default Body;
