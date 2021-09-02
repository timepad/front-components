import * as React from 'react';
import {ISuggestion} from './Suggest';

interface ISuggestListProps {
    visible: boolean;
    onClick: (text: string) => void;
    onMouseEnter: (index: number) => void;
    onMouseLeave: () => void;
    captionTextMaxLength?: number;
    suggestions: ISuggestion[];
    cursor: number;
}

export const Suggestlist: React.FC<ISuggestListProps> = ({
    visible,
    cursor,
    suggestions,
    onClick,
    onMouseEnter,
    onMouseLeave,
    captionTextMaxLength = 20,
}) => {
    return visible ? (
        <ul className="suggest-list">
            {suggestions.map((item, i) => (
                <li
                    className={`suggest-list__item${cursor === i ? ' selected' : ''}`}
                    key={item.title + i}
                    onClick={() => onClick(item.title)}
                    onMouseEnter={() => onMouseEnter(i)}
                    onMouseLeave={onMouseLeave}
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
