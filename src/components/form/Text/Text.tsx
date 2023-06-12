import React, {FC} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import {IFormTextProps} from './Text.types';
import {Textarea} from '../Textarea';

import './index.less';

export const Text: FC<Omit<IFormTextProps, 'ref'>> = ({
    disabled = false,
    textareaRef,
    inputRef,
    error = '',
    className = '',
    multiline = false,
    ...props
}: IFormTextProps) => {
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
                <Textarea disabled={disabled} ref={textareaRef} {...props} />
            ) : (
                <input disabled={disabled} ref={inputRef} {...props} />
            )}
        </div>
    );
};
