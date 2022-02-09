import React, {FC} from 'react';
import Typography from './Typography';

interface ITypographySubheaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: 24 | 16;
    responsive?: boolean;
}

export const TypographyBody: FC<ITypographySubheaderProps> = ({children, size, ...props}) => {
    return (
        <Typography {...props} variant="body" size={size}>
            {children}
        </Typography>
    );
};
