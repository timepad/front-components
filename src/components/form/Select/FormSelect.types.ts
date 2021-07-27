export interface IFormSelectOption {
    value: string | ReadonlyArray<string> | number;
    label: string;
}

export interface IFormSelectProps {
    options: IFormSelectOption[];
}
