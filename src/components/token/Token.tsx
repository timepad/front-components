import React, {FC} from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';
//import {action, observable} from 'mobx';

import './index.less';

interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    disabled?: boolean;
    closable?: boolean;
}

export const Token: FC<IProps> = ({disabled = false, closable = false, className, children, ...props}): JSX.Element => {
    const baseClassName = 'token';

    const containerClassNames = cx(
        component(baseClassName)({
            disabled,
            closable,
        }),
        className,
    );

    return (
        <div className={containerClassNames} {...props}>
            {children}
        </div>
    );
};
