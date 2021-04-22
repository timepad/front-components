import React, {MouseEventHandler, ReactNode} from 'react';

interface IProps {
    className?: string;
    children?: ReactNode;
    onClick?: MouseEventHandler;
}

export const Row: React.FC<IProps> = ({className, children}) => {
    return <li className={className}>{children}</li>;
};
