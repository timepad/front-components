import React from 'react';
import './index.less';
import {component, Theme} from '../../services/helpers/classHelpers';

export interface ISpinLoaderProps {
    theme?: Theme;
}

export const SpinLoader: React.FC<React.PropsWithChildren<ISpinLoaderProps>> = ({theme = Theme.default}) => {
    return (
        <div className={component('spinloader', 'wrapper')()}>
            <div className={component('spinloader')({color: theme})} />
        </div>
    );
};
