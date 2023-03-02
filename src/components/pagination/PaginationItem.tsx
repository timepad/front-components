import React, {FC, HTMLAttributes, useContext} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {PaginationContext} from './Pagination';

export interface IPaginationItem extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    page: number;
}

export const PaginationItem: FC<React.PropsWithChildren<IPaginationItem>> = ({
    page,
    className,
    disabled = false,
    ...restProps
}) => {
    const {activePage, onChange} = useContext(PaginationContext);
    const isActive = activePage === page;
    const buttonClassName = cx(
        component(
            'pagination',
            'item',
        )({
            ['is-active']: isActive,
            ['is-disabled']: disabled,
        }),
        className,
    );

    return (
        <button {...restProps} disabled={disabled} className={buttonClassName} onClick={() => onChange(page)}>
            {page}
        </button>
    );
};
