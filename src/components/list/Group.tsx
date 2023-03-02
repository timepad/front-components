import * as React from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

export interface IItem {
    className?: string;
    secondaryText?: string;
    label?: string;
    as?: keyof JSX.IntrinsicElements;
    prefix?:
        | React.ComponentClass<any>
        | React.FC<React.PropsWithChildren<any>>
        | React.ComponentType<React.PropsWithChildren<unknown>>;
    suffix?:
        | React.ComponentClass<any>
        | React.FC<React.PropsWithChildren<any>>
        | React.ComponentType<React.PropsWithChildren<unknown>>;
    children?: React.ReactNode | React.ReactNode[];
    header?: boolean;
    active?: boolean;
}

const Group: React.FC<React.PropsWithChildren<IItem | any>> = React.forwardRef<HTMLDivElement, IItem>(
    (
        {
            children,
            as: Tag = 'div',
            className = '',
            secondaryText,
            prefix,
            suffix,
            label,
            header,
            active,
            ...props
        }: IItem,
        ref,
    ): JSX.Element => {
        const Prefix = prefix,
            Suffix = suffix,
            classNames = cx(
                component('list-item')({
                    'has-prefix': !!Prefix,
                    'has-suffix': !!Suffix,
                    header,
                    active,
                    'secondary-text': !!secondaryText,
                }),
                className,
            );

        const mainText = label ? label : children;
        return (
            <div ref={ref} className={classNames}>
                {Prefix ? (
                    <div className={component('list-item', 'prefix')()}>
                        <Prefix />
                    </div>
                ) : null}
                <Tag className={component('list-item', 'tag')()} {...props}>
                    {secondaryText ? (
                        <div>
                            <div className={component('list-item', 'main-text')()}>{mainText}</div>
                            <div className={component('list-item', 'secondary-text')()}>{secondaryText}</div>
                        </div>
                    ) : (
                        <div className={component('list-item', 'main-text')()}>{mainText}</div>
                    )}
                </Tag>
                {Suffix ? (
                    <div className={component('list-item', 'suffix')()}>
                        <Suffix />
                    </div>
                ) : null}
            </div>
        );
    },
);

Group.displayName = 'Group';

export {Group};
