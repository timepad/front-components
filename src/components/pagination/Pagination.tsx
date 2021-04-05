import * as React from 'react';
import {createContext, FC, HTMLAttributes, useMemo} from 'react';
import {Item} from './Item';
import {Ellipsis} from './Ellipsis';
import {Next} from './Next';
import {Prev} from './Prev';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {Container} from './Container';
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
    onChange,
    theme = 'light',
    className,
    coefficient = 1,
    ...restProps
}) => {
    const paginationClassName = useMemo<string>(
        () =>
            cx(
                component('pagination')({
                    [theme]: true,
                }),
                className,
            ),
        [className, theme],
    );

    const {startItems, centerItems, endItems, isEndEllipsis, isStartEllipsis} = usePagination({
        activePage,
        total,
        coefficient,
    });

    return (
        <div {...restProps} className={paginationClassName}>
            <PaginationContext.Provider value={{activePage, total, onChange: onChange || defaultChange}}>
                {children ? (
                    children
                ) : (
                    <>
                        <Prev />
                        <Container>
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
                        </Container>
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
    Container,
    Ellipsis,
};

export const Pagination = Object.assign(BasePagination, paginationComponents);
