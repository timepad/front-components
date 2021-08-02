import React, {FC} from 'react';
import './index.less';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import {IFormTextProps} from './FormText.types';
import {Textarea} from '../Textarea';

export const FormText: FC<IFormTextProps> = ({disabled, error, className, ...props}) => {
    const finalClassNames = cx(
        component('form--text')({
            disabled,
            error: !!error,
        }),
        className,
    );

    return <div className={finalClassNames}>{props.multiline ? <Textarea {...props} /> : <input {...props} />}</div>;
};
