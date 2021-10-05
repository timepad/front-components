import * as React from 'react';
import {useEffect, useRef, useState, HTMLAttributes} from 'react';
import {TextLight} from '../form/TextLight';
import {IFormTextLightProps} from '../form/TextLight/TextLight.types';
import {Suggestlist} from './SuggestList';
import cx from 'classnames';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

export interface ISuggestion {
    title: string;
    text?: string;
}

export interface ISuggestProps {
    value: string;
    setInputValue: (text: string) => void;
    data?: ISuggestion[];
    url?: string;
    reloadOnFocus?: boolean;
}

interface IState {
    suggestions: ISuggestion[];
    visible: boolean;
    cursor: number;
}

export const Suggest: React.FC<ISuggestProps & IFormTextLightProps & HTMLAttributes<HTMLElement>> = (props) => {
    const {className, value, setInputValue, data, url, reloadOnFocus} = props;
    const classNames = cx(className, component('suggest')());
    const timeout: React.MutableRefObject<number | null> = useRef(null);

    const [searchData, setSearchData] = useState<ISuggestion[]>([]);
    const [state, setState] = useState<IState>({
        suggestions: [],
        visible: false,
        cursor: -1,
    });

    const getSuggestions = (value: string): ISuggestion[] => {
        const regex = new RegExp(value, 'i');
        return searchData.filter((item) => item.title !== value && regex.test(item.title));
    };
    const fetchData = (url: string): void => {
        url &&
            fetch(url)
                .then((response) => response.json())
                .then((response) => setSearchData(response))
                .catch(() => setSearchData([]));
    };

    const onInputFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
        !props.multiline && props.onFocus?.(event);

        if (!state.visible) {
            setState({...state, visible: true});
        }
        if (reloadOnFocus && url) {
            fetchData(url);
        }
    };
    const onInputBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        !props.multiline && props.onBlur?.(event);

        if (state.visible) {
            setTimeout(() => setState({...state, visible: false, cursor: -1}), 100);
        }
    };

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        !props.multiline && props.onChange?.(event);

        const query = event.target.value;
        if (query !== value) {
            setInputValue(query);
            setState({...state, visible: true});
        }
    };

    const onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        !props.multiline && props.onKeyDown?.(event);

        const {visible, suggestions, cursor} = state;

        if (visible && value.length > 1) {
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
                setState({...state, cursor: -1, visible: false});
            }
        }
    };

    const onSuggestionClick = (text: string): void => {
        setInputValue(text);
    };

    const onSuggestionsHover = (): void => {
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
                });
            }, 250);
        } else {
            setState({...state, suggestions: [], visible: false});
        }
    }, [value]);

    return (
        <div className={classNames}>
            {!props.multiline && (
                <TextLight
                    {...props}
                    onChange={onInputChange}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    onKeyDown={onInputKeyDown}
                />
            )}

            <Suggestlist
                visible={state.visible}
                suggestions={state.suggestions}
                onClick={onSuggestionClick}
                onMouseEnter={onSuggestionsHover}
                cursor={state.cursor}
                captionTextMaxLength={10}
            />
        </div>
    );
};
