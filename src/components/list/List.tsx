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
    variant?: 'white' | 'dark';
    size?: 'lg' | 'sm';
}

const ListBase: React.FC<IList> = ({
    children,
    as = 'div',
    className = '',
    full,
    variant = 'white',
    size,
    ...props
}): JSX.Element => {
    const Tag = as;
    const classNames = cx(
        component('list')({
            full: full,
            variant: variant,
            size,
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
