import React, {FC} from 'react';
import {AnchorCard} from '../AnchorCard';
import {Typography} from '../../typography';

// TODO: Перенести компонент в дерикторию страницы Collections
export interface ICollectionCardProps {
    posterSrc: string;
    title: string;
    eventsAmount: number;
    collectionHref: string;
    analytics?: {
        someAnalytics?: string;
    };
}

export const CollectionCard: FC<ICollectionCardProps> = ({collectionHref, eventsAmount, posterSrc, title}) => {
    return (
        <AnchorCard>
            <AnchorCard.Poster src={posterSrc} alt={`Постер к подборке: ${title}`} width={352} height={198} />
            <AnchorCard.Content>
                <AnchorCard.Content.TitleLink href={collectionHref}>{title}</AnchorCard.Content.TitleLink>
                <Typography.Small noPadding>{eventsAmount + ' событий'}</Typography.Small>
            </AnchorCard.Content>
        </AnchorCard>
    );
};
