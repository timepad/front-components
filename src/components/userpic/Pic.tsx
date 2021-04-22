import * as React from 'react';
import {MouseEventHandler, ReactNode} from 'react';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import IconProfile from '../../assets/svg/24/icon-profile-24.svg';

import './index.less';

export interface IProps {
    // image url to use as a background of component
    // has priority on fillChar
    fillURL?: string;
    // character to to use as a background of component
    // not taken to account if fillURL is passed
    // if a string is passed fist char will be used
    // if a char is lowercase, will be automatically converted to uppercase
    fillChar?: string;
    shape?: 'round' | 'square';
    size?: 'small' | 'medium' | 'big' | 'bigger' | 'biggest';
    onClick?: MouseEventHandler;
    className?: string;
}

// this component is not exported outside folder (see index.ts)
export const Pic: React.FC<IProps> = ({fillURL, fillChar, size, shape, onClick, className}: IProps) => {
    let classNames = cx('cuserpic', className, {
        'cuserpic--interactive': onClick !== undefined,
        'cuserpic--square': shape === 'square',
        'cuserpic--small': size === 'small',
        'cuserpic--big': size === 'big',
        'cuserpic--bigger': size === 'bigger',
        'cuserpic--biggest': size === 'biggest',
    });

    let display: ReactNode;

    if (fillURL) {
        classNames = cx(classNames, 'cuserpic--pic');
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
        display = <IconProfile className="cicon" />;
    }

    return (
        <div className={classNames} onClick={onClick}>
            {display}
        </div>
    );
};
