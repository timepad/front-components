import * as React from 'react';
import {createContext, FC, HTMLAttributes} from 'react';
import {Item} from './Item';
import {Ellipsis} from './Ellipsis';
import {Next} from './Next';
import {Prev} from './Prev';
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
    coefficient?: number;
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

const BasePagination: FC<IPagination> = ({
    activePage,
    total,
    children,
    onChange = defaultChange,
    theme = 'light',
    className,
    coefficient = 1,
    ...restProps
}) => {
    const paginationClassName = cx(component('pagination')({[theme]: true}), className);

    const {startItems, centerItems, endItems, isEndEllipsis, isStartEllipsis} = usePagination({
        activePage,
        total,
        coefficient,
    });

    return (
        <div {...restProps} className={paginationClassName}>
            <PaginationContext.Provider value={{activePage, total, onChange}}>
                {children ? (
                    children
                ) : (
                    <>
                        <Prev />
                        {startItems.map(({id}) => (
                            <Item page={id} key={id} />
                        ))}
                        {isStartEllipsis && <Ellipsis />}
                        {centerItems.map(({id}) => (
                            <Item page={id} key={id} />
                        ))}
                        {isEndEllipsis && <Ellipsis />}
                        {endItems.map(({id}) => (
                            <Item page={id} key={id} />
                        ))}
                        <Next />
                    </>
                )}
            </PaginationContext.Provider>
        </div>
    );
};

const paginationComponents = {
    Item,
    Prev,
    Next,
    Ellipsis,
};

export const Pagination = Object.assign(BasePagination, paginationComponents);
