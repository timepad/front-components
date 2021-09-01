import * as React from 'react';
import cx from 'classnames';
import {layout} from '../../services/helpers/classHelpers';
import '../../assets/css/bundle.less';
import {moduleSize} from './types';

export interface IModuleProps {
    size?: moduleSize;
    className?: string;
}

const defaultModuleSize: moduleSize = 12;

export const ModuleAbsolute: React.FC<IModuleProps> = ({size = defaultModuleSize, className, children}) => {
    const classNames = cx(className, layout(`module-absolute-${size}`)());

    return <div className={classNames}>{children}</div>;
};
