import * as React from 'react';
import cx from 'classnames';
import {component} from '../../../../services/helpers/classHelpers';
import {IPinnedContentProps} from '../../interfaces';

interface IElementPinnedContentProps extends IPinnedContentProps {
    isScrollable: boolean;
    elementRef: React.RefCallback<HTMLElement>;
}

export const ElementPinnedContent: React.FC<IElementPinnedContentProps> = ({
    modifier,
    header,
    footer,
    theme,
    otherChildren,
    isScrollable,
    elementRef,
}) => {
    const darkThemeClasses = theme === 'dark' ? 'mtheme--darkpic-bg mtheme--darkpic' : '';

    return (
        <div
            ref={elementRef}
            className={cx(component('dropdown-body')(), darkThemeClasses, modifier)}
            style={isScrollable ? {margin: '15px 0'} : {}}
        >
            {header?.props.element && header}
            <div>{otherChildren}</div>
            {footer?.props.element && footer}
        </div>
    );
};
