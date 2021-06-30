import * as React from 'react';
import cx from 'classnames';
import {Item} from './Item';
import {Group} from './Group';
import {Divider} from './Divider';
import {component} from '../../services/helpers/classHelpers';

import './index.less';

export interface IList {
    className?: string;
    children?: React.ReactChild | React.ReactChild[];
    as?: keyof JSX.IntrinsicElements;
    full?: boolean;
    variant?: 'white' | 'dark' | 'transparent';
    size?: 'lg' | 'sm';
    fontSize?: 'lg';
    fontFamily?: 'main';
}

const ListBase: React.FC<IList> = ({
    children,
    as = 'div',
    className = '',
    full,
    variant = 'transparent',
    size,
    fontSize,
    fontFamily,
    ...props
}): JSX.Element => {
    const Tag = as;
    const classNames = cx(
        component('list')({
            full: full,
            variant: variant,
            size,
            [`font-size_${fontSize}`]: !!fontSize,
            [`font-family_${fontFamily}`]: !!fontFamily,
        }),
        className,
    );
    return (
        <Tag className={classNames} {...props}>
            {children}
        </Tag>
    );
};

const listChildren = {
    Item,
    Group,
    Divider,
};

export const List = Object.assign(ListBase, listChildren);
