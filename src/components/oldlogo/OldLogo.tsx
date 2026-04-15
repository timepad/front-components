import * as React from 'react';
import {Logo as LogoSVG} from '../../icons';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

type Colors = 'gray' | 'white' | 'blue' | 'purple';
type Actions = 'expandable' | 'hoverable';

interface ILogoProps {
    short?: boolean;
    action?: Actions;
    color?: Colors;
}

export const OldLogo: React.FC<React.PropsWithChildren<ILogoProps>> = ({short, action, color}) => {
    const className = component('old-logo')({
        expandable: action === 'expandable',
        hoverable: action === 'hoverable',
    });

    return (
        <div className={className}>
            <LogoSVG className={color ?? ''} width={short ? 12 : 107} />
        </div>
    );
};
