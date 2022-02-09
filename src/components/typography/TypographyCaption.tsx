import React, {FC} from 'react';
import Typography, {ITypographyCommonProps} from './Typography';

export const TypographyCaption: FC<ITypographyCommonProps> = ({children, ...props}) => {
    return (
        <Typography {...props} variant="caption">
            {children}
        </Typography>
    );
};
