import React from 'react';
import {Button, ButtonVariant} from '../button';
import IconArrow from '../../assets/svg/24/icon-arrow-down-24.svg';

import {component} from '../../services/helpers/classHelpers';

export interface ISliderBtnProps {
    direction?: 'prev' | 'next';
}

export const SliderBtn: React.FC<ISliderBtnProps> = ({direction}) => {
    const buttonClassName = component(
        'carousel',
        'slider_btn',
    )({prev: direction === 'prev', next: direction === 'next'});
    return (
        <Button
            variant={ButtonVariant.secondary}
            labelColor="rgba(100, 63, 255, 1)"
            icon={<IconArrow />}
            className={buttonClassName}
        />
    );
};
