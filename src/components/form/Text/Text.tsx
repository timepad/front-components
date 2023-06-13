import React, {FC} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import {ITextProps} from './Text.types';
import {Textarea} from '../Textarea';

import './index.less';
import {ITextareaProps} from '../Textarea/Textarea';

export const Text: FC<ITextProps> = ({
    disabled = false,
    error = '',
    className = '',
    multiline = false,
    textareaRef,
    inputRef,
    ...props
}) => {
    const finalClassNames = cx(
        component('text')({
            disabled,
            error: !!error,
        }),
        className,
    );

    return (
        <div className={finalClassNames}>
            {multiline ? (
                <Textarea disabled={disabled} ref={textareaRef} {...(props as ITextareaProps)} />
            ) : (
                <input disabled={disabled} ref={inputRef} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
            )}
        </div>
    );
};
