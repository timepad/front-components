import * as React from 'react';
import {ISuggestion} from './Suggest';

interface ISuggestListProps {
    visible: boolean;
    suggestions: ISuggestion[];
    onSuggestClick: (text: string) => void;
    captionTextMaxLength?: number;
}

export const Suggestlist: React.FC<ISuggestListProps> = ({
    visible,
    suggestions,
    onSuggestClick,
    captionTextMaxLength = 20,
}) => {
    return visible ? (
        <ul className="suggest-list">
            {suggestions.map((item, i) => (
                <li className="suggest-list__item" key={item.title + i} onClick={() => onSuggestClick(item.title)}>
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
