import * as React from 'react';
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
    mod?: 'white' | 'dark';
    size?: 'lg';
}

const ListBase: React.FC<IList> = ({
    children,
    as = 'div',
    className = '',
    full,
    mod = 'white',
    size,
    ...props
}): JSX.Element => {
    const Tag = as;
    const classNames = component('list')({
        full: full,
        mod,
        size,
        [className]: !!className,
    });
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
