import * as React from 'react';
import LogoSVG from '../../assets/svg/logo/logo.svg';
import {component} from '../../services/helpers/classHelpers';
import './index.less';
import {ReactElement} from 'react';

export interface ILogoProps {
    short?: boolean;
    action?: string;
}

export const Logo: React.FC<ILogoProps> = ({short, action}) => {
    const className = component('logo')();

    let result: ReactElement = <LogoSVG />;
    if (short && action) {
        result = (
            <div className={action}>
                <LogoSVG />
            </div>
        );
    } else if (short) {
        result = <LogoSVG width={12} />;
    }

    return <div className={className}>{result}</div>;
};
