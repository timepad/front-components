import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent} from '../../services/helpers/storyBookHelpers';
import React, {FC, useState} from 'react';
import {AnchorCard} from './';
import './demo.less';
import {CollectionCard, ICollectionCardProps} from './TmpCollectionCard/CollectionCard';
import {Typography} from '../typography';
import {Button, ButtonVariant, IButtonProps} from '../button';
import BookmarkIcon from '../../assets/svg/24/icon-bookmark-24.svg';
import BookmarkStrongIcon from '../../assets/svg/24/icon-bookmark_s-24.svg';

export default {
    title: 'AnchorCard',
    component: AnchorCard,
} as Meta;

const collectionCardsData: ICollectionCardProps[] = [
    {
        posterSrc: 'https://i.ibb.co/hf5YvMN/Cover-image-auto-97-133.png',
        title: 'Коллекция с маленьким исходником постера',
        eventsAmount: 12,
        collectionHref: '#',
    },
    {
        // posterSrc: 'https://i.ibb.co/hf5YvMN/Cover-image-auto-97-133.png',
        posterSrc: 'ooops its not a link =)',
        title: 'Битая ссылка на постер',
        eventsAmount: 12,
        collectionHref: '#',
    },
    {
        posterSrc: 'https://i.ibb.co/k3CyTrb/sample1920-1080.jpg',
        title: 'Коллекция с большим исходником постера',
        eventsAmount: 12,
        collectionHref: '#',
    },
];

export const AnchorCardFixedContainerWidth: IStorybookComponent = () => {
    const [width, setWidth] = useState(352);
    return (
        <div className="width-container">
            <div style={{width: width + 'px'}} key="AnchorCardNoContainer">
                {collectionCardsData.map((el, index) => (
                    <AnchorCard key={index}>
                        <AnchorCard.Poster
                            src={el.posterSrc}
                            alt={`Постер к карточке: ${el.title}`}
                            width={352}
                            height={198}
                        />
                        <AnchorCard.Content>
                            <AnchorCard.Content.TitleLink href={el.collectionHref}>
                                {el.title}
                            </AnchorCard.Content.TitleLink>
                            <Typography.Small noPadding>{el.eventsAmount + ' событий'}</Typography.Small>
                        </AnchorCard.Content>
                    </AnchorCard>
                ))}
            </div>
            <div className="width-container__range">
                <Typography.Body>Change container width</Typography.Body>
                <input
                    type="range"
                    min={100}
                    max={352}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                />
            </div>
        </div>
    );
};

const FavoriteIconButton: FC<IButtonProps> = (props) => {
    const [active, setActive] = useState(false);
    const currentIcon = !active ? <BookmarkIcon /> : <BookmarkStrongIcon />;
    return (
        <Button
            onClick={() => setActive(!active)}
            icon={currentIcon}
            variant={ButtonVariant.secondary}
            labelColor="white"
            className="hoverbtn"
            {...props}
        />
    );
};

export const AnchorCardBadges: IStorybookComponent = () => {
    return (
        <div className="container">
            {collectionCardsData.map((el, index) => (
                <AnchorCard key={index}>
                    <AnchorCard.Poster
                        src={el.posterSrc}
                        alt={`Постер к карточке: ${el.title}`}
                        width={352}
                        height={198}
                        className="hoverbtn"
                    >
                        <AnchorCard.Poster.Badge>
                            <FavoriteIconButton />
                        </AnchorCard.Poster.Badge>
                    </AnchorCard.Poster>
                    <AnchorCard.Content>
                        <AnchorCard.Content.TitleLink href={el.collectionHref}>{el.title}</AnchorCard.Content.TitleLink>
                        <Typography.Small noPadding>{el.eventsAmount + ' событий'}</Typography.Small>
                    </AnchorCard.Content>
                </AnchorCard>
            ))}
        </div>
    );
};

// region Layouts
const NineCardsDemo = () => (
    <>
        {collectionCardsData.map((el, index) => (
            <CollectionCard {...el} key={index} />
        ))}
        {collectionCardsData.map((el, index) => (
            <CollectionCard {...el} key={index} />
        ))}
        {collectionCardsData.map((el, index) => (
            <CollectionCard {...el} key={index} />
        ))}
    </>
);

export const CollectionCardFlexContainer: IStorybookComponent = () => {
    return (
        <div className="container container--nowrap" key="CollectionCardUsage">
            <NineCardsDemo />
        </div>
    );
};

export const CollectionCardFlexWrapContainer: IStorybookComponent = () => {
    return (
        <div className="container" key="CollectionCardUsage">
            <NineCardsDemo />
        </div>
    );
};

export const CollectionCardMobileContainer: IStorybookComponent = () => {
    return (
        <div className="container container--mobile" key="CollectionCardUsage">
            <NineCardsDemo />
        </div>
    );
};
// endregion
