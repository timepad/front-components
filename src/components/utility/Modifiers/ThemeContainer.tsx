import * as React from 'react';
import {PropsWithChildren} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import {RequireOnlyOne} from '../../../interfaces/misc/requireOnlyOne';

export interface IThemeProps {
    light: boolean;
    dark: boolean;
    default: boolean;
}

export const ThemeContainer = ({
    light,
    dark,
    children,
}: PropsWithChildren<RequireOnlyOne<IThemeProps>>): React.ReactElement => {
    const classes = component('theme')({lightpic: light, darkpic: dark});
    return <div className={classes}>{children}</div>;
};
