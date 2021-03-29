import * as React from 'react';
import {FC, HTMLAttributes, useMemo} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

export const Ellipsis: FC<HTMLAttributes<HTMLDivElement>> = ({className, ...restProps}) => {
    const buttonClassName = useMemo<string>(() => {
        return cx(component('pagination', 'ellipsis')(), className);
    }, [className]);

    return (
        <div {...restProps} className={buttonClassName}>
            ...
        </div>
    );
};
