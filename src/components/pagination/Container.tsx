import * as React from 'react';
import {FC, HTMLAttributes, useMemo} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

export const Container: FC<HTMLAttributes<HTMLDivElement>> = ({children, className, ...restProps}) => {
    const containerClassName = useMemo<string>(() => cx(component('pagination', 'container')(), className), [
        className,
    ]);

    return (
        <div {...restProps} className={containerClassName}>
            {children}
        </div>
    );
};
