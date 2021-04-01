import * as React from 'react';
import {FC, HTMLAttributes, useContext, useMemo} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {TooltipContext} from './Tooltip';

export const TootltipTitle: FC<HTMLAttributes<HTMLSpanElement>> = ({children, className, ...resrProps}) => {
    const titleClasses = useMemo<string>(() => {
        return cx(component('tooltip', 'title')(), className);
    }, [className]);

    const {setIsActive, isActive} = useContext(TooltipContext);

    return (
        <span {...resrProps} className={titleClasses} onClick={() => setIsActive(!isActive)}>
            {children}
        </span>
    );
};
