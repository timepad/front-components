import React, {FC, ReactNode} from 'react';
import Typography, {ITypographyCommonProps} from './Typography';
import {component} from '../../services/helpers/classHelpers';

interface ITypographyMultiple extends ITypographyCommonProps {
    afisha?: boolean;
    text: ReactNode;
    caption: ReactNode;
    reverse?: boolean;
}

export const TypographyMultiple: FC<React.PropsWithChildren<ITypographyMultiple>> = ({
    afisha,
    text,
    caption,
    reverse = false,
    ...props
}) => {
    // TODO: добавлен флаг afisha, который специально оверайдит стили для афишы

    const textClassNames = component('typography__multiple', 'text')({afisha});
    const captionClassNames = component('typography__multiple', 'caption')({afisha});

    const content = [
        <div key="key_text" className={textClassNames}>
            {text}
        </div>,
        <div key="key_caption" className={captionClassNames}>
            {caption}
        </div>,
    ];

    return (
        <Typography {...props} variant="multiple" reverse={reverse}>
            {!reverse ? content.map((component) => component) : content.reverse().map((component) => component)}
        </Typography>
    );
};
