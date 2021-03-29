import * as React from 'react';
import {createContext, FC, HTMLAttributes, useMemo} from 'react';
import {Item} from './Item';
import {Ellipsis} from './Ellipsis';
import {Next} from './Next';
import {Prev} from './Prev';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {Container} from './Container';

import './cpagination.less';

export interface IPagination extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    theme?: 'dark' | 'light';
    activePage: number;
    total: number;
    onChange?: (page: number) => void;
}

export interface IPaginationContext {
    activePage: number;
    total: number;
    onChange: (page: number) => void;
}

const defaultChange = () => {
    //
};

export const PaginationContext = createContext<IPaginationContext>({
    activePage: 0,
    total: 0,
    onChange: defaultChange,
});

const BasePagination: FC<IPagination> = ({
    activePage,
    total,
    children,
    onChange,
    theme = 'light',
    className,
    ...restProps
}) => {
    const paginationClassName = useMemo<string>(() => {
        return cx(
            component('pagination')({
                [theme]: true,
            }),
            className,
        );
    }, [className, theme]);

    return (
        <div {...restProps} className={paginationClassName}>
            <PaginationContext.Provider value={{activePage, total, onChange: onChange || defaultChange}}>
                {children}
            </PaginationContext.Provider>
        </div>
    );
};

const paginationComponents = {
    Item,
    Prev,
    Next,
    Container,
    Ellipsis,
};

export const Pagination = Object.assign(BasePagination, paginationComponents);
