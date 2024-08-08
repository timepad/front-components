import * as React from 'react';
import {component} from '../../services/helpers/classHelpers';

export const ExceptionCn = component('modal', "exception-click-outside")();

export const ClickOutsideException: React.FC<React.PropsWithChildren<unknown>> = ({children}) => {
    return (
        <div className={ExceptionCn}>{children}</div>
    );
};
