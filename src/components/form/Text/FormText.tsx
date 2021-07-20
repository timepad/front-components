import React, {FC, useEffect, useState} from 'react';
import './index.less';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import {IFormTextProps} from './FormText.types';

export const FormText: FC<IFormTextProps> = (props) => {
    const {disabled, error, multiline, value} = props;
    const [linesNumber, setLinesNumber] = useState(1);

    const finalClassNames = cx(
        component('form--text')({
            disabled,
            error: !!error,
        }),
        props.className,
    );

    useEffect(() => {
        if (value) {
            const count = (value as string).split(/\r|\r\n|\n/).length;
            setLinesNumber(count);
        }
    }, [value]);

    const text = {
        maxHeight: linesNumber === 1 && 32,
    } as React.CSSProperties;

    return (
        <div className={finalClassNames}>
            {multiline ? <textarea rows={linesNumber} style={text} {...props} /> : <input {...props} />}
        </div>
    );
};
