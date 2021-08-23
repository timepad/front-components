import * as React from 'react';
import LogoSVG from '../../assets/svg/logo/logo.svg';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

export interface ILogoProps {
    short?: boolean;
    expandable?: boolean;
}

export const Logo: React.FC<ILogoProps> = ({short, expandable}) => {
    const className = component('logo')();

    return (
        <div className={className}>
            {short ? (
                expandable ? (
                    <div className="expandable">
                        <LogoSVG />
                    </div>
                ) : (
                    <LogoSVG width={12} />
                )
            ) : (
                <LogoSVG />
            )}
        </div>
    );
};
