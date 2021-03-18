import React, {PropsWithChildren} from 'react';
import {molecule} from '../../../services/helpers/ClassHelper';
import {RequireOnlyOne} from '../../../interfaces/misc/requireOnlyOne';

export interface IThemeProps {
    light: boolean;
    dark: boolean;
    default: boolean;
}

export const Theme = ({light, dark, children}: PropsWithChildren<RequireOnlyOne<IThemeProps>>): React.ReactElement => {
    const classes = molecule('theme')({lightpic: light, darkpic: dark});
    return <div className={classes}>{children}</div>;
};
