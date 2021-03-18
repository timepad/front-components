import React, {MouseEventHandler, ReactNode} from 'react';

interface IProps {
    rowClass?: string;
    children?: ReactNode;
    onClick?: MouseEventHandler;
}

export const Row = ({rowClass, children}: IProps): React.ReactElement => {
    return <li className={rowClass}>{children}</li>;
};
