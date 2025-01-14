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
    weight?: 'light' | 'normal' | 'bold';
    fullWidthMobile?: boolean;
}

export const Divider: React.FC<IProps> = ({
    className,
    as = 'div',
    vertical = false,
    margin = 0,
    style = {},
    weight,
    fullWidthMobile = false,
}) => {
    const Tag = as;
    const styles = {
        margin: getMarginPx(margin),
        ...style,
    };
    const rowClass = cx(
        component('list-divider')({
            light: weight === 'light',
            normal: weight === 'normal',
            bold: weight === 'bold',
            fullWidthMobile: fullWidthMobile,
        }),
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
