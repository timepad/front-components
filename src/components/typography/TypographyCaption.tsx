import React, {FC} from 'react';
import Typography from './Typography';

type ITypographySubheaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const TypographyCaption: FC<ITypographySubheaderProps> = ({children, ...props}) => {
    return (
        <Typography {...props} variant="caption">
            {children}
        </Typography>
    );
};
