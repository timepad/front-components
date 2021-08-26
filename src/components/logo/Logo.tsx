import * as React from 'react';
import LogoSVG from '../../assets/svg/logo/logo.svg';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

type Colors = 'gray' | 'white' | 'blue' | 'purple';
type Actions = 'expandable' | 'hoverable';

export interface ILogoProps {
    short?: boolean;
    action?: Actions | '';
    color?: Colors | '';
}

export const Logo: React.FC<ILogoProps> = ({short, action, color}) => {
    const className = component('logo')();

    return (
        <div className={className}>
            <div className={action}>
                <LogoSVG className={color ?? ''} width={short ? 12 : 107} />
            </div>
        </div>
    );
};
