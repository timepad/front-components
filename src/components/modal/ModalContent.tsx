import React from 'react';
import cx from 'classnames';
import {component, layout} from '../../services/helpers/classHelpers';

export interface IContentProps {
    children: React.ReactNode;
    className?: string;
}

// eslint-disable-next-line react/display-name
export const Content = React.forwardRef<HTMLDivElement, IContentProps>(({children, className}, ref) => {
    return (
        <div ref={ref} className={cx(component('form', 'window')(), layout('flex')({'y-axis': true}), className)}>
            {children}
        </div>
    );
});
