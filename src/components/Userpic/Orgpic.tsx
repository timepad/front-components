import * as React from 'react';
import {MouseEventHandler} from 'react';
import {Pic} from './Pic';

interface IProps {
    // image url to use as a background of component
    // has priority on fillChar
    fillURL?: string;
    // character to to use as a background of component
    // not taken to account if fillURL is passed
    // if a string is passed fist char will be used
    // if a char is lowercase, will be automatically converted to uppercase
    fillChar?: string;
    onClick?: MouseEventHandler;
    size?: 'small' | 'medium' | 'big' | 'bigger' | 'biggest';
    className?: string;
}

export const Orgpic: React.FC<IProps> = (props) => {
    return <Pic {...props} shape="square" />;
};
