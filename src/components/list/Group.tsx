import * as React from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

export interface IItem {
    className?: string;
    secondaryText?: string;
    label?: string;
    as?: keyof JSX.IntrinsicElements;
    prefix?: React.ComponentClass<any> | React.FC<any> | React.ComponentType;
    suffix?: React.ComponentClass<any> | React.FC<any> | React.ComponentType;
    children?: React.ReactChild | React.ReactChild[];
    header?: boolean;
}

const Group: React.FC<IItem | any> = ({
    children,
    as: Tag = 'div',
    className = '',
    secondaryText,
    prefix,
    suffix,
    label,
    header,
    ...props
}: IItem): JSX.Element => {
    const Prefix = prefix,
        Suffix = suffix,
        classNames = cx(
            component('list-item')({
                'has-prefix': !!Prefix,
                'has-suffix': !!Suffix,
                header,
            }),
            className,
        );

    const mainText = label ? label : children;
    return (
        <div className={classNames}>
            {Prefix ? <Prefix /> : null}
            <Tag className={component('list-item', 'tag')()} {...props}>
                {secondaryText ? (
                    <div className={component('list-item', 'secondary-text')()}>{secondaryText}</div>
                ) : (
                    <div>{mainText}</div>
                )}
            </Tag>
            {Suffix ? <Suffix /> : null}
        </div>
    );
};

export {Group};
