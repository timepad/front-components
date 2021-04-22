import React, {MouseEventHandler, ReactNode} from 'react';

interface IProps {
    rowClass?: string;
    children?: ReactNode;
    onClick?: MouseEventHandler;
}

export const Row: React.FC<IProps> = ({rowClass, children}) => {
    return <li className={rowClass}>{children}</li>;
};
