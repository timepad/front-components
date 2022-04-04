import React, {FC, ReactElement, useMemo} from 'react';
import Typography, {ITypographyProps} from '../typography/Typography';
import './index.less';
import {Gap} from '../gap';

interface IPageHeaderProps {
    // children?: Array<typeof Button>;
    children?: any;
    label: string | ReactElement<ITypographyProps, typeof Typography>;
    caption?: string;
    onBackClick?: () => void;
}

const PageHeader: FC<IPageHeaderProps> = ({children, label, caption, onBackClick}) => {
    const isTall: boolean = useMemo(() => {
        if (onBackClick) {
            return true;
        }

        return false;
    }, [onBackClick]);

    const Label = useMemo(() => {
        if (typeof label === 'string') {
            return (
                <Typography variant="body" fontWeight="bold">
                    {label}
                </Typography>
            );
        } else {
            return label;
        }
    }, [label]);

    if (!isTall) {
        return (
            <div className="cpageheader">
                {Label}
                <div className="lflex lflex--align-centered">
                    {caption && (
                        <>
                            <Typography className="cpageheader__caption t-color-gray-50" variant="caption">
                                {caption}
                            </Typography>
                            {children && <Gap size={0.5} />}
                        </>
                    )}
                    {React.Children.toArray(children).map((button) => (
                        <>
                            <Gap size={0.5} />
                            {button}
                        </>
                    ))}
                </div>
            </div>
        );
    }

    return <div>dasdas</div>;
};

export default PageHeader;
