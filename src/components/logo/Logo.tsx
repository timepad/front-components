import * as React from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';
import './index.less';

export enum Theme {
    default = 'default',
    darkpic = 'darkpic',
    lightpic = 'lightpic',
}

interface ILogoWrapperProps {
    coverTheme?: Theme;
    link?: string;
    mobile?: boolean;
}

export const LogoWrapper: React.FC<ILogoWrapperProps> = ({coverTheme = Theme.default, link, mobile, children}) => {
    const themeClassName = component('theme');
    const themeLogoClassName = component('theme', 'logo');
    const logoClassName = component('logo');

    if (link) {
        // Логотип-ссылка
        return (
            <div className={themeClassName(coverTheme)}>
                <a
                    href={link}
                    className={cx(
                        themeLogoClassName(),
                        logoClassName({
                            desktop: !mobile,
                            mobile,
                            hoverable: true,
                        }),
                    )}
                >
                    {children}
                </a>
            </div>
        );
    } else {
        // Просто логотип
        return (
            <div className={themeClassName(coverTheme)}>
                <div
                    className={cx(
                        themeLogoClassName(),
                        logoClassName({
                            desktop: !mobile,
                            mobile,
                        }),
                    )}
                >
                    {children}
                </div>
            </div>
        );
    }
};
