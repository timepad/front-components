import React, {FC} from 'react';
import Typography from './Typography';
import {component} from '../../services/helpers/classHelpers';

interface ITypographyMultiple extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    text: string;
    caption: string;
    reverse?: boolean;
}

export const TypographyMultiple: FC<ITypographyMultiple> = ({text, caption, reverse = false, ...props}) => {
    const textClassNames = component('typography__multiple', 'text')();
    const captionClassNames = component('typography__multiple', 'caption')();

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
