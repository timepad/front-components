import React, {FC, MouseEvent, useState} from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';

import './index.less';
import {IconArrowDown24, IconArrowUp24} from '../../icons';

interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    text: string;
    caption?: string;
    secondIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    large?: boolean;
    reverse?: boolean;
    border?: boolean;
    horizontalPadding?: 0 | 8 | 16 | 24 | 32;
}

export const Accordion: FC<React.PropsWithChildren<IProps>> = ({
    text = '',
    caption,
    horizontalPadding = 0,
    large = false,
    reverse = false,
    border = false,
    secondIcon,
    className = '',
    children,
}) => {
    const [open, setOpen] = useState(false);
    const icon = open ? <IconArrowUp24 /> : <IconArrowDown24 />;
    const baseClassName = 'accordion';

    const containerClassNames = cx(
        component(baseClassName)({
            [`${horizontalPadding}`]: true,
            open,
            large,
            reverse,
            border,
        }),
        className,
    );

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setOpen(!open);
    };

    return (
        <div className={containerClassNames}>
            <div className={component(baseClassName, 'body')()} onClick={handleClick}>
                <div className={component(baseClassName, 'text')()}>
                    <div className={component(baseClassName, 'title')()}>{text}</div>
                    {caption && <div className={component(baseClassName, 'caption')()}>{caption}</div>}
                </div>
                {secondIcon && <div className={component(baseClassName, 'icon')()}>{secondIcon}</div>}
                <div className={component(baseClassName, 'icon')()}>{icon}</div>
            </div>
            {open && <div className={component(baseClassName, 'content')()}>{children}</div>}
        </div>
    );
};
