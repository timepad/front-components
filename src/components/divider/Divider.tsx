import React from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

interface IProps {
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    vertical?: boolean;
    margin?: number | [number, number];
    style?: React.CSSProperties;
}

export const Divider: React.FC<IProps> = ({className, as = 'div', vertical = false, margin = 0, style = {}}) => {
    const Tag = as;
    const styles = {
        margin: getMarginPx(margin),
        ...style,
    };
    const rowClass = cx(
        component('list-divider')(),
        {
            vertical,
        },
        className,
    );
    return <Tag className={rowClass} style={styles} />;
};

const getMarginPx = (margin: number | [number, number]) => {
    if (Array.isArray(margin)) {
        return margin.reduce((acc, el) => acc + ` ${el}px`, '');
    }
    return `${margin}px`;
};
