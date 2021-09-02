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
    setValue: (text: string) => void;
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

    const onInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
        if (!state.visible) {
            setState({...state, visible: true});
        }
        if (reloadOnFocus && url) {
            fetchData(url);
        }
    };
    const onInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
        if (state.visible) {
            setTimeout(() => setState({...state, visible: false, cursor: -1}), 100);
            // setTimeout(() => console.log(state), 500);
        }
    };

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        // console.log('change: ', event.type);
        if (event.type === 'blur' || event.type === 'keypress') {
            return;
        }

        const query = event.target.value;
        setValue(query);

        const trimmedStr = query.trim();
        if (trimmedStr && trimmedStr.length > 1) {
            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => {
                const suggestions = getSuggestions(trimmedStr);
                setState({...state, suggestions, visible: true});
            }, 250);
        } else {
            setState({...state, visible: false});
        }
    };

    const onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = async (event) => {
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
                await setValue(suggestions[cursor].title);
                setState({...state, suggestions: [], cursor: -1});
            }
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
            <Input
                {...props}
                onChange={onInputChange}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                onKeyDown={onInputKeyDown}
            />
            <Suggestlist setValue={setValue} captionTextMaxLength={10} state={state} setState={setState} />
        </div>
    );
};
