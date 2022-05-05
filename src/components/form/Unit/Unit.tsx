import * as React from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import {FORM_UNIT_SIZE, IUnitProps} from './Unit.types';

const Unit: React.FC<IUnitProps> = ({children, className, size, ...props}) => {
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
