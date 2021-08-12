import React from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';

import './index.less';

interface IRowIconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    top?: boolean;
    bottom?: boolean;
}

const RowIcon: React.FC<IRowIconProps> = (props: IRowIconProps): JSX.Element => {
    const customClassNames = component(
        'row',
        'icon',
    )({
        top: props.top,
        bottom: props.bottom,
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
