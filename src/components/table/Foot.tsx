import React, {FC, HTMLAttributes} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

export const Foot: FC<HTMLAttributes<HTMLTableCellElement>> = ({children, className}) => {
    const tfootClasses = cx(component('table', 'foot')(), className);

    return <tfoot className={tfootClasses}>{children}</tfoot>;
};
