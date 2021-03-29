import React, {useEffect, useState, FC} from 'react';
import cx from 'classnames';
import {molecule} from '../../../services/helpers/classHelpers';

import {Checkbox} from './Checkbox';

interface ICheckboxConfig {
    title: string;
    value: string;
}

interface ICheckboxGroupResult {
    [key: string]: string[];
}

interface ICheckboxGroupValues {
    [value: string]: boolean;
}

interface ICheckboxGroupProps {
    config: ICheckboxConfig[];
    name: string;
    label?: string;
    error?: string;
    touched?: boolean;
    onChange?: (result: ICheckboxGroupResult) => void;
}

export const CheckboxGroup: FC<ICheckboxGroupProps> = (props) => {
    const {config, name, label, error, touched, onChange} = props;

    const [values, setValues] = useState<ICheckboxGroupValues>({});

    useEffect(() => {
        onChange?.({
            [name]: Object.keys(values),
        });
    }, [name, onChange, values]);

    const formLabelClasses = molecule('form', 'label')({error: !!error && touched});

    const labelClasses = cx('t-small', 't-color-gray', formLabelClasses);

    const onChangeHandler = (value: string, checked: boolean) => {
        const newValues = {...values};
        if (checked) {
            newValues[value] = true;
        } else {
            delete newValues[value];
        }
        !checked && delete newValues[name];
        setValues(newValues);
    };

    return (
        <div>
            <div className="lbrick" />
            {label && <span className={labelClasses}>{label}</span>}
            {config.map((config, idx) => (
                <Checkbox
                    key={idx}
                    name={idx + ''}
                    label={config.title}
                    value={config.value}
                    error={touched ? error : ''}
                    onChange={(e) => onChangeHandler(e.target.value, e.target.checked)}
                />
            ))}
        </div>
    );
};
