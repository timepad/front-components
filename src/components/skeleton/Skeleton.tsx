import React, {useEffect, useRef, useState} from 'react';
import './index.less';
import classNames from 'classnames';

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
    withPaddings?: boolean;
};

export const Skeleton: React.FC<SkeletonProps> = ({
    children,
    variant = 'rect',
    width = 'fit-content',
    height = 'auto',
    animation = 'wave',
    withPaddings = false,
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

    const className = classNames('skeleton', `skeleton__${variant}`, {
        [`skeleton__${animation}`]: animation,
    });

    useEffect(() => {
        if (childRef?.current && withPaddings) {
            const getStyles = childRef.current.querySelector('.getStyles');
            const firstChild = getStyles?.firstElementChild;

            if (firstChild && getStyles) {
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

    return withPaddings ? (
        <div ref={childRef}>
            <div style={{visibility: 'hidden', opacity: '0', height: 0}} className={'getStyles'}>
                {children}
            </div>
            {skeletonStyles.map((elem, index) => {
                return (
                    <div style={elem} key={index}>
                        <div className={className} style={{...customStyle}}>
                            <div style={{width: elem.width, height: elem.height}} />
                        </div>
                    </div>
                );
            })}
        </div>
    ) : (
        <div ref={childRef}>
            <div className={className} style={customStyle}>
                {children && (
                    <div
                        className={classNames('skeleton__with-children', {
                            ['no--padding']: withPaddings,
                        })}
                    >
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};
