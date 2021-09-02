import * as React from 'react';
import {ISuggestion} from './Suggest';

interface ISuggestListProps {
    setValue: (text: string) => void;
    captionTextMaxLength?: number;
    state: {
        suggestions: ISuggestion[];
        visible: boolean;
        cursor: number;
    };
    setState: (state: {suggestions: ISuggestion[]; visible: boolean; cursor: number}) => void;
}

export const Suggestlist: React.FC<ISuggestListProps> = ({state, setState, setValue, captionTextMaxLength = 20}) => {
    const {suggestions, cursor} = state;
    const visible = state.visible && suggestions.length > 0;

    const suggestionClickHandler = async (text: string): Promise<void> => {
        await setValue(text);
        setState({...state, suggestions: [], visible: false});
    };

    return visible ? (
        <ul className="suggest-list">
            {suggestions.map((item, i) => (
                <li
                    className={`suggest-list__item${cursor === i ? ' selected' : ''}`}
                    key={item.title + i}
                    onClick={() => suggestionClickHandler(item.title)}
                    onMouseEnter={() => setState({...state, cursor: i})}
                >
                    <p className="t-caption suggest-list__item-title">{item.title}</p>
                    {item.text && (
                        <p className="t-small t-color-gray suggest-list__item-text">
                            {item.text.length > captionTextMaxLength
                                ? `${item.text.slice(0, captionTextMaxLength)}...`
                                : item.text}
                        </p>
                    )}
                </li>
            ))}
        </ul>
    ) : null;
};
