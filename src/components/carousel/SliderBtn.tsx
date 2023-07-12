import React from 'react';
import {Button, ButtonVariant} from '../button';
import IconArrow from '../../assets/svg/24/icon-arrow-right-24.svg';

import './ccarousel.less';
import {component} from '../../services/helpers/classHelpers';

interface ISliderBtn {
    direction: 'prev' | 'next';
}

export const SliderBtn: React.FC<ISliderBtn> = ({direction}) => {
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
