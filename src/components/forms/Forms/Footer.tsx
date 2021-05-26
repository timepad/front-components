import * as React from 'react';
import {PropsWithChildren} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';

export interface IFooterProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {}

const Footer: React.FC<IFooterProps> = ({children, className, ...props}) => {
    const formClassName = cx(component('form', 'footer')(), className);

    return (
        <div className={formClassName} {...props}>
            {children}
        </div>
    );
};

export {Footer};
