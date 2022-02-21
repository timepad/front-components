import React, {FC} from 'react';
import Typography, {ITypographyCommonProps} from './Typography';

type PossibleSizesType = 24;

export const TypographySubheader: FC<ITypographyCommonProps<PossibleSizesType>> = ({children, size, ...props}) => {
    return (
        <Typography {...props} variant="subheader" size={size}>
            {children}
        </Typography>
    );
};
