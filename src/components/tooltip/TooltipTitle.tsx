import * as React from 'react';
import {FC, HTMLAttributes, useMemo} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

export const TootltipTitle: FC<HTMLAttributes<HTMLSpanElement>> = ({children, className, ...resrProps}) => {
    const titleClasses = useMemo<string>(() => {
        return cx(component('tooltip', 'title')(), className);
    }, [className]);

    return (
        <span {...resrProps} className={titleClasses}>
            {children}
        </span>
    );
};
