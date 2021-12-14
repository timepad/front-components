import React, {FC} from 'react';
import cn from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import Typography from './Typography';

interface ITypographySubheaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: 16 | 8;
}

export const TypographySmall: FC<ITypographySubheaderProps> = ({children, size = 16, className, ...props}) => {
    const classNames = cn(
        component(
            'typography',
            'small',
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
