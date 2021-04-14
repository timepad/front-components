import React, {PropsWithChildren} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import {RequireOnlyOne} from '../../../interfaces/misc/requireOnlyOne';

export interface IThemeProps {
    light: boolean;
    dark: boolean;
    default: boolean;
}

export const Theme: React.FC<PropsWithChildren<RequireOnlyOne<IThemeProps>>> = ({light, dark, children}) => {
    const classes = component('theme')({lightpic: light, darkpic: dark});
    return <div className={classes}>{children}</div>;
};
