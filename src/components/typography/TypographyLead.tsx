import React, {FC} from 'react';
import Typography from './Typography';

interface ITypographySubheaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: 24;
    responsive?: boolean;
}

export const TypographyLead: FC<ITypographySubheaderProps> = ({children, size, ...props}) => {
    return (
        <Typography {...props} variant="lead" size={size}>
            {children}
        </Typography>
    );
};
