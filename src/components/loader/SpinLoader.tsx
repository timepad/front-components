import React from 'react';
import './index.less';
import {component, Theme} from '../../services/helpers/classHelpers';
import cx from 'classnames';
import {qaTags} from '../../services';
import {IAdditionalAttributes} from '../../../types';

type DivProps = JSX.IntrinsicElements['div'];

export interface ISpinLoaderProps extends DivProps, IAdditionalAttributes {
    theme?: Theme;
}

export const SpinLoader: React.FC<React.PropsWithChildren<ISpinLoaderProps>> = ({
    theme = Theme.default,
    className,
    ...props
}) => {
    return (
        <div
            className={cx(component('spinloader', 'wrapper')(), className)}
            {...props}
            data-qa={props['data-qa'] || qaTags.loader}
        >
            <div className={component('spinloader')({color: theme})} />
        </div>
    );
};
