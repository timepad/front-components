import * as React from 'react';
import {PropsWithChildren} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';

export interface ITitleProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
    error?: boolean;
    commonError?: boolean;
}

const Description: React.FC<ITitleProps> = ({children, className, error, commonError, ...props}) => {
    const formClassName = cx(
        component(
            'form',
            'description',
        )({
            error: error,
            'commone-error': commonError,
        }),
        className,
    );
    return (
        <div {...props} className={formClassName}>
            {children}
        </div>
    );
};

export {Description};
