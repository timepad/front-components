import React, {FC} from 'react';
import Typography from './Typography';

interface ITypographySubheaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: 8;
    responsive?: boolean;
}

export const TypographySmall: FC<ITypographySubheaderProps> = ({children, size, ...props}) => {
    return (
        <Typography {...props} variant="small" size={size}>
            {children}
        </Typography>
    );
};
