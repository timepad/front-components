import React, {useEffect, useRef, useState} from 'react';
import './index.less';
import classNames from 'classnames';

type SkeletonProps = {
    variant?: 'rect' | 'circle' | 'text';
    width?: string | number;
    height?: string | number;
    animation?: 'pulse' | 'wave' | false;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    isVisible?: boolean;
    withPaddings?: boolean;
};

export const Skeleton: React.FC<SkeletonProps> = ({
    children,
    variant = 'rect',
    width = 'fit-content',
    height = 'auto',
    animation = 'wave',
    isVisible = false,
    withPaddings = false,
    style,
}) => {
    const childRef = useRef<HTMLDivElement>(null);
    const [wrapperClassName, setWrapperClassName] = useState('');
    const customStyle: React.CSSProperties = {
        width: width,
        height: height,
        borderRadius: variant === 'circle' ? '50%' : '4px',
        ...style,
    };

    const className = classNames('skeleton', `skeleton--${variant}`, {
        [`skeleton--${animation}`]: animation,
        ['skeleton--with-children']: !!children,
        ['skeleton--hidden']: isVisible, // Прячем скелетон
    });

    useEffect(() => {
        if (childRef?.current && withPaddings) {
            const firstChild = childRef.current.querySelector('.skeletonChildren')?.firstElementChild;

            if (firstChild) {
                if (firstChild?.classList?.value.includes('multiple')) {
                    let res = '';
                    for (let i = 0; i < firstChild.children.length; i++) {
                        res += firstChild.children[0].classList?.value + ' ';
                    }
                    return setWrapperClassName(res);
                }
                setWrapperClassName(firstChild?.classList?.value);
            }
        }
    }, []);

    return (
        <div ref={childRef} className={classNames({[wrapperClassName]: !isVisible && withPaddings})}>
            <div className={className} style={customStyle}>
                {children && (
                    <div
                        className={classNames('skeletonChildren', {
                            ['visible']: isVisible,
                            ['noPadding']: !isVisible && withPaddings,
                        })}
                    >
                        {children}
                    </div>
                )}
                {!isVisible && children && <div className={'skeletonOverlay'}></div>}
            </div>
        </div>
    );
};
