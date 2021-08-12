import React, {FC} from 'react';
import './index.less';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import {IFormTextProps} from './Text.types';
import {Textarea} from '../Textarea';

export const Text: FC<IFormTextProps> = ({disabled, error, className, ...props}) => {
    const finalClassNames = cx(
        component('text')({
            disabled,
            error: !!error,
        }),
        className,
    );

    return <div className={finalClassNames}>{props.multiline ? <Textarea {...props} /> : <input {...props} />}</div>;
};
