import React from 'react';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

interface IRowIconProps {
    children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    right?: boolean;
    top?: boolean;
}

const Icon: React.FC<IRowIconProps> = ({children, right, top}: IRowIconProps): JSX.Element => {
    const classNames = component('row--icon')({
        right,
        top,
    });
    const iconClasses = ['aicon', 'cicon'];
    return (
        <div className={classNames}>
            {React.cloneElement(children, {
                className: iconClasses.join(' '),
            })}
        </div>
    );
};

export default Icon;
