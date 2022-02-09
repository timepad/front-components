import React, {FC} from 'react';
import Typography from './Typography';

interface ITypographyHeaderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    responsive?: boolean;
}

export const TypographyHeader: FC<ITypographyHeaderProps> = ({children, ...props}) => {
    return (
        <Typography {...props} variant="header">
            {children}
        </Typography>
    );
};
