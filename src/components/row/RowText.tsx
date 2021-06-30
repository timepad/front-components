import React from 'react';
import cx from 'classnames';
import './index.less';
import {component} from '../../services/helpers/classHelpers';

const RowText: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
    const classNames = cx(component('row__body', 'text')(), props.className);

    return (
        <div {...props} className={classNames}>
            {props.children}
        </div>
    );
};

export default RowText;
