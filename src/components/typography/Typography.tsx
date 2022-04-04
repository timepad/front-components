import React, {FC, ReactHTML} from 'react';
import {TypographyHeader} from './TypographyHeader';
import {TypographySubheader} from './TypographySubheader';
import {TypographyLead} from './TypographyLead';
import {TypographyBody} from './TypographyBody';
import {TypographyCaption} from './TypographyCaption';
import {TypographySmall} from './TypographySmall';
import {component} from '../../services/helpers/classHelpers';
import cn from 'classnames';
import './index.less';
import {TypographyMultiple} from './TypographyMultiple';

interface ITypographyChildren {
    Header: typeof TypographyHeader;
    Subheader: typeof TypographySubheader;
    Lead: typeof TypographyLead;
    Body: typeof TypographyBody;
    Caption: typeof TypographyCaption;
    Small: typeof TypographySmall;
    Multiple: typeof TypographyMultiple;
}

type PossibleSizesType = 8 | 16 | 24 | 32;

export interface ITypographyProps extends ITypographyCommonProps<PossibleSizesType> {
    variant: 'header' | 'subheader' | 'lead' | 'body' | 'small' | 'caption' | 'multiple';
    reverse?: boolean;
}

export interface ITypographyCommonProps<Size = undefined>
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    responsive?: boolean;
    noPadding?: boolean;
    noWrap?: boolean;
    fontWeight?: 'regular' | 'bold' | 'black';
    size?: Size;
    as?: keyof ReactHTML;
}

const Typography: FC<ITypographyProps> & ITypographyChildren = ({
    children,
    variant,
    size,
    fontWeight,
    className,
    reverse,
    responsive,
    noPadding,
    noWrap,
    as = 'div',
    ...props
}) => {
    const elementClassNames = cn(
        component(
            'typography',
            variant,
        )({
            [`${size}`]: !!size,
            reverse,
        }),
        className,
    );

    const classNames = cn(
        component('typography')({
            [`${fontWeight}`]: !!fontWeight,
            responsive,
            ['no-padding']: noPadding,
            ['no-wrap']: noWrap,
        }),
        elementClassNames,
    );

    return React.createElement(as, {className: classNames, ...props}, children);
};

Typography.Header = TypographyHeader;
Typography.Subheader = TypographySubheader;
Typography.Lead = TypographyLead;
Typography.Body = TypographyBody;
Typography.Caption = TypographyCaption;
Typography.Small = TypographySmall;
Typography.Multiple = TypographyMultiple;

export default Typography;
