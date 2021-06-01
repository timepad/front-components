import * as React from 'react';
import LogoMobile from '../../assets/svg/logo/logo.svg';
import LogoDesktop from '../../assets/svg/logo/logo-desktop.svg';
import LogoShort from '../../assets/svg/logo/logo-short.svg';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';
import './index.less';

export enum Theme {
    default = 'default',
    darkpic = 'darkpic',
    lightpic = 'lightpic',
}

export enum Variant {
    mobile = 'mobile',
    desktop = 'desktop',
    short = 'short',
}

interface ILogo {
    coverTheme?: Theme;
    link?: string;
    variant?: Variant;
}

export const Logo: React.FC<ILogo> = ({coverTheme = Theme.default, link, variant}) => {
    const themeClassName = component('theme');
    const themeLogoClassName = component('theme', 'logo');
    const logoClassName = component('logo');

    if (link) {
        // Логотип-ссылка
        if (variant && variant === Variant.desktop) {
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
        } else if (variant && variant === Variant.mobile) {
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
        } else if (variant && variant === Variant.short) {
            return (
                <div className={themeClassName(coverTheme)}>
                    <a
                        href={link}
                        className={cx(
                            themeLogoClassName(),
                            logoClassName({
                                hoverable: true,
                            }),
                        )}
                    >
                        <LogoShort />
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
        if (variant && variant == Variant.desktop) {
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
        } else if (variant && variant == Variant.mobile) {
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
        } else if (variant && variant === Variant.short) {
            return (
                <div className={themeClassName(coverTheme)}>
                    <div className={cx(themeLogoClassName(), logoClassName())}>
                        <LogoShort />
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
