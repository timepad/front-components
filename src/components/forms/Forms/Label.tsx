import * as React from 'react';
import {PropsWithChildren} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';

export interface ITitleProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
    error?: boolean;
}

const Label: React.FC<ITitleProps> = ({children, className, error, ...props}) => {
    const formClassName = cx(
        component(
            'form',
            'label',
        )({
            error: error,
        }),
        className,
    );
    return (
        <div {...props} className={formClassName}>
            {children}
        </div>
    );
};

export {Label};
