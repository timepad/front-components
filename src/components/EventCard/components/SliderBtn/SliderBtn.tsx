import React from 'react';
import {Button, ButtonVariant} from '../../../button';
import IconArrow from '../../../../assets/svg/24/icon-arrow-right-24.svg';

import './cslider-btn.less';

interface ISliderBtn {
    className?: string;
}

export const SliderBtn: React.FC<ISliderBtn> = ({className = ''}) => {
    return (
        <Button
            variant={ButtonVariant.secondary}
            labelColor="rgba(100, 63, 255, 1)"
            icon={<IconArrow />}
            className={className}
        />
    );
};
