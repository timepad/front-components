import * as React from 'react';
import cx from 'classnames';
import '../../assets/css/bundle.less';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

interface IProps {
    iconName?: string;
    children?: any;
}

const story = true;

export const Icon: React.FC<IProps> = ({iconName, children}: IProps) => {
    const classNames = cx(
        component('icon')({
            story,
            iconName,
        }),
    );

    return (
        <div className={classNames}>
            {children}
            <div>{iconName}</div>
        </div>
    );
};
