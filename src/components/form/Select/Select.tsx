import React, {FC, useState, MouseEvent, ChangeEvent} from 'react';
import {Dropdown} from '../../dropdownmodal';
import ArrowDownIcon from '../../../assets/svg/16/icon-arrow-down-solid-16.svg';
import ArrowUpIcon from '../../../assets/svg/16/icon-arrow-up-solid-16.svg';
import {ButtonIconAlignment, ButtonVariant} from '../../button';
import {ISelectOption, ISelectProps} from './Select.types';
import './index.less';
import {component} from '../../../services/helpers/classHelpers';

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

const findLabelByValue = (options: ISelectOption[], value: string | number | readonly string[]) => {
    return options.find((option) => option.value === value)?.label || '';
};

export const Select: FC<ISelectProps> = (props) => {
    const {options = [], label = '', value = '', ...otherProps} = props;
    const [isOpen, setOpen] = useState(false);
    const [localValue, setLocalValue] = useState<string | ReadonlyArray<string> | number>(value);
    const [localLabel, setLocalLabel] = useState(label || findLabelByValue(options, value));

    // const isMobile = window.innerWidth < 640;

    const mobileClassName = component('select', 'mobile')();

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpen(!isOpen);
    };

    const handleSelect = (option: ISelectOption) => (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        setLocalLabel(option.label);
        setOpen(!isOpen);
        setLocalValue(option.value);

        // onChangeOption && onChangeOption(option.value);
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();

        const value = e.target.value;
        const label = findLabelByValue(options, value);

        setLocalValue(value);
        setLocalLabel(label ? label : props.options[0].label);

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
        <div className="cselect">
            <Dropdown onClose={() => setOpen(!isOpen)} positions="bottom-start" show={isOpen} {...props}>
                <Dropdown.ToggleButton
                    icon={isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    iconAlignment={ButtonIconAlignment.right}
                    onClick={handleOpen}
                    variant={!!localValue ? ButtonVariant.primary : ButtonVariant.stroke}
                    label={localLabel}
                />
                <Dropdown.Body>
                    {options.map((option, index) => (
                        <Dropdown.Option label={option.label} onClick={handleSelect(option)} key={index} />
                    ))}
                </Dropdown.Body>
            </Dropdown>

            <div className={mobileClassName}>
                <select onChange={handleSelectChange} value={localValue} {...otherProps}>
                    {props.options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ArrowDownIcon />
            </div>
        </div>
    );
};
