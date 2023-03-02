import React, {FC, ReactElement, useCallback, useMemo, useState} from 'react';
import Typography, {ITypographyProps} from '../typography/Typography';
import './index.less';
import {Gap} from '../gap';
import {Button, ButtonVariant} from '../button';
import ArrowBack from '../../assets/svg/24/icon-arrow-tale-24.svg';

export interface IPageHeaderProps {
    children?: any;
    label: string | ReactElement<ITypographyProps, typeof Typography>;
    caption?: string;
    onBackClick?: () => void;
}

const PageHeader: FC<React.PropsWithChildren<IPageHeaderProps>> = ({children, label, caption, onBackClick}) => {
    const [containerRef, contentRef, buttonsRef, isFitContent] = useHeaderContentWidth();

    const isTall: boolean = useMemo(() => {
        if (onBackClick) {
            return true;
        }
        return !isFitContent;
    }, [onBackClick, isFitContent]);

    const Label = useMemo(() => {
        const styles = isTall ? {padding: '5px 0 16px'} : undefined;
        const className = 'cpageheader__label';
        if (typeof label === 'string') {
            return (
                <Typography
                    innerRef={contentRef}
                    className={className}
                    noPadding={!isTall}
                    variant="body"
                    fontWeight="bold"
                    style={styles}
                >
                    {label}
                </Typography>
            );
        } else {
            const labelProps = {
                style: {
                    ...label.props.style,
                    ...styles,
                },
                innerRef: contentRef,
                className: `${label.props.className} ${className}`,
            };
            return React.cloneElement(label, labelProps);
        }
    }, [label, isTall]);

    if (!isTall) {
        return (
            <div className="cpageheader" ref={containerRef}>
                {Label}
                <div className="lflex lflex--align-centered" ref={buttonsRef}>
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
        <div ref={containerRef}>
            <div className="cpageheader cpageheader--withback" ref={buttonsRef}>
                {onBackClick && (
                    <Button
                        className="cpageheader__backbtn"
                        onClick={onBackClick}
                        variant={ButtonVariant.transparent}
                        icon={<ArrowBack />}
                    />
                )}
                {React.Children.toArray(children).map((button) => (
                    <>
                        <Gap size={0.5} />
                        {button}
                    </>
                ))}
            </div>
            {caption && (
                <Typography className="t-color-gray-50" variant="caption" noPadding style={{margin: '-1px 0 3px'}}>
                    {caption}
                </Typography>
            )}
            {Label}
        </div>
    );
};

type refCallback = (node: HTMLDivElement) => void;

const useHeaderContentWidth = (): [refCallback, refCallback, refCallback, boolean] => {
    const [containerWidth, setContainerWidth] = useState(0);
    const [contentWidth, setContentWidths] = useState(0);
    const [buttonsWidth, setButtonsWidth] = useState(0);
    const containerRef = useCallback((node: HTMLDivElement) => {
        if (node !== null) {
            setContainerWidth(node.clientWidth);
        }
    }, []);
    const labelRef = useCallback((node: HTMLDivElement) => {
        if (node !== null) {
            setContentWidths(node.scrollWidth);
        }
    }, []);
    const buttonsRef = useCallback((node: HTMLDivElement) => {
        if (node !== null) {
            setButtonsWidth(node.scrollWidth);
        }
    }, []);
    const isContentFitContainer = buttonsWidth + contentWidth <= containerWidth;
    return [containerRef, labelRef, buttonsRef, isContentFitContainer];
};

export default PageHeader;
