import React, {PropsWithChildren} from 'react';
import cx from 'classnames';

interface IWithThemeStylesProps {
    theme?: 'light' | 'dark';
}

export const WithThemeStyles: React.FC<PropsWithChildren<any> & IWithThemeStylesProps> = ({children, theme}) => {
    const isDark = theme === 'dark';

    if (!isDark) {
        return <>{children}</>;
    }

    const darkThemeClasses = 'mtheme--darkpic-bg mtheme--darkpic';

    const child = React.Children.only(children);

    return React.cloneElement(child, {
        modifier: cx(child.props.modifier, darkThemeClasses),
    });
};
