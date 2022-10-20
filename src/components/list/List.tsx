import * as React from 'react';
import cx from 'classnames';
import {Item} from './Item';
import {Group} from './Group';
import {Divider} from '../divider';
import {component} from '../../services/helpers/classHelpers';
import './index.less';
import {ReactNode} from 'react';

export interface IList {
    className?: string;
    children?: ReactNode | ReactNode[];
    as?: keyof JSX.IntrinsicElements;
    full?: boolean;
    variant?: 'white' | 'dark' | 'transparent';
    size?: 'lg' | 'sm';
    fontSize?: 'lg';
    fontFamily?: 'main';
}

const ListBase: React.FC<React.PropsWithChildren<IList>> = ({
    children,
    as = 'div',
    className = '',
    full,
    variant = 'transparent',
    size,
    fontSize,
    fontFamily,
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
        <Tag as={as} className={classNames}>
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
