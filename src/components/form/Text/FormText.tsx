import React, {FC} from 'react';
import './index.less';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';

interface IFormTextProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    dark?: boolean;
}

export const FormText: FC<IFormTextProps> = (props) => {
    const {dark, disabled} = props;

    const finalClassNames = cx(
        component('form--text')({
            dark,
            disabled,
        }),
        props.className,
    );

    return <input placeholder="Empty" {...props} className={finalClassNames} />;
};
