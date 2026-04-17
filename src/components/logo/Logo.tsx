import * as React from 'react';
import cx from 'classnames';

import './index.less';
import {TimepadLogoBlack, TimepadLogoWhite, TimepadLogoShortFill, TimepadLogoShortOutline} from '../../icons';
import {component} from 'services/helpers/classHelpers';

export interface ILogoProps extends React.HTMLAttributes<HTMLDivElement> {
    short?: boolean;
    inverted?: boolean;
}

export const Logo: React.FC<React.PropsWithChildren<ILogoProps>> = ({short, inverted, className, ...props}) => {
    const Icon = short ? <TimepadLogoShortFill /> : <TimepadLogoBlack />;
    const InvertedIcon = short ? <TimepadLogoShortOutline /> : <TimepadLogoWhite />;

    const logoClassName = cx(component('timepad-logo')(), className);

    return (
        <div className={logoClassName} {...props}>
            {inverted ? InvertedIcon : Icon}
        </div>
    );
};
