import React, {FC, HTMLAttributes} from 'react';
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
}

interface IUserImageProps extends HTMLAttributes<HTMLLIElement> {
    imgURL: string;
}

interface IUserLabel {
    label?: string;
}

const svgClassName = component('userpic', 'svg')();

const UserImage: FC<IUserImageProps> = ({className, imgURL}) => (
    <div className={className} style={{backgroundImage: `url("${imgURL ?? ''}")`}} />
);

const UserLabel: FC<IUserLabel> = ({label}) =>
    label ? <span>{label[0].toUpperCase()}</span> : <ProfileIcon className={svgClassName} />;

export const Pic: React.FC<IProps> = ({
    imgURL,
    label,
    size,
    square,
    onClick,
    className,
    hoverable,
    bordered,
}: IProps) => {
    const classNames = cx(
        className,
        component('userpic')({
            hoverable: !!onClick || hoverable,
            square,
            size,
            bordered: !!imgURL || bordered,
            isImg: !!imgURL,
        }),
    );

    const imgClassName = component('userpic', 'img')();

    return (
        <div className={classNames} onClick={onClick}>
            {!!imgURL ? <UserImage className={imgClassName} imgURL={imgURL} /> : <UserLabel label={label} />}
        </div>
    );
};
