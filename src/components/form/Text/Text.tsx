import React, {FC} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import {IFormTextProps} from './Text.types';
import {Textarea} from '../Textarea';

import './index.less';

export const Text: FC<React.PropsWithChildren<IFormTextProps>> = ({
    disabled = false,
    error = '',
    className = '',
    ...props
}: IFormTextProps) => {
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
                <input disabled={disabled} {...(props as any)} />
            )}
        </div>
    );
};
