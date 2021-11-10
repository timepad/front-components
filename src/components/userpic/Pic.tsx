import * as React from 'react';
import {MouseEventHandler} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import ProfileIcon from '../../assets/svg/24/icon-profile-24.svg';

import './index.less';

type PicSize = 's' | 'm' | 'l' | 'xl';

interface IProps {
    imgURL?: string;
    label?: string;
    square?: boolean;
    size?: PicSize;
    onClick?: MouseEventHandler;
    hoverable?: boolean;
    className?: string;
    bordered?: boolean;
    mode?: 'light' | 'dark' | 'white';
}

export const Pic: React.FC<IProps> = ({
    imgURL,
    label,
    size,
    square,
    onClick,
    className,
    hoverable,
    bordered,
    mode,
}: IProps) => {
    const classNames = cx(
        className,
        component('userpic')({
            hoverable: !!onClick || hoverable,
            square,
            size,
            bordered: !!imgURL,
            ['mode']: mode,
        }),
    );

    return (
        <div className={classNames} onClick={onClick} style={{backgroundImage: `url("${imgURL ?? ''}")`}}>
            {!imgURL && (label ? <span>{label[0].toUpperCase()}</span> : <ProfileIcon />)}
        </div>
    );
};
