import React, {FC, PropsWithChildren, useMemo} from 'react';
import cx from 'classnames';
import {component} from '../../../../services/helpers/classHelpers';

export enum BadgePosition {
    bottom_left = 'bottom_left',
    bottom_right = 'bottom_right',
    top_left = 'top_left',
    top_right = 'top_right',
}

export type IBadge = FC<IBadgeProps>;

interface IBadgeProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
    position?: BadgePosition;
    margin?: number;
}

export const PosterBadge: IBadge = ({
    position = BadgePosition.bottom_right,
    margin = 16,
    children,
    style,
    className,
    ...props
}) => {
    const cn = useMemo(() => cx(component('anchorcardposter', 'badge')(), className), [className]);
    const styles = useMemo(() => {
        const locations = {...style};
        position?.split('_').forEach((el) => {
            Object.assign(locations, {[el]: margin + 'px'});
        });
        return locations;
    }, [position, margin, style]);

    return (
        <div {...props} style={styles} className={cn}>
            {children}
        </div>
    );
};
