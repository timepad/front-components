import React, {FC} from 'react';
import Typography from './Typography';

type ITypographyHeaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const TypographyHeader: FC<ITypographyHeaderProps> = ({children, ...props}) => {
    return (
        <Typography {...props} variant="header">
            {children}
        </Typography>
    );
};
