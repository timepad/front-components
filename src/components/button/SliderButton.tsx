import * as React from 'react';
import {MouseEventHandler, useState} from 'react';
import {component} from '../../services/helpers/classHelpers';

export interface ISliderButtonProps {
    value: boolean;
    disabled?: boolean;
    onChange: MouseEventHandler;
}

export const SliderButton: React.FC<React.PropsWithChildren<ISliderButtonProps>> = ({
    value,
    disabled,
    onChange,
    ...props
}: ISliderButtonProps) => {
    const [state, update] = useState(value);

    const sliderClasses = component('btn-slider')({on: state, disabled: disabled});

    return (
        <div
            {...props}
            className={sliderClasses}
            onClick={(e) => {
                if (!disabled) {
                    onChange(e);
                    update(!state);
                }
            }}
        >
            <b /> {/* сделано элементом а не псевдо-элементом только чтобы можно было таскать драгом*/}
        </div>
    );
};
