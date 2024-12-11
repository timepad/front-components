import React, {useEffect, useRef, useState} from 'react';

import './index.less';

import {component} from '../../services/helpers/classHelpers';

type SkeletonVariant = 'rect' | 'circle';

type SkeletonAnimation = 'wave' | 'pulse';

type SkeletonStyles = {
    paddingTop?: string;
    paddingBottom?: string;
    width?: string;
    height?: string;
};

type SkeletonProps = {
    variant?: SkeletonVariant;
    width?: string | number;
    height?: string | number;
    animation?: SkeletonAnimation;
    style?: React.CSSProperties;
    children?: React.ReactNode;
};

export const Skeleton: React.FC<SkeletonProps> = ({
    children,
    variant = 'rect',
    width = 'fit-content',
    height = 'auto',
    animation = 'wave',
    style,
}) => {
    const childRef = useRef<HTMLDivElement>(null);
    const [skeletonStyles, setSkeletonStyles] = useState<SkeletonStyles[]>([]);
    const customStyle: React.CSSProperties = {
        width,
        height,
        borderRadius: variant === 'circle' ? '50%' : '4px',
        ...style,
    };

    const className = component('skeleton')({[`${animation}`]: !!animation, [`${variant}`]: !!variant});

    useEffect(() => {
        if (childRef?.current) {
            const getStyles = childRef.current.querySelector('.getStyles');
            const firstChild = getStyles?.firstElementChild;

            if (firstChild && getStyles) {
                // TODO подумать как избавить от смешения сущностей
                if (firstChild?.classList?.value.includes('multiple')) {
                    let res: SkeletonStyles[] = [];
                    for (let i = 0; i < firstChild.children.length; i++) {
                        const {paddingTop, paddingBottom, width, height}: CSSStyleDeclaration = window.getComputedStyle(
                            firstChild.children[i],
                            null,
                        );
                        res = [...res, {paddingTop, paddingBottom, width, height}];
                    }
                    return setSkeletonStyles(res);
                }

                const {paddingTop, paddingBottom, width, height} = window.getComputedStyle(firstChild, null);
                getStyles.remove();
                return setSkeletonStyles([{paddingTop, paddingBottom, width, height}]);
            }
        }
    }, []);

    return (
        <div ref={childRef}>
            {children ? (
                <>
                    <div style={{visibility: 'hidden', opacity: '0', height: 0}} className={'getStyles'}>
                        {children}
                    </div>
                    {skeletonStyles.map((elem, index) => {
                        return (
                            <div style={elem} key={index}>
                                <div className={className} style={customStyle}>
                                    <div style={{width: elem.width, height: elem.height}} />
                                </div>
                            </div>
                        );
                    })}
                </>
            ) : (
                <div style={customStyle} className={className} />
            )}
        </div>
    );
};
