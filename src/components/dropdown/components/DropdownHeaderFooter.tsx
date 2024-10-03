import * as React from 'react';
import {FC} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import {Divider} from '../../divider';

export interface IFooterHeaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    element?: boolean;
    down?: boolean;
    center?: boolean;
    auto?: boolean;
}

export const DropdownHeader: FC<React.PropsWithChildren<IFooterHeaderProps>> = ({
    down,
    element,
    center,
    auto,
    children,
    ...props
}) => {
    const className = cx(component('dropdown', 'header')({down, element, center, auto}), props.className);

    return (
        <div {...props} className={className}>
            {children}
        </div>
    );
};

export const DropdownFooter: FC<React.PropsWithChildren<IFooterHeaderProps>> = ({
    down,
    element,
    center,
    auto,
    children,
    ...props
}) => {
    const className = cx(component('dropdown', 'footer')({down, element, center, auto}), props.className);
    return (
        <div>
            {down && <Divider />}
            <div {...props} className={className}>
                {children}
            </div>
        </div>
    );
};
