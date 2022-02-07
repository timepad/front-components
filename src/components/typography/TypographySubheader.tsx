import React, {FC} from 'react';
import Typography from './Typography';

interface ITypographySubheaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: 24;
    responsive?: boolean;
}

export const TypographySubheader: FC<ITypographySubheaderProps> = ({children, size, ...props}) => {
    return (
        <Typography {...props} variant="subheader" size={size}>
            {children}
        </Typography>
    );
};
