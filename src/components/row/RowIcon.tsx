import React from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';

import './index.less';

interface IRowIconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    right?: boolean;
    top?: boolean;
}

const RowIcon: React.FC<IRowIconProps> = (props: IRowIconProps): JSX.Element => {
    const customClassNames = component('row__icon')({
        right: props.right,
        top: props.top,
    });
    const finalClassNames = cx(customClassNames, props.className);
    const iconClasses = ['aicon', 'cicon'];

    return (
        <div {...props} className={finalClassNames}>
            {React.cloneElement(props.children, {
                className: iconClasses.join(' '),
            })}
        </div>
    );
};

export default RowIcon;