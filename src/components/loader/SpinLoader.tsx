import React from 'react';
import {Theme} from './theme';
import './index.less';
import {component} from '../../services/helpers/classHelpers';

export interface ISpinLoaderProps {
    theme?: Theme;
}

export const SpinLoader: React.FC<ISpinLoaderProps> = ({theme = Theme.default}) => {
    return (
        <div className={component('spinloader', 'wrapper')()}>
            <div className={component('spinloader')({color: theme})} />
        </div>
    );
};
