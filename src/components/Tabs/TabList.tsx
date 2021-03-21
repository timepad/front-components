import React, {FC, HTMLAttributes, memo, useContext, useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import {TabsContext} from './Tabs';

interface IHighlighterStyle {
    transform: string;
    width: string;
}

const initialStyles = {
    transform: 'translateX(0)',
    width: '0',
};

export const TabList: FC<HTMLAttributes<HTMLUListElement>> = memo(({children, className, ...restProps}) => {
    const ulClasses = cx('ctab-bar__list', className);
    const boxRef = useRef<HTMLDivElement>(null);
    const [highlighterStyles, setHighlighterStyles] = useState<IHighlighterStyle>(initialStyles);
    const {duration, activeId} = useContext(TabsContext);
    const getHighlighterStyles = (): IHighlighterStyle => {
        let value = {...initialStyles};
        const activeEl = boxRef?.current?.querySelector<HTMLLIElement>('.ctab-bar__li--is-active');
        const ulEl = boxRef?.current?.querySelector<HTMLUListElement>('.ctab-bar__list');
        if (activeEl && ulEl) {
            const transform = `translateX(${activeEl.offsetLeft - ulEl.offsetLeft}px)`;
            const width = `${activeEl.offsetWidth}px`;
            value = {width, transform};
        }
        return value;
    };

    useEffect(() => {
        setHighlighterStyles(getHighlighterStyles());
    }, [activeId]);

    return (
        <div className="ctab-bar__highlightBox" style={{transition: `all ${duration}ms`}} ref={boxRef}>
            <ul {...restProps} className={ulClasses}>
                {children}
            </ul>

            <span className="ctab-bar__highlighter" style={highlighterStyles} />
        </div>
    );
});
