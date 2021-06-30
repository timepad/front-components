import React from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

interface IRowBodyProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactNode | React.ReactNode[];
}

const RowBody: React.FC<IRowBodyProps> = (props): JSX.Element => {
    const {children, className} = props;
    const classNames = cx(component('row', 'body')(), className);

    return (
        <div {...props} className={classNames}>
            {children}
        </div>
    );
};

export default RowBody;
