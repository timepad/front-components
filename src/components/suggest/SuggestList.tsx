import React from 'react';
import {ISuggestion} from './Suggest';
import {useRef, useEffect} from 'react';
import {Row} from '../row';

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
    const suggestionsListRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (cursor < 0 || cursor > suggestions.length || !suggestionsListRef) {
            return;
        } else if (suggestionsListRef.current) {
            const listItems = Array.from(suggestionsListRef.current.children);
            listItems[cursor] && listItems[cursor].scrollIntoView();
        }
    }, [cursor]);

    return (
        <>
            {visible && (
                <div className="suggest-list" ref={suggestionsListRef} onMouseEnter={onMouseEnter}>
                    {suggestions.map((item, i) => (
                        <Row
                            key={item.title + i}
                            ffFont
                            small
                            onClick={() => onClick(item.title)}
                            className={`suggest-list__item${cursor === i ? ' selected' : ''}`}
                        >
                            <Row.Body>
                                <Row.Text>{item.title}</Row.Text>
                                {item.text && (
                                    <Row.Caption>
                                        {item.text.length > captionTextMaxLength
                                            ? `${item.text.slice(0, captionTextMaxLength)}...`
                                            : item.text}
                                    </Row.Caption>
                                )}
                            </Row.Body>
                        </Row>
                    ))}
                </div>
            )}
        </>
    );
};
