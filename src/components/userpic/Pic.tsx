import React, {FC, HTMLAttributes} from 'react';
import {MouseEventHandler} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import {IconProfile24} from '../../icons';

import './index.less';

type PicSize = 's' | 'm' | 'ml' | 'l' | 'xl';

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

const UserImage: FC<React.PropsWithChildren<IUserImageProps>> = ({className, imgURL}) => (
    <div className={className} style={{backgroundImage: `url("${imgURL ?? ''}")`}} />
);

const UserLabel: FC<React.PropsWithChildren<IUserLabel>> = ({label}) =>
    label ? <span>{label[0].toUpperCase()}</span> : <IconProfile24 className={svgClassName} />;

export const Pic: React.FC<React.PropsWithChildren<IProps>> = ({
    imgURL,
    label,
    size,
    square,
    onClick,
    className,
    hoverable,
    bordered,
    ...props
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
        <div className={classNames} onClick={onClick} {...props}>
            {!!imgURL ? <UserImage className={imgClassName} imgURL={imgURL} /> : <UserLabel label={label} />}
        </div>
    );
};
