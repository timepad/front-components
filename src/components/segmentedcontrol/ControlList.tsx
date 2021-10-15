import React, {FC, HTMLAttributes, useContext, useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import {SegmentedControlContext} from './SegmentedControl';
import {component} from '../../services/helpers/classHelpers';
import {observer} from 'mobx-react';

interface IHighlighterStyle {
    transform: string;
    width: string;
}

const initialStyles = {
    transform: 'translateX(0)',
    width: '0',
};

const activeElSelector = `.${component(
    'segmentedcontrol',
    'li',
)({['is-active']: true})
    .split(' ')
    .join('.')}`;
const ulElSelector = `.${component('segmentedcontrol', 'list')()}`;
const highlighterBoxClasses = component('segmentedcontrol', 'highlightBox')();
const spanClasses = component('segmentedcontrol', 'highlighter')();

export const ControlList: FC<HTMLAttributes<HTMLUListElement>> = observer(({children, className, ...restProps}) => {
    const ulClasses = cx(component('segmentedcontrol', 'list')(), className);
    const boxRef = useRef<HTMLDivElement>(null);
    const {segmentedControlStore} = useContext(SegmentedControlContext);
    const [highlighterStyles, setHighlighterStyles] = useState<IHighlighterStyle>(initialStyles);

    const getHighlighterStyles = (): IHighlighterStyle => {
        let value = {...initialStyles};
        const activeEl = boxRef?.current?.querySelector<HTMLLIElement>(activeElSelector);
        const ulEl = boxRef?.current?.querySelector<HTMLUListElement>(ulElSelector);
        if (activeEl && ulEl) {
            const transform = `translateX(${activeEl.offsetLeft - ulEl.offsetLeft}px)`;
            const width = `${activeEl.offsetWidth - 2}px`;
            value = {width, transform};
        }
        return value;
    };

    useEffect(() => {
        setHighlighterStyles(getHighlighterStyles());
    }, [segmentedControlStore.activeControlId]);

    return (
        <div className={highlighterBoxClasses} ref={boxRef}>
            <ul {...restProps} className={ulClasses}>
                {children}
            </ul>

            <span className={spanClasses} style={highlighterStyles} />
        </div>
    );
});
