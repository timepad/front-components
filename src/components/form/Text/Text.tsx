import React, {FC} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import {IFormTextProps} from './Text.types';
import {Textarea} from '../Textarea';

import './index.less';

export const Text: FC<IFormTextProps> = ({disabled = false, error = '', className = '', ...props}: IFormTextProps) => {
    const finalClassNames = cx(
        component('text')({
            disabled,
            error: !!error,
        }),
        className,
    );

    // TODO: сверху все типизировано, здесь необходим any, иначе в otp ничего не билдится
    return (
        <div className={finalClassNames}>
            {props.multiline ? (
                <Textarea disabled={disabled} {...props} />
            ) : (
                <input disabled={disabled} ref={(props as any).inputRef} {...(props as any)} />
            )}
        </div>
    );
};
