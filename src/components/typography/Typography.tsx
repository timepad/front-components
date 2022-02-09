import React, {FC} from 'react';
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

interface ITypographyProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    variant: 'header' | 'subheader' | 'lead' | 'body' | 'small' | 'caption' | 'multiple';
    size?: 8 | 16 | 24 | 32;
    reverse?: boolean;
    responsive?: boolean;
}

const Typography: FC<ITypographyProps> & ITypographyChildren = ({
    children,
    variant,
    size,
    className,
    reverse,
    responsive,
    ...props
}) => {
    const elementClassNames = cn(
        component(
            'typography',
            variant,
        )({
            [`${size}`]: !!size,
            reverse,
            responsive,
        }),
        className,
    );

    const classNames = cn(component('typography')(), elementClassNames);

    return (
        <div {...props} className={classNames}>
            {children}
        </div>
    );
};

Typography.Header = TypographyHeader;
Typography.Subheader = TypographySubheader;
Typography.Lead = TypographyLead;
Typography.Body = TypographyBody;
Typography.Caption = TypographyCaption;
Typography.Small = TypographySmall;
Typography.Multiple = TypographyMultiple;

export default Typography;
