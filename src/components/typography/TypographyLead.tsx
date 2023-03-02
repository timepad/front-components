import React, {FC} from 'react';
import Typography, {ITypographyCommonProps} from './Typography';

type PossibleSizesType = 24;

export const TypographyLead: FC<React.PropsWithChildren<ITypographyCommonProps<PossibleSizesType>>> = ({
    children,
    size,
    ...props
}) => {
    return (
        <Typography {...props} variant="lead" size={size}>
            {children}
        </Typography>
    );
};
