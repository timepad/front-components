import * as React from 'react';
import {FC, HTMLAttributes, useContext, useMemo} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import Right from '../../assets/svg/48/shape-right-48.svg';
import {PaginationContext} from './PaginationDefault';

export const Next: FC<HTMLAttributes<HTMLButtonElement>> = ({className, ...restProps}) => {
    const {activePage, total, onChange} = useContext(PaginationContext);
    const isDisabled = useMemo<boolean>(() => activePage === total, [activePage, total]);
    const buttonClassName = useMemo<string>(() => {
        return cx(component('pagination', 'next')({['is-disabled']: isDisabled}), className);
    }, [className, isDisabled]);

    return (
        <button
            {...restProps}
            className={buttonClassName}
            disabled={isDisabled}
            onClick={() => onChange(activePage + 1)}
        >
            <Right />
        </button>
    );
};
