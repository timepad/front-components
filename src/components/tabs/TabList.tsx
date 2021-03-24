import * as React from 'react';
import {FC, HTMLAttributes, useContext, useEffect, useRef, useState} from 'react';
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

const activeElSelector = `.${component(
    'tab-bar',
    'li',
)({['is-active']: true})
    .split(' ')
    .join('.')}`;
const ulElSelector = `.${component('tab-bar', 'list')()}`;
const highlighterBoxClasses = component('tab-bar', 'highlightBox')();
const spanClasses = component('tab-bar', 'highlighter')();

export const TabList: FC<HTMLAttributes<HTMLUListElement>> = ({children, className, ...restProps}) => {
    const ulClasses = cx(component('tab-bar', 'list')(), className);
    const boxRef = useRef<HTMLDivElement>(null);
    const {duration, activeId} = useContext(TabsContext);
    const [highlighterStyles, setHighlighterStyles] = useState<IHighlighterStyle>(initialStyles);
    const getHighlighterStyles = (): IHighlighterStyle => {
        let value = {...initialStyles};
        const activeEl = boxRef?.current?.querySelector<HTMLLIElement>(activeElSelector);
        const ulEl = boxRef?.current?.querySelector<HTMLUListElement>(ulElSelector);
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
};
