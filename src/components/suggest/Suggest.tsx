import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
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
    setInputValue: (text: string) => void;
    data?: ISuggestion[];
    url?: string;
    className?: string;
    reloadOnFocus?: boolean;
}

export const Suggest: React.FC<ISuggestProps> = (props) => {
    const {className, value, setInputValue, data, url, reloadOnFocus, onChange, onBlur, onFocus, onKeyDown} = props;
    const classNames = cx(className, component('suggest')());
    const timeout: React.MutableRefObject<number | null> = useRef(null);

    const [searchData, setSearchData] = useState<ISuggestion[]>([]);
    const [state, setState] = useState<{
        suggestions: ISuggestion[];
        visible: boolean;
        cursor: number;
    }>({
        suggestions: [],
        visible: false,
        cursor: -1,
    });

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

    const onInputFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
        onFocus?.(event);

        if (!state.visible) {
            setState({...state, visible: true});
        }
        if (reloadOnFocus && url) {
            fetchData(url);
        }
    };
    const onInputBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        onBlur?.(event);

        if (state.visible) {
            setTimeout(() => setState({...state, visible: false, cursor: -1}), 100);
        }
    };

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        onChange?.(event);

        const query = event.target.value;
        if (query !== value) {
            setInputValue(query);
        }
    };

    const onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        onKeyDown?.(event);

        const {visible, suggestions, cursor} = state;

        if (visible && suggestions.length > 1) {
            if (event.key === 'ArrowDown') {
                setState((prevState) => ({
                    ...state,
                    cursor: prevState.cursor === suggestions.length - 1 ? 0 : prevState.cursor + 1,
                }));
            } else if (event.key === 'ArrowUp') {
                setState((prevState) => ({
                    ...state,
                    cursor: prevState.cursor === 0 ? suggestions.length - 1 : prevState.cursor - 1,
                }));
            } else if (event.key === 'Enter' && cursor >= 0) {
                setInputValue(suggestions[cursor].title);
                setState({...state, cursor: -1});
            }
        }
    };

    const onSuggestionClick = (text: string): void => {
        setInputValue(text);
    };

    const onSuggestionHover = (index: number): void => {
        setState({...state, cursor: index});
    };

    const onSuggestionLeave = (): void => {
        setState({...state, cursor: -1});
    };

    useEffect(() => {
        if (url && !reloadOnFocus) {
            fetchData(url);
        } else {
            setSearchData(data || []);
        }
    }, []);

    useEffect(() => {
        if (value && value.length > 1) {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }

            timeout.current = setTimeout(() => {
                const suggestions = getSuggestions(value);
                setState({
                    ...state,
                    suggestions,
                    visible: !(suggestions.length === 1 && suggestions[0].title === value),
                });
            }, 250);
        } else {
            setState({...state, suggestions: [], visible: false});
        }
    }, [value]);

    return (
        <div className={classNames}>
            <Input
                {...props}
                onChange={onInputChange}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                onKeyDown={onInputKeyDown}
            />
            <Suggestlist
                visible={state.visible}
                suggestions={state.suggestions}
                onClick={onSuggestionClick}
                onMouseEnter={onSuggestionHover}
                onMouseLeave={onSuggestionLeave}
                cursor={state.cursor}
                captionTextMaxLength={10}
            />
        </div>
    );
};
