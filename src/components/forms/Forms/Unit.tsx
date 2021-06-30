import * as React from 'react';
import {PropsWithChildren} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';

export enum FORM_UNIT_SIZE {
    big = 'big',
}

export interface ITitleProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
    size?: FORM_UNIT_SIZE;
}

const Unit: React.FC<ITitleProps> = ({children, className, size, ...props}) => {
    const formClassName = cx(
        component(
            'form',
            'unit',
        )({
            big: size === FORM_UNIT_SIZE.big,
        }),
        className,
    );
    return (
        <div {...props} className={formClassName}>
            {children}
        </div>
    );
};

export {Unit};
