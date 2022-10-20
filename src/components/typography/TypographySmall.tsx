import React, {FC} from 'react';
import Typography, {ITypographyCommonProps} from './Typography';

type PossibleSizesType = 8;

export const TypographySmall: FC<React.PropsWithChildren<ITypographyCommonProps<PossibleSizesType>>> = ({
    children,
    size,
    ...props
}) => {
    return (
        <Typography {...props} variant="small" size={size}>
            {children}
        </Typography>
    );
};
