import React, {FC} from 'react';
import Typography, {ITypographyCommonProps} from './Typography';

type PossibleSizesType = 24 | 16;

export const TypographyBody: FC<ITypographyCommonProps<PossibleSizesType>> = ({children, size, ...props}) => {
    return (
        <Typography {...props} variant="body" size={size}>
            {children}
        </Typography>
    );
};
