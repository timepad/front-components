import React, {PropsWithChildren} from 'react';
import cx from 'classnames';

interface IWithThemeStylesProps {
    theme?: 'light' | 'dark';
    pinned?: boolean;
}

export const WithThemeStyles: React.FC<PropsWithChildren<any> & IWithThemeStylesProps> = ({
    children,
    theme,
    pinned,
}) => {
    const isDark = theme === 'dark';

    if (!isDark) {
        return <>{children}</>;
    }

    const darkThemeClasses = 'mtheme--darkpic-bg mtheme--darkpic';
    const borderRadius = 'cdropdown__popup--radius';

    const child = React.Children.only(children);

    return React.cloneElement(child, {
        modifier: cx(child.props.modifier, darkThemeClasses, {[borderRadius]: pinned}),
    });
};
