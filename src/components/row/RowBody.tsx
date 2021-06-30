import * as React from 'react';
import cx from 'classnames';
import './index.less';

interface IRowBodyProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactNode | React.ReactNode[];
}

const Body: React.FC<IRowBodyProps> = (props): JSX.Element => {
    const {children, className} = props;
    const classNames = cx('crow--body', className);

    return (
        <div {...props} className={classNames}>
            {children}
        </div>
    );
};

export default Body;
