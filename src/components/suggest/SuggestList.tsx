import * as React from 'react';
import {ISuggestion} from './Suggest';
import {useRef, useEffect} from 'react';

interface ISuggestListProps {
    visible: boolean;
    onClick: (text: string) => void;
    onMouseEnter: () => void;
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
    captionTextMaxLength = 20,
}) => {
    const suggestionsListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        // console.log('suggestionsListRef.current', suggestionsListRef.current);
        if (cursor < 0 || cursor > suggestions.length || !suggestionsListRef) {
            return;
        } else if (suggestionsListRef.current) {
            const listItems = Array.from(suggestionsListRef.current.children);
            listItems[cursor] && listItems[cursor].scrollIntoView();
        }
    }, [cursor]);

    return visible ? (
        <ul className="suggest-list" ref={suggestionsListRef} onMouseEnter={onMouseEnter}>
            {suggestions.map((item, i) => (
                <li
                    className={`suggest-list__item${cursor === i ? ' selected' : ''}`}
                    key={item.title + i}
                    onClick={() => onClick(item.title)}
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
