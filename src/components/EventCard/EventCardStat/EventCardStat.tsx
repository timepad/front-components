import React from 'react';

import IconArrow from '../../../assets/svg/24/icon-arrow-right-24.svg';
import IconDislike from '../../../assets/svg/16/icon-dislike-outline-16.svg';
import IconLike from '../../../assets/svg/16/icon-like-outline_16.svg';
import {Button, ButtonVariant} from '../../button';
import {Typography} from 'components/typography';
import {addThousandsSeparator} from '../helpers';

interface IEventCardStatProps {
    income: number | string;
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
    orderRefundCount = 0,
    orderRefundAmount = 0,
    negativeReviewCount = 0,
    positiveReviewCount = 0,
}) => {
    const stat = [
        {label: 'Доход', value: <Typography.Small noPadding>{income}</Typography.Small>},
        {label: 'Заказы', value: <Typography.Small noPadding>{orderCount}</Typography.Small>},
        {label: 'Билеты', value: <Typography.Small noPadding>{ticketCount}</Typography.Small>},
        orderRefundCount || orderRefundAmount
            ? {
                  label: 'Возвраты',
                  value: (
                      <Typography.Small noPadding className="cevent-card-stat__value--return">
                          {orderRefundCount} на {addThousandsSeparator(orderRefundAmount)} {currency}
                      </Typography.Small>
                  ),
              }
            : {},
        negativeReviewCount || positiveReviewCount
            ? {
                  label: 'Отзывы',
                  value: (
                      <Typography.Small noPadding className="cevent-card-stat__reviews">
                          <IconLike /> {positiveReviewCount} понравилось <IconDislike /> {negativeReviewCount}
                      </Typography.Small>
                  ),
              }
            : {},
    ].filter((el) => Object.keys(el).length);

    return (
        <div className="cevent-card-stat">
            {stat.map(({label, value}, index) => {
                return (
                    <div className="cevent-card-stat__row" key={index}>
                        <div className="cevent-card-stat__data">
                            <Typography.Small noPadding className="t-color-gray-50 cevent-card-stat__label">
                                {label}
                            </Typography.Small>
                            {value}
                        </div>
                        <Button
                            variant={ButtonVariant.transparent}
                            icon={<IconArrow />}
                            className="cevent-card-stat__button"
                            labelColor="rgba(128, 128, 128, 0.35)"
                        />
                    </div>
                );
            })}
        </div>
    );
};
