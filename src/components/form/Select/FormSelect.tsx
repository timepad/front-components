import React, {FC, useState, MouseEvent, ChangeEvent, useCallback} from 'react';
import {Dropdown} from '../../dropdownmodal';
import {List} from '../../list';
import ArrowDownIcon from '../../../assets/svg/16/icon-arrow-down-solid-16.svg';
import ArrowUpIcon from '../../../assets/svg/16/icon-arrow-up-solid-16.svg';
import {ButtonIconAlignment, ButtonVariant} from '../../button';
import {IFormSelectOption, IFormSelectProps} from './FormSelect.types';
import './index.less';

// const createUnion = <O,>(o: {[K in keyof O]: ComponentType<O[K]>}) => {
//     const R: FC<{[K in keyof O]: {type: K} & O[K]}[keyof O]> = (props) => createElement(o[props.type], props);
//     R.displayName = `Factory(${Object.keys(o).sort().join(', ')})`;
//     return R;
// };
//
// const A: FC<{a: number}> = ({a}) => <>{a}</>;
// const B: FC<{b: string}> = ({b}) => <>{b}</>;
// const Selects = createUnion({mobile: A, desktop: B});
// const JSX = <Selects type={'desktop'} b={'str'} />;

export const FormSelect: FC<IFormSelectProps> = (props) => {
    const {options, value, ...otherProps} = props;
    const [isOpen, setOpen] = useState(false);
    const [localValue, setLocalValue] = useState<string | ReadonlyArray<string> | number>(value || '');

    const getLabelByValue = useCallback(
        (value: string) => {
            return props.options.find((option) => option.value === value)?.label;
        },
        [props.options],
    );

    const [label, setLabel] = useState(getLabelByValue(value as string) || '');

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpen(!isOpen);
    };

    const handleSelect = (option: IFormSelectOption) => (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        setLabel(option.label);
        setOpen(!isOpen);
        setLocalValue(option.value);

        // onChangeOption && onChangeOption(option.value);
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();

        const value = e.target.value;
        const label = getLabelByValue(value);

        setLocalValue(value);
        setLabel(label ? label : props.options[0].label);

        // if(isMobile) {
        //     const Select = union('mobile');
        //     return <Select ...></Select>
        // } else {
        //     const Select = union('desktop')
        //     return <Select></Select>
        // }
        // onChangeOption && onChangeOption(value);
    };

    return (
        <div className="cform--select">
            <Dropdown onClose={() => setOpen(!isOpen)} positions="bottom-start" show={isOpen} {...props}>
                <Dropdown.ToggleButton
                    icon={isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    iconAlignment={ButtonIconAlignment.right}
                    onClick={handleOpen}
                    variant={ButtonVariant.stroke}
                    label={label}
                />
                <Dropdown.Body>
                    <List size="lg" variant="dark">
                        {options?.map((option, index) => (
                            <List.Item onClick={handleSelect(option)} key={index}>
                                {option.label}
                            </List.Item>
                        ))}
                    </List>
                </Dropdown.Body>
            </Dropdown>

            <select onChange={handleSelectChange} value={localValue} className="cform--select__mobile" {...otherProps}>
                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
