import * as React from 'react';
import cx from 'classnames';

import './index.less';
import {TimepadLogoBlack, TimepadLogoShort} from '../../icons';
import {component} from '../../services/helpers/classHelpers';

export interface ILogoProps extends React.HTMLAttributes<HTMLDivElement> {
    short?: boolean;
}

export const Logo: React.FC<React.PropsWithChildren<ILogoProps>> = ({short, className, ...props}) => {
    const logoClassName = cx(component('logo')(), className);

    return (
        <div className={logoClassName} {...props}>
            {short ? <TimepadLogoShort /> : <TimepadLogoBlack />}
        </div>
    );
};
