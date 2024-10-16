import React, {PropsWithChildren} from 'react';

interface IWithThemeStylesProps {
    theme?: 'light' | 'dark';
}

export const WithThemeStyles: React.FC<PropsWithChildren<any> & IWithThemeStylesProps> = ({children, theme}) => {
    const isDark = theme === 'dark';
    if (!isDark) {
        return <>{children}</>;
    }

    const darkThemeClasses = 'mtheme--darkpic-bg mtheme--darkpic';

    return <div className={darkThemeClasses}>{children}</div>;
};
