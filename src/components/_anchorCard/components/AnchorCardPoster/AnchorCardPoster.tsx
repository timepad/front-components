import React, {FC, PropsWithChildren, ReactElement, SyntheticEvent, useCallback, useMemo, useState} from 'react';
import {component} from '../../../../services/helpers/classHelpers';
import cx from 'classnames';
import './canchorcardposter.less';
import {useRandomPlaceholderIcon} from '../../../../services/hooks';
import {BadgePosition, IBadge, PosterBadge} from './PosterBadge';

export type IAnchorcardPoster = FC<
    PropsWithChildren<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>>
> & {
    Badge: IBadge;
};

// Don't use this compoent as is. Instead, use AnchorCard.Poster
export const AnchorCardPoster: IAnchorcardPoster = ({children, ...props}) => {
    // region No content
    const [isNoContent, setNoContent] = useState(!props.src);
    const PlaceholderIcon = useRandomPlaceholderIcon([]);
    // endregion

    // region Styles
    const cnPoster = useMemo(() => component('anchorcardposter')({empty: isNoContent}), [isNoContent]);
    const cnImg = useMemo(
        () => cx(component('anchorcardposter', 'image')({hidden: isNoContent}), props.className),
        [props.className, isNoContent],
    );
    const cnPlaceholerIcon = useMemo(() => cx(component('anchorcardposter', 'icon')()), []);
    // endregion

    // region Image event handlers
    const imageErrorHandler = useCallback(
        (e: SyntheticEvent<HTMLImageElement, Event>) => {
            setNoContent(true);
            props?.onError && props?.onError(e);
        },
        [props],
    );

    const imageLoadHandler = useCallback(
        (e: SyntheticEvent<HTMLImageElement, Event>) => {
            setNoContent(false);
            props?.onLoad && props?.onLoad(e);
        },
        [props],
    );
    // endregion

    // region Validate children
    const BadgesWithPositions = useMemo(() => {
        const childrenAmount = React.Children.count(children);
        if (childrenAmount > 4) {
            throw new Error('You passed too much child components! You can pass only 4 badges.');
        }
        if (childrenAmount === 0) {
            return undefined;
        }
        // In object locationPresent, "locations" written in order which they will appear, if position is not set.
        let notPresentedLocations = [
            BadgePosition.bottom_right,
            BadgePosition.bottom_left,
            BadgePosition.top_left,
            BadgePosition.top_right,
        ];
        const resChildren: ReactElement[] = [];

        React.Children.forEach(children, (child) => {
            const isElement = typeof child === 'object' && !!child && 'type' in child;
            if (!isElement || child.type !== PosterBadge) {
                throw new Error(
                    `You passed child components with wrong type: ${typeof child}! You need to pass AnchorCard.Poster.Badge`,
                );
            }

            const badgePos = child.props.position;
            if (!badgePos) {
                const newPosition = notPresentedLocations.shift();
                resChildren.push(React.cloneElement(child, {...child.props, position: newPosition}));
            } else {
                notPresentedLocations = notPresentedLocations.filter((el) => el !== badgePos);
                resChildren.push(child);
            }
        });

        return resChildren;
    }, [children]);
    // endregion

    if (isNoContent || BadgesWithPositions) {
        return (
            <div className={cnPoster}>
                {BadgesWithPositions}
                {isNoContent && <PlaceholderIcon className={cnPlaceholerIcon} aria-hidden />}
                <img {...props} className={cnImg} onLoad={imageLoadHandler} onError={imageErrorHandler} />
            </div>
        );
    } else {
        return <img {...props} className={cnPoster} onLoad={imageLoadHandler} onError={imageErrorHandler} />;
    }
};

AnchorCardPoster.Badge = PosterBadge;
