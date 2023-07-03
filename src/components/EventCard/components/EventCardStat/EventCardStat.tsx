import React from 'react';

import IconArrow from '../../../../assets/svg/24/icon-arrow-right-24.svg';
import IconDislike from '../../../../assets/svg/16/icon-dislike-outline-16.svg';
import IconLike from '../../../../assets/svg/16/icon-like-outline_16.svg';
import {Button, ButtonVariant} from '../../../button';
import {Typography} from 'components/typography';
import {addThousandsSeparator} from '../../helpers';

interface IEventCardStatProps {
    income: string;
    orderCount: number | string;
    currency: string;
    ticketCount: string;
    orderRefundCount?: number;
    orderRefundAmount?: number;
    positiveReviewCount?: number;
    negativeReviewCount?: number;
}

export const EventCardStat: React.FC<IEventCardStatProps> = ({
    income,
    orderCount,
    currency,
    ticketCount,
    orderRefundCount,
    orderRefundAmount = 0,
    negativeReviewCount = 0,
    positiveReviewCount = 0,
}) => {
    return (
        <div className="cevent_card_stat">
            <div className="cevent_card_stat__row">
                <div className="cevent_card_stat__data">
                    <Typography.Small noPadding className="t-color-gray-50 cevent_card_stat__label">
                        Доход
                    </Typography.Small>
                    <Typography.Small noPadding>{income}</Typography.Small>
                </div>
                <Button
                    variant={ButtonVariant.transparent}
                    icon={<IconArrow />}
                    className="cevent_card_stat__button"
                    labelColor="rgb(128, 128, 128)"
                />
            </div>
            <div className="cevent_card_stat__row">
                <div className="cevent_card_stat__data">
                    <Typography.Small noPadding className="t-color-gray-50 cevent_card_stat__label">
                        Заказы
                    </Typography.Small>
                    <Typography.Small noPadding>{orderCount}</Typography.Small>
                </div>
                <Button
                    variant={ButtonVariant.transparent}
                    icon={<IconArrow />}
                    className="cevent_card_stat__button"
                    labelColor="rgb(128, 128, 128)"
                />
            </div>
            <div className="cevent_card_stat__row">
                <div className="cevent_card_stat__data">
                    <Typography.Small noPadding className="t-color-gray-50 cevent_card_stat__label">
                        Билеты
                    </Typography.Small>
                    <Typography.Small noPadding>{ticketCount}</Typography.Small>
                </div>
                <Button
                    variant={ButtonVariant.transparent}
                    icon={<IconArrow />}
                    className="cevent_card_stat__button"
                    labelColor="rgb(128, 128, 128)"
                />
            </div>
            {(orderRefundCount || orderRefundAmount) && (
                <div className="cevent_card_stat__row">
                    <div className="cevent_card_stat__data">
                        <Typography.Small noPadding className="t-color-gray-50 cevent_card_stat__label">
                            Возвраты
                        </Typography.Small>
                        <Typography.Small noPadding className="cevent_card_stat__value--return">
                            {orderRefundCount} на {addThousandsSeparator(orderRefundAmount)} {currency}
                        </Typography.Small>
                    </div>
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconArrow />}
                        className="cevent_card_stat__button"
                        labelColor="rgb(128, 128, 128)"
                    />
                </div>
            )}
            {(positiveReviewCount || negativeReviewCount) && (
                <div className="cevent_card_stat__row">
                    <div className="cevent_card_stat__data">
                        <Typography.Small noPadding className="t-color-gray-50 cevent_card_stat__label">
                            Отзывы
                        </Typography.Small>
                        <Typography.Small noPadding className="cevent_card_stat__reviews">
                            <IconLike /> {positiveReviewCount} понравилось <IconDislike /> {negativeReviewCount}
                        </Typography.Small>
                    </div>
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconArrow />}
                        className="cevent_card_stat__button"
                        labelColor="rgb(128, 128, 128)"
                    />
                </div>
            )}
        </div>
    );
};
