import React, {FC, ReactElement, useMemo} from 'react';
import Typography, {ITypographyProps} from '../typography/Typography';
import './index.less';
import {Gap} from '../gap';
import {Button, ButtonVariant} from '../button';
import ArrowBack from '../../assets/svg/24/icon-arrow-tale-24.svg';

export interface IPageHeaderProps {
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
        const styles = isTall ? {padding: '5px 0 16px'} : undefined;
        if (typeof label === 'string') {
            return (
                <Typography noPadding={!isTall} variant="body" fontWeight="bold" style={styles}>
                    {label}
                </Typography>
            );
        } else {
            const Label = label;
            Label.props.style = styles;
            return Label;
        }
    }, [label, isTall]);

    if (!isTall) {
        return (
            <div className="cpageheader">
                {Label}
                <div className="lflex lflex--align-centered">
                    {caption && (
                        <>
                            <Typography noPadding className="cpageheader__caption t-color-gray-50" variant="caption">
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

    return (
        <div>
            <div className="cpageheader">
                {onBackClick && (
                    <Button onClick={onBackClick} variant={ButtonVariant.transparent} icon={<ArrowBack />} />
                )}
                <div className="lflex lflex--align-centered">
                    {React.Children.toArray(children).map((button) => (
                        <>
                            <Gap size={0.5} />
                            {button}
                        </>
                    ))}
                </div>
            </div>
            {caption && (
                <Typography className="t-color-gray-50" variant="caption">
                    {caption}
                </Typography>
            )}
            {Label}
        </div>
    );
};

export default PageHeader;
