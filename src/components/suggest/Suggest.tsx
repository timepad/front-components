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
    reloadOnFocus?: boolean;
}

export const Suggest: React.FC<ISuggestProps> = (props) => {
    const {className, setValue, data, url, reloadOnFocus} = props;
    const classNames = cx(className, component('suggest')());
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const [searchData, setSearchData] = useState<ISuggestion[]>([]);
    const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
    const [visible, setVisible] = useState<boolean>(true);

    const getSuggestions = (value: string): ISuggestion[] => {
        const regex = new RegExp(value, 'i');
        return searchData.filter((item) => regex.test(item.title));
    };
    const fetchData = (url: string): void => {
        url &&
            fetch(url)
                .then((response) => response.json())
                .then((response) => setSearchData(response))
                .catch(() => setSearchData([]));
    };

    const onInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
        if (!visible) {
            setVisible(true);
        }
        if (reloadOnFocus && url) {
            fetchData(url);
        }
    };
    const onInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
        if (visible) {
            setTimeout(() => setVisible(false), 200);
        }
    };
    const onSuggestClick = (text: string): void => {
        setValue(text);
        setSuggestions([]);
    };

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

    useEffect(() => {
        if (url && !reloadOnFocus) {
            fetchData(url);
        } else {
            setSearchData(data || []);
        }
    }, []);

    return (
        <div className={classNames}>
            <Input {...props} onChange={onInputChange} onFocus={onInputFocus} onBlur={onInputBlur} />
            <Suggestlist
                visible={visible && suggestions.length > 0}
                suggestions={suggestions}
                onSuggestClick={onSuggestClick}
                captionTextMaxLength={10}
            />
        </div>
    );
};
