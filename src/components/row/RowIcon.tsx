import React from 'react';
import {component} from '../../services/helpers/classHelpers';
import cx from 'classnames';

import './index.less';

interface IRowIconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    top?: boolean;
    bottom?: boolean;
}

const RowIcon: React.FC<React.PropsWithChildren<IRowIconProps>> = ({
    top,
    bottom,
    ...props
}: IRowIconProps): JSX.Element => {
    const customClassNames = component(
        'row',
        'icon',
    )({
        top: top,
        bottom: bottom,
    });
    const finalClassNames = cx(customClassNames, props.className);
    // add classnames for any svg as component
    const iconClasses = ['cicon'];

    return (
        <div {...props} className={finalClassNames}>
            {React.cloneElement(props.children, {
                className: iconClasses.join(' '),
            })}
        </div>
    );
};

export default RowIcon;
