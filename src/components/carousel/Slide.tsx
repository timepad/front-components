import React from 'react';
import {component} from '../../services/helpers/classHelpers';

interface ISlideProps extends Partial<React.HTMLAttributes<HTMLDivElement>> {}

export const Slide: React.FC<React.PropsWithChildren<ISlideProps>> = ({children, className = '', ...props}) => {
    const slideClassName = component('carousel', 'slide')();
    return (
        <div className={`${slideClassName} ${className}`} {...props}>
            {children}
        </div>
    );
};
