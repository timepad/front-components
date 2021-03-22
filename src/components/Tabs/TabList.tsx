import React, {FC, HTMLAttributes, memo, useContext, useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import {TabsContext} from './Tabs';
import {component} from '../../services/helpers/classHelpers';

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
    const {duration, activeId} = useContext(TabsContext);
    const highlighterBoxClasses = component('ctab-bar', 'highlightBox')();
    const spanClasses = component('ctab-bar', 'highlighter')();

    const [highlighterStyles, setHighlighterStyles] = useState<IHighlighterStyle>(initialStyles);
    const getHighlighterStyles = (): IHighlighterStyle => {
        let value = {...initialStyles};
        const activeEl = boxRef?.current?.querySelector<HTMLLIElement>(
            `.${component('ctab-bar', 'li')({['is-active']: true})}`,
        );
        const ulEl = boxRef?.current?.querySelector<HTMLUListElement>(`.${component('ctab-bar', 'list')}`);
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
        <div className={highlighterBoxClasses} style={{transition: `all ${duration}ms`}} ref={boxRef}>
            <ul {...restProps} className={ulClasses}>
                {children}
            </ul>

            <span className={spanClasses} style={highlighterStyles} />
        </div>
    );
});
