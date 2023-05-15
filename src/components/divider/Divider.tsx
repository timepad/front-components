import React from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

interface IProps {
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    vertical?: boolean;
    margin?: number | [number, number];
    styles?: {[key: string]: string | number};
}

export const Divider: React.FC<IProps> = ({className, as = 'div', vertical = false, margin = 0, styles = {}}) => {
    const Tag = as;
    const style = {
        margin: getMarginPx(margin),
        ...styles,
    };
    const rowClass = cx(
        component('list-divider')(),
        {
            vertical,
        },
        className,
    );
    return <Tag className={rowClass} style={style} />;
};

const getMarginPx = (margin: number | [number, number]) => {
    if (Array.isArray(margin)) {
        return margin.reduce((acc, el) => acc + ` ${el}px`, '');
    }
    return `${margin}px`;
};
