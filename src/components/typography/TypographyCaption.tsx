import React, {FC} from 'react';
import cn from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import Typography from './Typography';

type ITypographySubheaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const TypographyCaption: FC<ITypographySubheaderProps> = ({children, className, ...props}) => {
    const classNames = cn(component('typography', 'caption')(), className);

    return (
        <Typography {...props} className={classNames}>
            {children}
        </Typography>
    );
};
