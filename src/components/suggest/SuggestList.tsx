import * as React from 'react';
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
        // console.log('suggestionsListRef.current', suggestionsListRef.current);
        if (cursor < 0 || cursor > suggestions.length || !suggestionsListRef) {
            return;
        } else if (suggestionsListRef.current) {
            const listItems = Array.from(suggestionsListRef.current.children);
            listItems[cursor] && listItems[cursor].scrollIntoView();
        }
    }, [cursor]);

    return visible ? (
        <div className="suggest-list" ref={suggestionsListRef} onMouseEnter={onMouseEnter}>
            {suggestions.map((item, i) => (
                // <li
                //     className={`suggest-list__item${cursor === i ? ' selected' : ''}`}
                //     key={item.title + i}
                //     onClick={() => onClick(item.title)}
                // >
                //     <p className="t-caption suggest-list__item-title">{item.title}</p>
                //     {item.text && (
                //         <p className="t-small t-color-gray suggest-list__item-text">
                //             {item.text.length > captionTextMaxLength
                //                 ? `${item.text.slice(0, captionTextMaxLength)}...`
                //                 : item.text}
                //         </p>
                //     )}
                // </li>
                <Row
                    key={item.title + i}
                    ffFont
                    style={{boxShadow: 'inset 0px -1px 0px rgba(128, 128, 128, 0.2)'}}
                    onClick={() => onClick(item.title)}
                    horizontalPadding={8}
                    className={`suggest-list__item${cursor === i ? ' selected' : ''}`}
                >
                    <Row.Body>
                        <Row.Text>{item.title}</Row.Text>
                        <Row.Caption>{item.text}</Row.Caption>
                    </Row.Body>
                </Row>
            ))}
        </div>
    ) : null;
};
