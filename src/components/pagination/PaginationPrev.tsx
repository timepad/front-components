import React, {FC, HTMLAttributes, useContext} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import Left from '../../assets/svg/24/icon-arrow-left-24.svg';
import {PaginationContext} from './Pagination';

export const PaginationPrev: FC<React.PropsWithChildren<HTMLAttributes<HTMLButtonElement>>> = ({
    className,
    ...restProps
}) => {
    const {activePage, onChange} = useContext(PaginationContext);
    const isDisabled = activePage === 1;
    const buttonClassName = cx(component('pagination', 'prev')({['is-disabled']: isDisabled}), className);

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
