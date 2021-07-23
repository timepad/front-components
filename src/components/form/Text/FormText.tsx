import React, {FC} from 'react';
import './index.less';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import {IFormTextProps} from './FormText.types';
import ReactTextArea from 'react-textarea-autosize';

export const FormText: FC<IFormTextProps> = ({disabled, error, multiline, ...props}) => {
    const finalClassNames = cx(
        component('form--text')({
            disabled,
            error: !!error,
        }),
        props.className,
    );

    return <div className={finalClassNames}>{multiline ? <ReactTextArea {...props} /> : <input {...props} />}</div>;
};
