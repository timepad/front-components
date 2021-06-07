import * as React from 'react';
import LogoMobile from '../../assets/svg/logo/logo.svg';
import LogoDesktop from '../../assets/svg/logo/logo-big.svg';
import LogoShort from '../../assets/svg/logo/logo-short.svg';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';
import './index.less';

export enum Theme {
    default = 'default',
    darkpic = 'darkpic',
    lightpic = 'lightpic',
}

export enum LogoVariant {
    mobile = 'mobile',
    desktop = 'desktop',
    short = 'short',
}

export interface ILogoWrapperProps {
    coverTheme?: Theme;
    link?: string;
    mobile?: boolean;
}

const LogoWrapper: React.FC<ILogoWrapperProps> = ({coverTheme = Theme.default, link, mobile, children}) => {
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

export interface ILogoProps {
    coverTheme?: Theme;
    link?: string;
    variant?: LogoVariant;
}

export const Logo: React.FC<ILogoProps> = ({coverTheme = Theme.default, link, variant}) => {
    switch (variant) {
        case LogoVariant.mobile:
            return (
                <LogoWrapper coverTheme={coverTheme} link={link} mobile>
                    <LogoMobile />
                </LogoWrapper>
            );
        case LogoVariant.short:
            return (
                <LogoWrapper coverTheme={coverTheme} link={link}>
                    <LogoShort />
                </LogoWrapper>
            );
        default:
            return (
                <LogoWrapper coverTheme={coverTheme} link={link}>
                    <LogoDesktop />
                </LogoWrapper>
            );
    }
};
