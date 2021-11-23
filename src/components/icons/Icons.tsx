import * as React from 'react';
import cx from 'classnames';
import '../../assets/css/bundle.less';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

interface IProps {
    iconName?: string;
    children?: any;
}

export const Icon: React.FC<IProps> = ({iconName, children}: IProps) => {
    const classNames = cx(
        component('icon')({
            iconName,
        }),
    );

    return (
        <div className={classNames}>
            <div>{iconName}</div>
            {children}
        </div>
    );
};
