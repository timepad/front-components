import React from 'react';
import {Theme} from './theme';
import './index.less';

export interface ISpinLoaderProps {
    theme?: Theme;
}

export const SpinLoader: React.FC<ISpinLoaderProps> = ({theme = Theme.default}) => {
    return (
        <div className="cspinloader--wrapper">
            <div className={`cspinloader cspinloader--color-${theme}`} />
        </div>
    );
};
