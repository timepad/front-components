import React from 'react';
import {ISpinLoaderProps, SpinLoader} from './SpinLoader';

interface ISpinLoaderWrapper extends ISpinLoaderProps {
    isLoading: boolean;
}

export const SpinLoaderWrapper: React.FC<ISpinLoaderWrapper> = ({isLoading, children, ...loaderProps}) => {
    return <>{isLoading ? <SpinLoader {...loaderProps} /> : children}</>;
};
