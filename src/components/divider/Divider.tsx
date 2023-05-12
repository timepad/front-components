import React from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

interface IProps {
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    vertical?: boolean;
    margin?: number | [number, number];
}

export const Divider: React.FC<React.PropsWithChildren<IProps>> = ({
    className,
    as = 'div',
    vertical = false,
    margin = 0,
    ...props
}) => {
    const Tag = as;
    const styles = {
        margin: getMargin(margin),
    };
    const rowClass = cx(
        component('list-divider')(),
        {
            vertical,
        },
        className,
    );
    return <Tag className={rowClass} style={styles} {...props} />;
};

const getMargin = (margin: number | [number, number]) => {
    if (!margin) return;
    if (typeof margin === 'number') {
        return `${margin}px`;
    }
    if (Array.isArray(margin)) {
        return margin.reduce((acc, el) => acc + ` ${el}px`, '');
    }
};
