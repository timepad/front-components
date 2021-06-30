import React from 'react';
import cx from 'classnames';
import './index.less';
import {component} from '../../services/helpers/classHelpers';

const RowCaption: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (
    props,
): JSX.Element => {
    const {children, className} = props;
    const classNames = cx(component('crow__body', 'caption')(), className);

    return (
        <div {...props} className={classNames}>
            {children}
        </div>
    );
};

export default RowCaption;
