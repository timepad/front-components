import * as React from 'react';
import {useState} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';

import {RadioButton} from './RadioButton';

export interface IRadioConfig {
    title: string;
    value: string;
}

export interface IRadioGroupConfig {
    inputs: IRadioConfig[];
}

interface IRadioResult {
    [key: string]: string;
}

interface IRadioGroupProps {
    config: IRadioGroupConfig;
    name: string;
    label?: string;
    error?: string;
    touched?: boolean;
    defaultSelected?: string;
    onChange?: (result: IRadioResult) => void;
    onBlurHandler?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export function RadioGroup(props: IRadioGroupProps) {
    const {config, name, label, error, touched, defaultSelected = null, onChange, onBlurHandler} = props;

    const [selectedValue, setSelectedValue] = useState<string | null>(defaultSelected);

    const formLabelClasses = component('form', 'label')({error: !!error && touched});

    const labelClasses = cx('t-small', 't-color-gray', formLabelClasses);

    const onChangeHandler = (name: string, value: string) => {
        setSelectedValue(value);
        onChange?.({[name]: value});
    };

    return (
        <div>
            <div className="lbrick" />
            {label && <span className={labelClasses}>{label}</span>}
            {config.inputs.map((input, idx) => (
                <RadioButton
                    key={idx}
                    name={name}
                    label={input.title}
                    value={input.value}
                    checked={selectedValue === input.value}
                    onChangeHandler={(_, value) => onChangeHandler(name, value)}
                    onBlurHandler={onBlurHandler}
                />
            ))}
        </div>
    );
}
