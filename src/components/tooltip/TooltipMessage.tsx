import * as React from 'react';
import {FC, HTMLAttributes, useContext, useMemo} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {TooltipContext} from './Tooltip';

export const TooltipMessage: FC<HTMLAttributes<HTMLDivElement>> = ({children, className, ...resrProps}) => {
    const {isActive} = useContext(TooltipContext);
    const spanClasses = useMemo<string>(() => {
        return cx(component('tooltip', 'message')({['is-active']: isActive}), className);
    }, [className, isActive]);

    return (
        <div {...resrProps} className={spanClasses}>
            {children}
        </div>
    );
};
