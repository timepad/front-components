import React, {FC} from 'react';
import Typography from './Typography';
import {component} from '../../services/helpers/classHelpers';
import cn from 'classnames';

interface ITypographyMultiple extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    text: string;
    caption: string;
    reverse?: boolean;
}

export const TypographyMultiple: FC<ITypographyMultiple> = ({text, caption, reverse = false, className, ...props}) => {
    const classNames = cn(
        component(
            'typography',
            'multiple',
        )({
            reverse,
        }),
        className,
    );

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
        <Typography {...props} className={classNames}>
            {!reverse ? content.map((component) => component) : content.reverse().map((component) => component)}
        </Typography>
    );
};
