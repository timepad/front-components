import * as React from 'react';
import {MouseEventHandler, ReactNode} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import IconProfile from '../../assets/svg/24/icon-profile-24.svg';

import './index.less';

export enum PicShape {
    round = 'round',
    square = 'square',
}

export enum PicSize {
    small = 'small',
    big = 'big',
    bigger = 'bigger',
    biggest = 'biggest',
}

interface IProps {
    // image url to use as a background of component
    // has priority on fillChar
    fillURL?: string;
    // character to to use as a background of component
    // not taken to account if fillURL is passed
    // if a string is passed fist char will be used
    // if a char is lowercase, will be automatically converted to uppercase
    fillChar?: string;
    shape?: PicShape;
    size?: PicSize;
    onClick?: MouseEventHandler;
    interactive?: boolean;
    className?: string;
}

// this component is not exported outside folder (see index.ts)
export const Pic: React.FC<IProps> = ({fillURL, fillChar, size, shape, onClick, className, interactive}: IProps) => {
    const classNames = cx(
        className,
        component('userpic')({
            interactive: onClick !== undefined || interactive,
            square: shape === PicShape.square,
            small: size === PicSize.small,
            big: size === PicSize.big,
            bigger: size === PicSize.bigger,
            biggest: size === PicSize.biggest,
            pic: !!fillURL,
        }),
    );

    let display: ReactNode;

    if (fillURL) {
        display = (
            <b
                style={{
                    backgroundImage: `url("${fillURL}")`,
                }}
            />
        );
    } else if (fillChar) {
        display = <span>{fillChar[0].toUpperCase()}</span>;
    } else {
        display = <IconProfile className={component('icon')()} />;
    }

    return (
        <div className={classNames} onClick={onClick}>
            {display}
        </div>
    );
};
