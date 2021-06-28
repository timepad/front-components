import * as React from 'react';
import cx from 'classnames';
import '../../assets/css/bundle.less';

type moduleSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IModuleProps {
    size?: moduleSize;
    className?: string;
    children?: React.ReactNode;
}

const defaultModuleSize: moduleSize = 12;

export const ModuleAbsolute: React.FC<IModuleProps> = ({
    size = defaultModuleSize,
    className,
    children,
}: IModuleProps) => {
    const classNames = cx(className, `lmodule-absolute-${size}`);

    return <div className={classNames}>{children}</div>;
};
