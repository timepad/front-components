import * as React from 'react';
import cx from 'classnames';
import {layout} from '../../services/helpers/classHelpers';
import '../../assets/css/bundle.less';

type moduleSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IModuleProps {
    portrait?: moduleSize;
    desktop?: moduleSize;
    tablet?: moduleSize;
    mobile?: moduleSize;
    first?: boolean;
    firstMobile?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const defaultModuleSize: moduleSize = 12;

// не подставляем modifier в layout(), тк функция возвращает не нужный нам класс lmodules__[size]
const getModulesClassName = (modifier: string, size: number): string =>
    `${layout('modules', `${size}`)()}--${modifier}`;

export const Module: React.FC<IModuleProps> = ({
    desktop,
    tablet,
    mobile,
    portrait,
    first,
    firstMobile,
    children,
    className,
}: IModuleProps) => {
    const mobileSize = mobile || portrait;
    const tabletSize = tablet || mobileSize;
    const desktopSize = desktop || tabletSize;

    const classNames = cx(
        className,
        portrait && getModulesClassName('portrait', portrait),
        mobileSize && getModulesClassName('mobile', mobileSize),
        tabletSize && getModulesClassName('tablet', tabletSize),
        desktopSize && getModulesClassName('desktop', desktopSize),
        first && layout('modules', 'first')(),
        firstMobile && layout('modules', 'first-mobile')(),
        !desktopSize && layout('modules', `${defaultModuleSize}`)(),
    );

    return <div className={classNames}>{children}</div>;
};
