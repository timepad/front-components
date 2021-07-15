import React, {FC, useEffect, useRef, useState} from 'react';
import './index.less';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';

interface IFormTextProps extends T {
    multiline?: boolean;
    error?: boolean;
}

type T = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const FormText: FC<IFormTextProps> = (props) => {
    const {disabled, error, multiline, value} = props;
    const [linesNumber, setLinesNumber] = useState(1);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [height, setHeight] = useState(22);
    const [lineHeight, setLineHeight] = useState(1.2);

    const finalClassNames = cx(
        component('form--text')({
            disabled,
            error,
            lines: linesNumber,
        }),
        props.className,
    );

    useEffect(() => {
        if (value) {
            const count = (value as string).split(/\r|\r\n|\n/).length;
            setLinesNumber(count);
        }
    }, [value]);

    useEffect(() => {
        const setHeightListener = (height: number, lineHeight: number) => () => {
            setHeight(height);
            setLineHeight(lineHeight);
        };

        const setHeight22Listener = setHeightListener(22, 22);
        const setHeight32Listener = setHeightListener(32, 18);

        if (textareaRef && textareaRef.current) {
            textareaRef.current.addEventListener('focus', setHeight32Listener);
            textareaRef.current.addEventListener('focusout', setHeight22Listener);
        }

        return () => {
            if (textareaRef && textareaRef.current) {
                textareaRef.current.removeEventListener('focus', setHeight32Listener);
                textareaRef.current.removeEventListener('focusout', setHeight22Listener);
            }
        };
    }, []);

    const text = {
        height: linesNumber > 1 ? 22 * linesNumber + 11 : height * linesNumber,
        lineHeight: `${lineHeight}px`,
        maxHeight: 32 * linesNumber,
    };

    return (
        <div className={finalClassNames}>
            {multiline ? <textarea ref={textareaRef} style={text} {...props} /> : <input {...props} />}
        </div>
    );
};
