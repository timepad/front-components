import React, {FC} from 'react';
import cn from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import Typography from './Typography';

interface ITypographySubheaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: 32 | 24;
}

export const TypographyLead: FC<ITypographySubheaderProps> = ({children, size = 32, className, ...props}) => {
    const classNames = cn(
        component(
            'typography',
            'lead',
        )({
            [`${size}`]: true,
        }),
        className,
    );

    return (
        <Typography {...props} className={classNames}>
            {children}
        </Typography>
    );
};
