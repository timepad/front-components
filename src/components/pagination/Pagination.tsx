import React, {createContext, FC, HTMLAttributes} from 'react';
import {PaginationItem} from './PaginationItem';
import {PaginationEllipsis} from './PaginationEllipsis';
import {PaginationNext} from './PaginationNext';
import {PaginationPrev} from './PaginationPrev';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {usePagination} from './usePagination';

import './cpagination.less';

export type TOnChange = (page: number) => void;

export interface IPagination extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    theme?: 'dark' | 'light';
    activePage: number;
    total: number;
    onChange?: TOnChange;
    amountAdjacentItems?: number; // количество соседних элементов
}

export interface IPaginationDefaultContext {
    activePage: number;
    total: number;
    onChange: TOnChange;
}

const defaultChange = () => {
    //
};

export const PaginationContext = createContext<IPaginationDefaultContext>({
    activePage: 0,
    total: 0,
    onChange: defaultChange,
});

const Pagination: FC<IPagination> & {
    Item: typeof PaginationItem;
    Next: typeof PaginationNext;
    Prev: typeof PaginationPrev;
    Ellipsis: typeof PaginationEllipsis;
} = ({
    activePage,
    total,
    children,
    onChange = defaultChange,
    theme = 'light',
    className,
    amountAdjacentItems = 1,
    ...restProps
}) => {
    const paginationClassName = cx(component('pagination')({[theme]: true}), className);

    const {startItems, centerItems, endItems, isEndEllipsis, isStartEllipsis} = usePagination({
        activePage,
        total,
        amountAdjacentItems,
    });

    return (
        <div {...restProps} className={paginationClassName}>
            <PaginationContext.Provider value={{activePage, total, onChange}}>
                {children ? (
                    children
                ) : (
                    <>
                        <PaginationPrev />
                        {startItems.map(({id}) => (
                            <PaginationItem page={id} key={id} />
                        ))}
                        {isStartEllipsis && <PaginationEllipsis />}
                        {centerItems.map(({id}) => (
                            <PaginationItem page={id} key={id} />
                        ))}
                        {isEndEllipsis && <PaginationEllipsis />}
                        {endItems.map(({id}) => (
                            <PaginationItem page={id} key={id} />
                        ))}
                        <PaginationNext />
                    </>
                )}
            </PaginationContext.Provider>
        </div>
    );
};

Pagination.Item = PaginationItem;
Pagination.Prev = PaginationPrev;
Pagination.Ellipsis = PaginationEllipsis;
Pagination.Next = PaginationNext;

export default Pagination;
