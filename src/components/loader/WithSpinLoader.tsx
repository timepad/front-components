import React from 'react';
import {ISpinLoaderProps, SpinLoader} from './SpinLoader';

interface IWithSpinLoader extends ISpinLoaderProps {
    isLoaded: boolean;
}

export const WithSpinLoader: React.FC<IWithSpinLoader> = ({isLoaded, children, ...loaderProps}) => {
    return <>{isLoaded ? children : <SpinLoader {...loaderProps} />}</>;
};
