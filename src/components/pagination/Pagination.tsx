import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {PaginationDefault, TOnChange} from './PaginationDefault';
import {usePagination} from './usePagination';

export interface IPagination extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    onChange: TOnChange;
    activePage: number;
    total: number;
    coefficient?: number;
    theme?: 'light' | 'dark';
}

export const Pagination: FC<IPagination> = ({onChange, activePage, total, coefficient = 1, theme}) => {
    const {startItems, centerItems, endItems, isEndEllipsis, isStartEllipsis} = usePagination({
        activePage,
        total,
        coefficient,
    });

    return (
        <PaginationDefault activePage={activePage} total={total} onChange={onChange} theme={theme}>
            <PaginationDefault.Prev />
            <PaginationDefault.Container>
                {startItems.map(({id}) => (
                    <PaginationDefault.Item page={id} key={id} />
                ))}
                {isStartEllipsis && <PaginationDefault.Ellipsis />}
                {centerItems.map(({id}) => (
                    <PaginationDefault.Item page={id} key={id} />
                ))}
                {isEndEllipsis && <PaginationDefault.Ellipsis />}
                {endItems.map(({id}) => (
                    <PaginationDefault.Item page={id} key={id} />
                ))}
            </PaginationDefault.Container>
            <PaginationDefault.Next />
        </PaginationDefault>
    );
};
