import * as React from 'react';
import LogoMobile from '../../assets/svg/logo/logo.svg';
import LogoDesktop from '../../assets/svg/logo/logo-big.svg';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';
import './index.less';

export enum Theme {
    default = 'default',
    darkpic = 'darkpic',
    lightpic = 'lightpic',
}

export enum Device {
    mobile = 'mobile',
    desktop = 'desktop',
}

interface ILogo {
    coverTheme?: Theme;
    link?: string;
    device?: Device;
}

export const Logo: React.FC<ILogo> = ({coverTheme = Theme.default, link, device}) => {
    const themeClassName = component('theme');
    const themeLogoClassName = component('theme', 'logo');
    const logoClassName = component('logo');

    if (link) {
        // Логотип-ссылка
        if (device && device == Device.desktop) {
            return (
                <div className={themeClassName(coverTheme)}>
                    <a
                        href={link}
                        className={cx(
                            themeLogoClassName(),
                            logoClassName({
                                desktop: true,
                                hoverable: true,
                            }),
                        )}
                    >
                        <LogoDesktop />
                    </a>
                </div>
            );
        } else if (device && device == Device.mobile) {
            return (
                <div className={themeClassName(coverTheme)}>
                    <a
                        href={link}
                        className={cx(
                            themeLogoClassName(),
                            logoClassName({
                                mobile: true,
                                hoverable: true,
                            }),
                        )}
                    >
                        <LogoMobile />
                    </a>
                </div>
            );
        } else {
            return (
                <div className={themeClassName(coverTheme)}>
                    <a
                        href={link}
                        className={cx(
                            themeLogoClassName(),
                            logoClassName({
                                desktop: true,
                                hoverable: true,
                            }),
                            'hidden-portrait',
                        )}
                    >
                        <LogoDesktop />
                    </a>

                    <a
                        href={link}
                        className={cx(
                            themeLogoClassName(),
                            logoClassName({
                                mobile: true,
                                hoverable: true,
                            }),
                            'hidden-desktop hidden-tablet',
                        )}
                    >
                        <LogoMobile />
                    </a>
                </div>
            );
        }
    } else {
        // Просто логотип
        if (device && device == Device.desktop) {
            return (
                <div className={themeClassName(coverTheme)}>
                    <div
                        className={cx(
                            themeLogoClassName(),
                            logoClassName({
                                desktop: true,
                            }),
                        )}
                    >
                        <LogoDesktop />
                    </div>
                </div>
            );
        } else if (device && device == Device.mobile) {
            return (
                <div className={themeClassName(coverTheme)}>
                    <div
                        className={cx(
                            themeLogoClassName(),
                            logoClassName({
                                mobile: true,
                            }),
                        )}
                    >
                        <LogoMobile />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={themeClassName(coverTheme)}>
                    <div
                        className={cx(
                            themeLogoClassName(),
                            logoClassName({
                                desktop: true,
                            }),
                            'hidden-portrait',
                        )}
                    >
                        <LogoDesktop />
                    </div>

                    <div
                        className={cx(
                            themeLogoClassName(),
                            logoClassName({
                                mobile: true,
                            }),
                            'hidden-desktop hidden-tablet',
                        )}
                    >
                        <LogoMobile />
                    </div>
                </div>
            );
        }
    }
};
