import * as React from 'react';
import {FC, HTMLAttributes, useContext, useMemo} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import Left from '../../assets/svg/pagination/left.svg';
import {PaginationContext} from './Pagination';

export const Prev: FC<HTMLAttributes<HTMLButtonElement>> = ({className, ...restProps}) => {
    const {activePage, onChange} = useContext(PaginationContext);
    const isDisabled = useMemo<boolean>(() => activePage === 1, [activePage]);
    const buttonClassName = useMemo<string>(() => {
        return cx(component('pagination', 'prev')({['is-disabled']: isDisabled}), className);
    }, [className, isDisabled]);

    return (
        <button
            {...restProps}
            className={buttonClassName}
            disabled={isDisabled}
            onClick={() => onChange(activePage - 1)}
        >
            <Left />
        </button>
    );
};