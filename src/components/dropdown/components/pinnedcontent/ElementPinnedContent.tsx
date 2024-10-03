import * as React from 'react';
import cx from 'classnames';
import {component} from '../../../../services/helpers/classHelpers';
import {IPinnedContentProps} from '../../interfaces';

export const ElementPinnedContent: React.FC<IPinnedContentProps> = ({
    modifier,
    header,
    footer,
    otherChildren,
    isScrollable,
    ref,
}) => {
    return (
        <div
            ref={ref}
            className={cx(component('dropdown-body')(), modifier)}
            style={isScrollable ? {margin: '15px 0'} : {}}
        >
            {header?.props.element && header}
            <div>{otherChildren}</div>
            {footer?.props.element && footer}
        </div>
    );
};
