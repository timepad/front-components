import React, {FC, HTMLAttributes, useContext} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {IconArrowRight24} from '../../icons';
import {PaginationContext} from './Pagination';

export const PaginationNext: FC<React.PropsWithChildren<HTMLAttributes<HTMLButtonElement>>> = ({
    className,
    ...restProps
}) => {
    const {activePage, total, onChange} = useContext(PaginationContext);
    const isDisabled = activePage === total;
    const buttonClassName = cx(component('pagination', 'next')({['is-disabled']: isDisabled}), className);

    return (
        <button
            {...restProps}
            className={buttonClassName}
            disabled={isDisabled}
            onClick={() => onChange(activePage + 1)}
        >
            <IconArrowRight24 />
        </button>
    );
};
