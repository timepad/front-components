import * as React from 'react';
import '../../assets/css/bundle.less';
import cx from 'classnames';

export interface IGapProps {
    size?: number;
    desktop?: number;
    mobile?: number;
    className?: string;
}

const defaultBrickSize = 1;

export const Gap: React.FC<IGapProps> = ({size = defaultBrickSize, desktop, mobile, className, children}) => (
    <>
        {!!desktop && (
            <div className={cx(className, 'hidden-mobile')} style={{width: `${desktop * 16}px`}}>
                {children}
            </div>
        )}
        {!!mobile && (
            <div className={cx(className, 'hidden-desktop')} style={{width: `${mobile * 16}px`}}>
                {children}
            </div>
        )}
        {(!desktop || !mobile) && (
            <div
                className={cx(className, {
                    'hidden-mobile': !!mobile,
                    'hidden-desktop': !!desktop,
                })}
                style={{width: `${size * 16}px`}}
            >
                {children}
            </div>
        )}
    </>
);
