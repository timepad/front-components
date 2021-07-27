import React, {FC, useState, MouseEvent, ChangeEvent, useCallback} from 'react';
import {Dropdown} from '../../dropdownmodal';
import {List} from '../../list';
import ArrowDownIcon from '../../../assets/svg/16/icon-arrow-down-solid-16.svg';
import ArrowUpIcon from '../../../assets/svg/16/icon-arrow-up-solid-16.svg';
import {ButtonIconAlignment, ButtonVariant} from '../../button';
import {IFormSelectOption, IFormSelectProps} from './FormSelect.types';
import './index.less';

export const FormSelect: FC<IFormSelectProps> = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [label, setLabel] = useState(props.options[0].label || '');

    const getLabelByValue = useCallback(
        (value: string) => {
            return props.options.find((option) => option.value === value)?.label;
        },
        [props.options],
    );

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpen(!isOpen);
    };

    const handleSelect = (option: IFormSelectOption) => (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        setLabel(option.label);
        setOpen(!isOpen);
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();

        const value = e.target.value;
        const label = getLabelByValue(value);

        setLabel(label ? label : props.options[0].label);
    };

    return (
        <div className="cform--select">
            <Dropdown positions="bottom-start" show={isOpen} {...props}>
                <Dropdown.ToggleButton
                    icon={isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    iconAlignment={ButtonIconAlignment.right}
                    onClick={handleOpen}
                    // buttonRef={ref as React.MutableRefObject<HTMLButtonElement>}
                    variant={ButtonVariant.stroke}
                    label={label}
                />
                <Dropdown.Body>
                    <List size="lg" variant="dark">
                        {props.options?.map((option, index) => (
                            <List.Item onClick={handleSelect(option)} key={index}>
                                {option.label}
                            </List.Item>
                        ))}
                    </List>
                </Dropdown.Body>
            </Dropdown>

            <select onChange={handleSelectChange} className="cform--select__mobile">
                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
