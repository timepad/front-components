import {Button, ButtonVariant, IButtonProps} from '../../../button';
import React, {FC, SyntheticEvent, useCallback, useMemo, useState} from 'react';
import {component} from '../../../../services/helpers/classHelpers';
import BookmarkIcon from '../../../../assets/svg/24/icon-bookmark-24.svg';
import BookmarkStrongIcon from '../../../../assets/svg/24/icon-bookmark_s-24.svg';
import cx from 'classnames';
import './canchorcardposter.less';
import {useRandomPlaceholderIcon} from '../../../../services/hooks';

interface IPosterActionButtonProps extends IButtonProps {
    icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    alternativeIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    useAlternativeIcon?: boolean;

    label?: never;
    wrapText?: never;
    iconAlignment?: never;
}

export interface IAnchorcardPosterProps
    extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    useActionButton?: boolean;
    actionButtonProps?: IPosterActionButtonProps;
}

// Don't use this compoent as is. Instead, use AnchorCard.Poster
export const AnchorCardPoster: FC<IAnchorcardPosterProps> = ({actionButtonProps, useActionButton, ...props}) => {
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
    const cnIcon = useMemo(() => cx(component('anchorcardposter', 'icon')()), []);
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

    const buttonProps = useMemo<IPosterActionButtonProps>(() => {
        const {useAlternativeIcon, icon, alternativeIcon, className, ...otherProps} = actionButtonProps || {};
        const currentIcon = !useAlternativeIcon ? icon || <BookmarkIcon /> : alternativeIcon || <BookmarkStrongIcon />;

        return {
            labelColor: 'white',
            variant: ButtonVariant.secondary,
            ...otherProps,
            icon: currentIcon,
            className: cx(className, component('anchorcardposter', 'action-button')()),
        };
    }, [actionButtonProps]);

    if (isNoContent || useActionButton) {
        return (
            <div className={cnPoster}>
                {isNoContent && <PlaceholderIcon className={cnIcon} aria-hidden />}
                <img {...props} className={cnImg} onLoad={imageLoadHandler} onError={imageErrorHandler} />
                {useActionButton && <Button {...buttonProps} />}
            </div>
        );
    } else {
        return <img {...props} className={cnPoster} onLoad={imageLoadHandler} onError={imageErrorHandler} />;
    }
};
