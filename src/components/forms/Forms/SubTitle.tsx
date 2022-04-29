import * as React from 'react';
import {PropsWithChildren} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';

export interface ITitleProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {}

// Абсолютно бесполезный компонент
const SubTitle: React.FC<ITitleProps> = ({children, className, ...props}) => {
    const formClassName = cx(component('form', 'subtitle')(), className);
    return (
        <div {...props} className={formClassName}>
            {children}
        </div>
    );
};

export {SubTitle};
