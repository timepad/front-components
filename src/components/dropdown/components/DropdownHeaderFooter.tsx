import * as React from 'react';
import {FC} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import {Divider} from '../../divider';

export interface IFooterHeaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    desktop?: boolean;
    mobile?: boolean;
}

export const DropdownHeader: FC<React.PropsWithChildren<IFooterHeaderProps>> = ({
    mobile,
    desktop,
    children,
    ...props
}) => {
    const className = cx(
        'сtheme--darkpic-bg mtheme--darkpic',
        component('dropdown', 'header')({mobile, desktop}),
        props.className,
    );

    return (
        <div {...props} className={className}>
            {children}
        </div>
    );
};

export const DropdownFooter: FC<React.PropsWithChildren<IFooterHeaderProps>> = ({
    mobile,
    desktop,
    children,
    ...props
}) => {
    const className = cx(component('dropdown', 'footer')({mobile, desktop}), props.className);

    return (
        <div className="mtheme--darkpic-bg mtheme--darkpic">
            {mobile && <Divider />}
            <div {...props} className={className}>
                {children}
            </div>
        </div>
    );
};
