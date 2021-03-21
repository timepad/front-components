import React, {FC, HTMLAttributes, memo, useContext, useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import {TId} from './Tab';
import {DurationContext} from './Tabs';

interface ITabList extends Omit<HTMLAttributes<HTMLUListElement>, 'id'> {
    activeId: TId;
}
interface IHighlighterStyle {
    transform: string;
    width: string;
}

const initialStyles = {
    transform: 'translateX(0)',
    width: '0',
};

export const TabList: FC<ITabList> = memo(({children, className, activeId, ...restProps}) => {
    const ulClasses = cx('ctab-bar__list', className);
    const ulRef = useRef<HTMLUListElement>(null);
    const highlighterRef = useRef<HTMLSpanElement>(null);
    const [highlighterStyles, setHighlighterStyles] = useState<IHighlighterStyle>(initialStyles);
    const duration = useContext(DurationContext);
    const getHighlighterStyles = (): IHighlighterStyle => {
        let value = {...initialStyles};
        const activeEl = ulRef?.current?.querySelector<HTMLLIElement>('.ctab-bar__li--is-active');
        if (activeEl) {
            const transform = `translateX(${activeEl.offsetLeft - (ulRef?.current?.offsetLeft || 0)}px)`;
            const width = `${activeEl.offsetWidth}px`;
            value = {width, transform};
        }
        return value;
    };

    useEffect(() => {
        setHighlighterStyles(getHighlighterStyles());
    }, [activeId, ulRef, highlighterRef]);

    return (
        <div className="ctab-bar__highlightBox" style={{transition: `all ${duration}ms`}}>
            <ul {...restProps} className={ulClasses} ref={ulRef}>
                {children}
            </ul>

            <span className="ctab-bar__highlighter" ref={highlighterRef} style={highlighterStyles} />
        </div>
    );
});
