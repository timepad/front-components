import React, {FC, PropsWithChildren, useMemo} from 'react';
import {ITypographyCommonProps} from '../../../typography/Typography';
import cx from 'classnames';
import {component} from '../../../../services/helpers/classHelpers';
import {Typography} from '../../../typography';
import './canchorcard-content.less';

type PossibleSizesType = 24 | 16;

export type IAnchorTitle = FC<PropsWithChildren<IAnchorCardTitle>>;

interface IAnchorCardTitle
    extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    typographyProps?: ITypographyCommonProps<PossibleSizesType>;
}

// TODO: Заменить <a> на <RichLink> после переноса в ntp. Не забыть про типы.
// Don't use this compoent as is. Instead, use AnchorCard.Content.TitleLink
export const AnchorTitleLink: IAnchorTitle = ({children, typographyProps, ...props}) => {
    // region Styles
    const cnTypography = useMemo(
        () => cx(component('anchorcard-content', 'title')(), typographyProps?.className),
        [typographyProps?.className],
    );
    const cnAnchor = cx(component('anchorcard-content', 'anchor')(), props.className);
    // endregion

    return (
        <Typography.Body as={'h4'} {...typographyProps} className={cnTypography}>
            <a {...props} className={cnAnchor}>
                {children}
            </a>
        </Typography.Body>
    );
};
