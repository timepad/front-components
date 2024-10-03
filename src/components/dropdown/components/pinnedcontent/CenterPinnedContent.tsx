import * as React from 'react';
import cx from 'classnames';
import {IPinnedContentProps} from '../../interfaces';

export const CenterPinnedContent: React.FC<IPinnedContentProps> = ({modifier, header, footer, otherChildren}) => {
    return (
        <div className={cx('сdropdown-body--tablet', modifier)}>
            {header?.props.center && header}
            <div className="сdropdown-body--tablet-content">{otherChildren}</div>
            {footer?.props.center && footer}
        </div>
    );
};
