import * as React from 'react';
import LogoFull from '../../assets/svg/logo/logo.svg';
import LogoShort from '../../assets/svg/logo/logo-short.svg';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

export interface ILogoProps {
    short?: boolean;
}

export const Logo: React.FC<ILogoProps> = ({short}) => {
    const className = component('logo')();

    if (short) {
        return (
            <div className={className}>
                <LogoShort />
            </div>
        );
    } else {
        return (
            <div className={className}>
                <LogoFull />
            </div>
        );
    }
};
