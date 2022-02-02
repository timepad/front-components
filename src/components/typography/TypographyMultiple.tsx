import React, {FC} from 'react';
import Typography from './Typography';
import {component} from '../../services/helpers/classHelpers';

interface ITypographyMultiple extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    subheader?: string;
    body?: string;
    caption?: string;
    small?: string;
    reverse?: boolean;
    responsive?: boolean;
}

export const TypographyMultiple: FC<ITypographyMultiple> = ({
    subheader,
    body,
    caption,
    small,
    reverse = false,
    responsive,
    ...props
}) => {
    // TODO по мере расширения дизайн системы доработать - пока привязка к сабхедеру
    const isSubheader = !!subheader;
    const typographyMultipleClassNames = component('typography__multiple')({
        responsive,
        withsubheader: isSubheader,
    });
    const subHeaderClassNames = component('typography__multiple', 'subheader')();
    const bodyClassNames = component('typography__multiple', 'body')();
    const captionClassNames = component('typography__multiple', 'caption')();
    const smallClassNames = component('typography__multiple', 'small')();

    const posibleContent = [
        <div key="key_subheader" className={subHeaderClassNames}>
            {subheader}
        </div>,
        <div key="key_body" className={bodyClassNames}>
            {body}
        </div>,
        <div key="key_caption" className={captionClassNames}>
            {caption}
        </div>,
        <div key="key_small" className={smallClassNames}>
            {small}
        </div>,
    ];

    const content = posibleContent.filter((el) => !!el.props.children);

    return (
        <Typography {...props} variant="multiple" reverse={reverse} className={typographyMultipleClassNames}>
            {!reverse ? content.map((component) => component) : content.reverse().map((component) => component)}
        </Typography>
    );
};
