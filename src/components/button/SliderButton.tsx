import * as React from 'react';
import {MouseEventHandler, useState} from 'react';
import {component} from '../../services/helpers/classHelpers';

export interface ISliderButtonProps {
    value: boolean;
    disabled?: boolean;
    onChange: MouseEventHandler;
    dataAttrs?: Record<string, any>;
}

export const SliderButton: React.FC<React.PropsWithChildren<ISliderButtonProps>> = ({
    value,
    disabled,
    onChange,
    dataAttrs,
}: ISliderButtonProps) => {
    const [state, update] = useState(value);

    const sliderClasses = component('btn-slider')({on: state, disabled: disabled});

    return (
        <div
            className={sliderClasses}
            onClick={(e) => {
                if (!disabled) {
                    onChange(e);
                    update(!state);
                }
            }}
            {...dataAttrs}
        >
            <b /> {/* сделано элементом а не псевдо-элементом только чтобы можно было таскать драгом*/}
        </div>
    );
};
