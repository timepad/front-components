import * as React from 'react';
// import {MouseEventHandler} from 'react';
import {Input, IInputProps} from '../forms/Input/Input';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';

import './index.less';
import {ChangeEvent, useEffect, useState} from 'react';

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
    const {className, value, setValue, data, url} = props;
    const [searchData, setSearchData] = useState<ISuggestion[]>([]);

    const classNames = cx(className, component('suggest')());

    const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
    const outsideClickHandler = (event: any) => {
        if (!event.target.classList.contains('csuggest')) {
            setSuggestions([]);
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

        document.addEventListener('click', outsideClickHandler);

        return () => {
            document.removeEventListener('click', outsideClickHandler);
        };
    }, []);

    const trimQuery = (str: string) => str.trim();
    const getSuggestions = (value: string) => {
        const escapedValue = trimQuery(value);

        if (!escapedValue) {
            return [];
        }

        const regex = new RegExp(escapedValue, 'i');

        return searchData.filter((item) => regex.test(item.title));
    };

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const query = event.target.value;
        setValue(query);

        if (query.length > 1) {
            setSuggestions(getSuggestions(query));
        }
    };

    const onSuggestClick = (text: string) => {
        setValue(text);
        setSuggestions([]);
    };

    return (
        <div className={classNames}>
            <Input {...props} onChange={onInputChange} />
            {value.length > 1 && (
                <ul className="suggest-list">
                    {suggestions.map((item, i) => (
                        <li
                            className="suggest-list__item"
                            key={item.title + i}
                            onClick={() => onSuggestClick(item.title)}
                        >
                            <p className="t-caption suggest-list__item-title">{item.title}</p>
                            <p className="t-small t-color-gray suggest-list__item-text">{item.text}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
