import * as React from 'react';
import cx from 'classnames';
import {IPinnedContentProps} from '../../interfaces';

interface ICenterPinnedContentProps extends IPinnedContentProps {}

export const CenterPinnedContent: React.FC<ICenterPinnedContentProps> = ({modifier, header, footer, otherChildren}) => {
    const darkThemeClasses = 'mtheme--darkpic-bg mtheme--darkpic';

    return (
        <div className={cx('сdropdown-body--tablet', darkThemeClasses, modifier)}>
            {header?.props.center && header}
            <div className="сdropdown-body--tablet-content">{otherChildren}</div>
            {footer?.props.center && footer}
        </div>
    );
};
