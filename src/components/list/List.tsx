import * as React from 'react';
import cx from 'classnames';
import './index.less';
import {Item} from './Item';
import {component} from '../../services/helpers/classHelpers';

export interface IList {
    className?: string;
    children?: React.ReactChild | React.ReactChild[];
    as?: keyof JSX.IntrinsicElements;
    full?: boolean;
    mod?: 'white' | 'dark';
}

const ListBase: React.FC<IList> = ({
    children,
    as = 'div',
    className = '',
    full,
    mod = 'white',
    ...props
}): JSX.Element => {
    const Tag = as;
    const classNames = component('list')({
        full: full,
        mod,
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
};

export const List = Object.assign(ListBase, listChildren);
