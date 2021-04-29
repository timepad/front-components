import * as React from 'react';
import {FC, HTMLAttributes, ReactNode, useContext} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {TableContext} from './Table';

export interface IColProps extends HTMLAttributes<HTMLTableHeaderCellElement> {
    id: string;
    label?: string;
    align?: 'left' | 'center' | 'right';
    width?: string;
    format?: (value: string | number | ReactNode) => void; // кастомное отображение контента
    onClick?: (e: React.MouseEvent) => void; // собственное свойство компонента
}

export const Col: FC<IColProps> = ({
    id,
    label,
    onClick,
    align = 'left',
    width = 'auto',
    style,
    className,
    children,
}) => {
    const {onColClick} = useContext(TableContext);
    const value = children || label;
    const cellClasses = cx(component('table', 'header-cell')(), className);
    const styles = {
        textAlign: align,
        width,
        ...style,
    };

    const handleColClick = (e: React.MouseEvent) => {
        onClick ? onClick(e) : onColClick?.(e);
    };

    return (
        <th id={id} className={cellClasses} onClick={handleColClick} style={styles}>
            {value}
        </th>
    );
};
