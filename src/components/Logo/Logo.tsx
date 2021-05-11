import LogoMobile from '../../assets/svg/logo/logo.svg';
import LogoDesktop from '../../assets/svg/logo/logo-big.svg';
import React from 'react';

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

export const Logo = ({coverTheme = Theme.default, link, device}: ILogo): React.ReactElement => {
    if (link) {
        // Логотип-ссылка

        if (device && device == Device.desktop) {
            return (
                <div className={`mtheme mtheme--${coverTheme}`}>
                    <a href={link} className="mtheme__alogo alogo alogo--desktop alogo--hoverable">
                        <LogoDesktop />
                    </a>
                </div>
            );
        } else if (device && device == Device.mobile) {
            return (
                <div className={`mtheme mtheme--${coverTheme}`}>
                    <a href={link} className="mtheme__alogo alogo alogo--mobile alogo--hoverable">
                        <LogoMobile />
                    </a>
                </div>
            );
        } else {
            return (
                <div className={`mtheme mtheme--${coverTheme}`}>
                    <a href={link} className="mtheme__alogo alogo alogo--desktop alogo--hoverable hidden-portrait">
                        <LogoDesktop />
                    </a>

                    <a
                        href={link}
                        className="mtheme__alogo alogo alogo--mobile alogo--hoverable hidden-desktop hidden-tablet"
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
                <div className={`mtheme mtheme--${coverTheme}`}>
                    <div className="mtheme__alogo alogo alogo--desktop">
                        <LogoDesktop />
                    </div>
                </div>
            );
        } else if (device && device == Device.mobile) {
            return (
                <div className={`mtheme mtheme--${coverTheme}`}>
                    <div className="mtheme__alogo alogo alogo--mobile">
                        <LogoMobile />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={`mtheme mtheme--${coverTheme}`}>
                    <div className="mtheme__alogo alogo alogo--desktop hidden-portrait">
                        <LogoDesktop />
                    </div>

                    <div className="mtheme__alogo alogo alogo--mobile hidden-desktop hidden-tablet">
                        <LogoMobile />
                    </div>
                </div>
            );
        }
    }
};
