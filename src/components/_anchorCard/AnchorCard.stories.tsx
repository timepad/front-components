import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent} from '../../services/helpers/storyBookHelpers';
import React, {CSSProperties, FC, useState} from 'react';
import {AnchorCard, BadgePosition} from './';
import './demo.less';
import {CollectionCard, ICollectionCardProps} from './TmpCollectionCard/CollectionCard';
import {Typography} from '../typography';
import {Button, ButtonVariant, IButtonProps} from '../button';
import BookmarkIcon from '../../assets/svg/24/icon-bookmark-24.svg';
import BookmarkStrongIcon from '../../assets/svg/24/icon-bookmark_s-24.svg';
import PlayIcon from '../../assets/svg/32/icon-play-video-32.svg';
import {Brick} from '../brick';
import {TextLight} from '../form/TextLight';

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
    const [url, setUrl] = useState(collectionCardsData[0].posterSrc);
    return (
        <div className="width-container">
            <div style={{width: width + 'px'}} key="AnchorCardNoContainer">
                {collectionCardsData.map((el, index) => (
                    <AnchorCard key={index}>
                        <AnchorCard.Poster
                            src={index === 0 ? url : el.posterSrc}
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
                <Brick size={5} />

                <Typography.Body noPadding>Print img url here</Typography.Body>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setUrl((e.target as never as {url: {value: string}}).url.value);
                    }}
                >
                    <TextLight id="url" name="url" />
                    <Brick />
                    <Button type="submit">Load</Button>
                </form>
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
            {...props}
        />
    );
};

const Text = (props: {text?: string}) => {
    const styles: CSSProperties = {
        cursor: 'pointer',
        lineHeight: '17px',
        fontSize: '13px',
        background: 'rgba(37, 37, 37, 0.8)',
        padding: '0px 4px',
        display: 'inline',
        borderRadius: '2px',
        color: '#fff',
    };
    return <div style={styles}>{props.text}</div>;
};

export const AnchorCardBadges: IStorybookComponent = () => {
    const getBadges = (index: number) => {
        switch (index) {
            case 0:
                return (
                    <AnchorCard.Poster.Badge>
                        <FavoriteIconButton />
                    </AnchorCard.Poster.Badge>
                );
            case 1:
                return [
                    <AnchorCard.Poster.Badge key={1}>
                        <Text text={'Order: 1'} />
                    </AnchorCard.Poster.Badge>,
                    <AnchorCard.Poster.Badge key={2}>
                        <Text text={'Order: 2'} />
                    </AnchorCard.Poster.Badge>,
                    <AnchorCard.Poster.Badge key={3}>
                        <Text text={'Order: 3'} />
                    </AnchorCard.Poster.Badge>,
                    <AnchorCard.Poster.Badge key={4}>
                        <Text text={'Order: 4'} />
                    </AnchorCard.Poster.Badge>,
                ];
            case 2:
                return [
                    <AnchorCard.Poster.Badge key={1}>
                        <FavoriteIconButton />
                    </AnchorCard.Poster.Badge>,
                    <AnchorCard.Poster.Badge key={2}>
                        <PlayIcon />
                    </AnchorCard.Poster.Badge>,
                    <AnchorCard.Poster.Badge key={3} margin={8}>
                        <Text text="00:50" />
                    </AnchorCard.Poster.Badge>,
                ];
        }
    };
    return (
        <div className="container">
            {collectionCardsData.map((el, index) => (
                <AnchorCard key={index}>
                    <AnchorCard.Poster
                        src={el.posterSrc}
                        alt={`Постер к карточке: ${el.title}`}
                        width={352}
                        height={198}
                    >
                        {getBadges(index)}
                    </AnchorCard.Poster>
                    <AnchorCard.Content>
                        <AnchorCard.Content.TitleLink href={el.collectionHref}>{el.title}</AnchorCard.Content.TitleLink>
                        <Typography.Small noPadding>{el.eventsAmount + ' событий'}</Typography.Small>
                    </AnchorCard.Content>
                </AnchorCard>
            ))}
            <AnchorCard>
                <AnchorCard.Poster
                    src={collectionCardsData[2].posterSrc}
                    alt={`Постер к карточке: ${collectionCardsData[2].title}`}
                    width={352}
                    height={198}
                >
                    <AnchorCard.Poster.Badge margin={64}>
                        <Text text="Positon: bottom_right; Margin: 64px" />
                    </AnchorCard.Poster.Badge>
                    <AnchorCard.Poster.Badge position={BadgePosition.top_right}>
                        <Text text="Positon: top_right" />
                    </AnchorCard.Poster.Badge>
                </AnchorCard.Poster>
                <AnchorCard.Content>
                    <AnchorCard.Content.TitleLink href={collectionCardsData[2].collectionHref}>
                        {collectionCardsData[2].title}
                    </AnchorCard.Content.TitleLink>
                    <Typography.Small noPadding>{collectionCardsData[2].eventsAmount + ' событий'}</Typography.Small>
                </AnchorCard.Content>
            </AnchorCard>
        </div>
    );
};

// region Layouts
const NineCardsDemo = () => (
    <>
        {collectionCardsData.map((el, index) => (
            <AnchorCard key={index}>
                <AnchorCard.Poster src={el.posterSrc} alt={`Постер к карточке: ${el.title}`} width={352} height={198}>
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
