import * as React from 'react';
import cx from 'classnames';
import '../../assets/css/bundle.less';

export interface IBrickProps {
    size?: number;
    desktop?: number;
    mobile?: number;
    className?: string;
}

const defaultBrickSize = 1;

export const Brick: React.FC<React.PropsWithChildren<IBrickProps>> = ({
    size = defaultBrickSize,
    desktop,
    mobile,
    className,
    children,
}) => (
    <>
        {!!desktop && (
            <div className={cx(className, 'hidden-mobile')} style={{height: `${desktop * 16}px`}}>
                {children}
            </div>
        )}
        {!!mobile && (
            <div className={cx(className, 'hidden-desktop')} style={{height: `${mobile * 16}px`}}>
                {children}
            </div>
        )}
        {(!desktop || !mobile) && (
            <div
                className={cx(className, {
                    'hidden-mobile': !!mobile,
                    'hidden-desktop': !!desktop,
                })}
                style={{height: `${size * 16}px`}}
            >
                {children}
            </div>
        )}
    </>
);
