import * as React from 'react';
import {MouseEventHandler, useState} from 'react';
import {component} from '../../services/helpers/ClassHelper';

export interface ISliderButtonProps {
    value: boolean;
    disabled?: boolean;
    onChange: MouseEventHandler;
}

export const SliderButton: React.FC<ISliderButtonProps> = ({value, disabled, onChange}: ISliderButtonProps) => {
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
        >
            <b /> {/* сделано элементом а не псевдо-элементом только чтобы можно было таскать драгом*/}
        </div>
    );
};
