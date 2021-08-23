import * as React from 'react';
import LogoFull from '../../assets/svg/logo/logo.svg';
import LogoShort from '../../assets/svg/logo/logo-short.svg';
import {ExpandableLogo} from './ExpandableLogo';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

export interface ILogoProps {
    short?: boolean;
    expandable?: boolean;
}

export const Logo: React.FC<ILogoProps> = ({short, expandable}) => {
    const className = component('logo')();

    return <div className={className}>{short ? expandable ? <ExpandableLogo /> : <LogoShort /> : <LogoFull />}</div>;
};
