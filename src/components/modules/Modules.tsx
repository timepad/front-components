import * as React from 'react';
import cx from 'classnames';
import {layout} from '../../services/helpers/classHelpers';
import {Module} from './Module';
import '../../assets/css/bundle.less';

export interface IModulesProps {
    end?: boolean;
    center?: boolean;
    className?: string;
}

const Modules: React.FC<React.PropsWithChildren<IModulesProps>> = ({end, center, className, children}) => {
    const classNames = cx(
        className,
        layout('modules')({
            end: !!end,
            center: !!center,
        }),
    );
    return <div className={classNames}>{children}</div>;
};

export const ModulesWithM = Object.assign(Modules, {
    M: Module,
});
