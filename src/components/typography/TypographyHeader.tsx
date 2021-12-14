import React, {FC} from 'react';
import cn from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import Typography from './Typography';

type ITypographyHeaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const TypographyHeader: FC<ITypographyHeaderProps> = ({children, className, ...props}) => {
    const classNames = cn(component('typography', 'header')(), className);

    return (
        <Typography {...props} className={classNames}>
            {children}
        </Typography>
    );
};
