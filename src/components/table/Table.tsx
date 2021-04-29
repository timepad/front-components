import * as React from 'react';
import {createContext, FC, HTMLAttributes, ReactElement, ReactNode, MouseEvent, useEffect, useState} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

import './index.less';

import {Row, ICellProps} from './Row';
import {Col, IColProps} from './Col';
import {Foot} from './Foot';

interface ITableProps extends HTMLAttributes<HTMLTableElement> {
    cols?: IColProps[];
    data?: ICellProps[];
    onRowClick?: (e: React.MouseEvent) => void;
    onColClick?: (e: React.MouseEvent) => void;
    sort?: {[key: string]: 'asc' | 'desc'};
}

export const TableContext = createContext({} as ITableProps);

const getChildrenByType = (children: ReactNode, type: ReactNode) =>
    React.Children.toArray(children).filter((child: ReactNode) => {
        if (typeof child === 'object' && child !== null) {
            return 'type' in child ? child?.type === type : child;
        }
    }) as ReactElement[];

const sortByProp = (prop: string, type = 'asc') => {
    if (type === 'asc') return (a: any, b: any) => (a[prop] > b[prop] ? 1 : -1);
    if (type === 'desc') return (a: any, b: any) => (a[prop] < b[prop] ? 1 : -1);
};

export const TableBase: FC<ITableProps> = ({onRowClick, className, sort, cols, data = [], children}) => {
    // Собираем Col Row и Foot
    const colsFromChildren = getChildrenByType(children, Col);
    const rowsFromChildren = getChildrenByType(children, Row);
    const footFromChildren = getChildrenByType(children, Foot);

    // Забираем props со строк и колонок
    const propsColsFromChildren = colsFromChildren.map((child: ReactElement) => child?.props);
    const propsRowsFromChildren = rowsFromChildren.map((child: ReactElement) => child?.props);

    // Объединяем данные data и компонентов строк
    const combinedData = [...data, ...propsRowsFromChildren.map((item) => item.cells)];
    const [sortedData, setSortedData] = useState<ICellProps[]>([...combinedData]);

    const tableClasses = cx(component('table')(), className);
    const theadClasses = cx(component('table', 'head')());

    const sortData = (attr: string, sort?: string) => {
        const sortedData = combinedData?.sort(sortByProp(attr, sort));
        setSortedData(sortedData);
    };

    useEffect(() => {
        if (!sort) return;
        const attr = Object.entries(sort)[0];
        sortData(...attr);
    }, []);

    const handleHeaderClick = (e: MouseEvent) => {
        const element = e.target as Element;
        const attr = element.getAttribute('id');

        sortData(attr || '');
    };

    return (
        <TableContext.Provider
            value={{
                cols: cols || propsColsFromChildren,
                data: sortedData,
                onColClick: handleHeaderClick,
                onRowClick: (row) => onRowClick?.(row),
            }}
        >
            <table className={tableClasses}>
                {colsFromChildren.length ? (
                    <thead className={theadClasses}>
                        <tr>{colsFromChildren}</tr>
                    </thead>
                ) : (
                    cols?.length && (
                        <thead className={theadClasses}>
                            <tr>
                                {cols?.map((colProps, idx) => (
                                    <Col key={colProps.id + idx} {...colProps} />
                                ))}
                            </tr>
                        </thead>
                    )
                )}

                {sortedData?.length && (
                    <tbody>
                        {sortedData?.map((row, idx) => {
                            const AltRow = rowsFromChildren?.find(
                                (altRow: ReactElement) => altRow?.props?.cells?.id === row.id,
                            );
                            return AltRow ? AltRow : <Row key={idx} cells={row} />;
                        })}
                    </tbody>
                )}
                {footFromChildren.length > 0 && footFromChildren}
            </table>
        </TableContext.Provider>
    );
};

const childrenComponents = {
    Col,
    Row,
    Foot,
};

export const Table = Object.assign(TableBase, childrenComponents);
