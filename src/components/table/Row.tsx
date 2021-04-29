import * as React from 'react';
import {FC, HTMLAttributes, useContext} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {TableContext} from './Table';

interface IRowProps extends HTMLAttributes<HTMLTableRowElement> {
    cells: ICellProps;
    cellsClassName?: string;
    onClick?: (e: React.MouseEvent) => void;
}

export interface ICellProps {
    align?: string;
    width?: string;
    [key: string]: string | number | JSX.Element | undefined;
}

export const Row: FC<IRowProps> = ({className, cellsClassName, style, cells, onClick}) => {
    const rowClasses = cx(component('table', 'row')(), className);
    const cellClasses = cx(component('table', 'cell')(), cellsClassName);
    const {cols, onRowClick} = useContext(TableContext);

    const handleRowClick = (e: React.MouseEvent) => {
        onClick ? onClick(e) : onRowClick?.(e);
    };

    return (
        <tr className={rowClasses} onClick={handleRowClick} style={style}>
            {cols?.map((col, idx) => {
                const styles = {
                    textAlign: col?.align || 'left',
                    width: col?.width || 'auto',
                };
                const value = cells[col.id];
                const formatedValue = col.format?.(value) || value;

                return (
                    <td key={col.id + idx} className={cellClasses} style={styles}>
                        {formatedValue}
                    </td>
                );
            })}
        </tr>
    );
};
