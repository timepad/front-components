import React, {FC, PropsWithChildren} from 'react';
import Typography, {ITypographyCommonProps} from './Typography';

export const TypographyMultiple: FC<PropsWithChildren<ITypographyCommonProps>> = ({children, ...props}) => {
    return (
        <Typography {...props} variant="multiple">
            {children}
        </Typography>
    );
};
