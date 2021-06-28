import * as React from 'react';
import cx from 'classnames';
import '../../assets/css/bundle.less';

export type gapSize =
    | 1
    | 1.5
    | 2
    | 2.5
    | 3
    | 3.5
    | 4
    | 4.5
    | 5
    | 5.5
    | 6
    | 6.5
    | 7
    | 7.5
    | 8
    | 8.5
    | 9
    | 9.5
    | 10
    | 10.5
    | 11
    | 11.5
    | 12;

export interface IGapProps {
    size?: gapSize;
    desktop?: gapSize;
    mobile?: gapSize;
    className?: string;
    children?: React.ReactNode;
}

const defaultBrickSize = 1;

const getGapClassname = (size: number) => {
    const [x, y] = `${size}`.split('.');
    return `lgap-${x}${y ? `-${y}` : ''}`;
};

export const Gap: React.FC<IGapProps> = ({
    size = defaultBrickSize,
    desktop,
    mobile,
    className,
    children,
}: IGapProps) => {
    const classNames = cx(
        className,
        getGapClassname(size),
        desktop && `${getGapClassname(desktop)}--desktop`,
        mobile && `${getGapClassname(mobile)}--mobile`,
    );

    return <div className={classNames}>{children}</div>;
};
