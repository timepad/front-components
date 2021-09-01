import * as React from 'react';
import {useEffect, useState} from 'react';
import {Input, IInputProps} from '../forms/Input/Input';
import {Suggestlist} from './SuggestList';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

export interface ISuggestion {
    title: string;
    text?: string;
}

interface ISuggestProps extends IInputProps {
    value: string;
    setValue: React.Dispatch<string>;
    data?: ISuggestion[];
    url?: string;
    className?: string;
}

export const Suggest: React.FC<ISuggestProps> = (props) => {
    const {className, setValue, data, url} = props;
    const [searchData, setSearchData] = useState<ISuggestion[]>([]);
    const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

    const classNames = cx(className, component('suggest')());

    const [visible, setVisible] = useState<boolean>(true);
    const onInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
        if (!visible) {
            setVisible(true);
        }
    };
    const onInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
        if (visible) {
            setTimeout(() => setVisible(false), 200);
        }
    };

    useEffect(() => {
        if (url) {
            fetch(url)
                .then((response) => response.json())
                .then((response) => setSearchData(response));
        } else {
            setSearchData(data || []);
        }
    }, []);

    const getSuggestions = (value: string): ISuggestion[] => {
        const regex = new RegExp(value, 'i');
        return searchData.filter((item) => regex.test(item.title));
    };

    let timeout: ReturnType<typeof setTimeout> | null = null;
    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const query = event.target.value;
        setValue(query);

        const trimmedStr = query.trim();
        if (trimmedStr && query.length > 1) {
            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => {
                setSuggestions(getSuggestions(trimmedStr));
            }, 250);
        } else {
            setSuggestions([]);
        }
    };

    const onSuggestClick = (text: string): void => {
        setValue(text);
        setSuggestions([]);
    };

    return (
        <div className={classNames}>
            <Input {...props} onChange={onInputChange} onFocus={onInputFocus} onBlur={onInputBlur} />
            {visible && suggestions.length > 0 && (
                <Suggestlist suggestions={suggestions} onSuggestClick={onSuggestClick} captionTextMaxLength={10} />
            )}
        </div>
    );
};
