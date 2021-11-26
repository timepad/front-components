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
    textPosition?: 'start' | 'center' | 'end';
    header?: boolean;
    active?: boolean;
}

const Item: React.FC<IItem | any> = React.forwardRef<HTMLElement, IItem>(
    (
        {
            children,
            as = 'div',
            className = '',
            secondaryText,
            prefix,
            suffix,
            label,
            textPosition,
            header,
            active,
            ...props
        }: IItem,
        ref,
    ): JSX.Element => {
        const classNames = cx(
            component('list-item')({
                'has-prefix': !!prefix,
                'has-suffix': !!suffix,
                header,
                active,
                'secondary-text': !!secondaryText,
            }),
            className,
        );

        const tagClassNames = component(
            'list-item',
            'tag',
        )({
            'text-position': textPosition,
        });

        const Tag: any = as;
        const mainText = label ? label : children;
        return (
            <Tag ref={ref} className={classNames} {...props}>
                {prefix ? (
                    <div className={component('list-item', 'prefix')()}>
                        {React.cloneElement(prefix, {
                            className: cx(
                                component('icon')(),
                                component('list-item', 'row-icon')(),
                                prefix?.props.className,
                            ),
                        })}
                    </div>
                ) : null}
                <div className={tagClassNames}>
                    {secondaryText ? (
                        <div className={component('list-item', 'wrapper')()}>
                            <div className={component('list-item', 'main-text')()}>{mainText}</div>
                            <div className={component('list-item', 'secondary-text')()}>{secondaryText}</div>
                        </div>
                    ) : (
                        <div className={component('list-item', 'main-text')()}>{mainText}</div>
                    )}
                </div>
                {suffix ? (
                    <div className={component('list-item', 'suffix')()}>
                        {React.cloneElement(suffix, {
                            className: cx(
                                component('icon')(),
                                component('list-item', 'row-icon')(),
                                suffix?.props.className,
                            ),
                        })}
                    </div>
                ) : null}
            </Tag>
        );
    },
);

Item.displayName = 'Item';

export {Item};
