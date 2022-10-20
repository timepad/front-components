import React, {FC} from 'react';
import Typography, {ITypographyCommonProps} from './Typography';

export const TypographyHeader: FC<React.PropsWithChildren<ITypographyCommonProps>> = ({children, ...props}) => {
    return (
        <Typography {...props} variant="header">
            {children}
        </Typography>
    );
};
