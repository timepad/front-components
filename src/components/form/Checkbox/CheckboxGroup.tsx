import React, {ChangeEvent, FC, useState} from 'react';
import {Checkbox} from './Checkbox';
import {ThreeStateCheckbox} from './ThreeStateCheckbox';
import {CheckboxState} from './Checkbox.types';

interface ICheckboxGroupProps {
    name: string;
    text: string;
    // value: CheckboxState;
    children: (Component: typeof Checkbox) => JSX.Element;
}

export const CheckboxGroup: FC<ICheckboxGroupProps> = (props) => {
    const {name, text, children} = props;
    const [mainValue, setMainValue] = useState<CheckboxState>('off');
    // const [values, setValues] = useState<boolean[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();

        let updatedChecked = mainValue;

        if (mainValue === 'on') {
            updatedChecked = 'off';
        } else if (mainValue === 'off') {
            updatedChecked = 'on';
        }

        setMainValue(updatedChecked);
    };

    const renderChildren: JSX.Element = children(({checked, ...otherProps}) => {
        return <Checkbox {...otherProps} checked={mainValue === 'on' ? true : checked} name={name} />;
    });

    return (
        <>
            <ThreeStateCheckbox text={text} value="off" onChange={handleChange} />
            {renderChildren}
        </>
    );
};
