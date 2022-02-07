import React, {FC, ReactNode} from 'react';
import Typography from './Typography';
import {component} from '../../services/helpers/classHelpers';

interface ITypographyMultiple extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    afisha?: boolean;
    text: ReactNode;
    caption: ReactNode;
    reverse?: boolean;
    responsive?: boolean;
}

export const TypographyMultiple: FC<ITypographyMultiple> = ({
    afisha,
    text,
    caption,
    reverse = false,
    responsive,
    ...props
}) => {
    // TODO временно компонент для афиши прячем за флагом - когда дизайнов добавиться - будем думать другое решение
    const typographyMultipleClassNames = component('typography__multiple')({responsive});
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
        <Typography {...props} variant="multiple" reverse={reverse} className={typographyMultipleClassNames}>
            {!reverse ? content.map((component) => component) : content.reverse().map((component) => component)}
        </Typography>
    );
};
