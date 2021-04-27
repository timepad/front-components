import * as React from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';

export interface IItem {
    className?: string;
    secondaryText?: string;
    label?: string;
    as?: keyof JSX.IntrinsicElements;
    prefix?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    suffix?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    children?: React.ReactChild | React.ReactChild[];
}

const Item: React.FC<IItem | any> = ({
    children,
    as: Tag = 'div',
    className = '',
    secondaryText,
    prefix,
    suffix,
    label,
    ...props
}: IItem): JSX.Element => {
    const classNames = component('list-item')({
        'has-prefix': !!prefix,
        'has-suffix': !!suffix,
        [className]: !!className,
    });

    const mainText = label ? label : children;
    return (
        <Tag className={classNames} {...props}>
            {prefix
                ? React.cloneElement(prefix, {
                      className: cx(component('icon')(), component('list-item', 'row-icon')()),
                  })
                : null}
            <div className={'clist-item__tag'}>
                {secondaryText ? (
                    <div className={'clist-item__secondary-text'}>{secondaryText}</div>
                ) : (
                    <div>{mainText}</div>
                )}
            </div>
            {suffix
                ? React.cloneElement(suffix, {
                      className: cx(component('icon')(), component('list-item', 'row-icon')()),
                  })
                : null}
        </Tag>
    );
};

export {Item};
