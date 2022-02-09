import React, {FC} from 'react';
import Typography from './Typography';

interface ITypographySubheaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    responsive?: boolean;
}

export const TypographyCaption: FC<ITypographySubheaderProps> = ({children, ...props}) => {
    return (
        <Typography {...props} variant="caption">
            {children}
        </Typography>
    );
};
