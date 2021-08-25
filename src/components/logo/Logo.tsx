import * as React from 'react';
import LogoSVG from '../../assets/svg/logo/logo.svg';
import {component} from '../../services/helpers/classHelpers';
import './index.less';
import {ReactElement} from 'react';

type Colors = 'gray' | 'white' | 'blue' | 'purple';

export interface ILogoProps {
    short?: boolean;
    action?: string;
    color?: Colors | '';
}

export const Logo: React.FC<ILogoProps> = ({short, action, color}) => {
    const className = component('logo')();

    let result: ReactElement = <LogoSVG className={color ?? ''} />;
    if (short && action) {
        result = (
            <div className={action}>
                <LogoSVG className={color ?? ''} />
            </div>
        );
    } else if (short) {
        result = <LogoSVG width={12} className={color ?? ''} />;
    }

    return <div className={className}>{result}</div>;
};
