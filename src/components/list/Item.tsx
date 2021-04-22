import * as React from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

export interface IItem {
    className?: string;
    secondaryText?: string;
    label?: string;
    as?: keyof JSX.IntrinsicElements;
    prefix?: typeof React.Component;
    suffix?: typeof React.Component;
    children?: React.ReactChild | React.ReactChild[];
}

const Item: React.FC<IItem & React.HTMLAttributes<any>> = ({
    children,
    as: Tag = 'div',
    className = '',
    secondaryText,
    prefix,
    suffix,
    label,
    ...props
}: IItem): JSX.Element => {
    const Prefix = prefix,
        Suffix = suffix,
        classNames = component('list-item')({
            'has-prefix': !!Prefix,
            'has-suffix': !!Suffix,
            [className]: !!className,
        });

    return (
        <div className={classNames}>
            {Prefix ? <Prefix /> : null}
            <Tag className={'clist-item__tag'} {...props}>
                <div>
                    {label ? label : children}
                    {secondaryText ? secondaryText : null}
                </div>
            </Tag>
            {Suffix ? <Suffix /> : null}
        </div>
    );
};

export {Item};
