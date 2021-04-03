import * as React from 'react';
import {FC, HTMLAttributes, useContext, useMemo} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {PaginationContext} from './PaginationDefault';

export interface IPaginationItem extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    page: number;
}

export const Item: FC<IPaginationItem> = ({page, className, disabled = false, ...restProps}) => {
    const {activePage, onChange} = useContext(PaginationContext);
    const isActive = useMemo<boolean>(() => activePage === page, [page, activePage]);
    const buttonClassName = useMemo<string>(
        () =>
            cx(
                component(
                    'pagination',
                    'item',
                )({
                    ['is-active']: isActive,
                    ['is-disabled']: disabled,
                }),
                className,
            ),
        [isActive, className, disabled],
    );

    return (
        <button {...restProps} disabled={disabled} className={buttonClassName} onClick={() => onChange(page)}>
            {page}
        </button>
    );
};
