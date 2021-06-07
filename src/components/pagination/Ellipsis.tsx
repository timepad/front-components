import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

export const Ellipsis: FC<HTMLAttributes<HTMLDivElement>> = ({className, ...restProps}) => {
    const buttonClassName = cx(component('pagination', 'ellipsis')(), className);

    return (
        <div {...restProps} className={buttonClassName}>
            ...
        </div>
    );
};
