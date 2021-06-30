import * as React from 'react';
import cx from 'classnames';
import {layout} from '../../services/helpers/classHelpers';
import '../../assets/css/bundle.less';

export type brickSize =
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

export interface IBrickProps {
    size?: brickSize;
    desktop?: brickSize;
    mobile?: brickSize;
    className?: string;
}

const defaultBrickSize = 1;

const getBrickClassname = (size: number) => {
    const [int, fract] = `${size}`.split('.');
    return `${layout('brick')()}-${int}${fract ? `-${fract}` : ''}`;
};

export const Brick: React.FC<IBrickProps> = ({size = defaultBrickSize, desktop, mobile, className, children}) => {
    const classNames = cx(
        className,
        getBrickClassname(size),
        desktop && `${getBrickClassname(desktop)}--desktop`,
        mobile && `${getBrickClassname(mobile)}--mobile`,
    );

    return <div className={classNames}>{children}</div>;
};
