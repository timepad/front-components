import * as React from 'react';
import cx from 'classnames';
import {DefaultFooter} from '../../Dropdown';
import {IPinnedContentProps} from '../../interfaces';

export const DownPinnedContent: React.FC<IPinnedContentProps> = ({
    modifier,
    header,
    footer,
    otherChildren,
    popupRef,
    isMobile,
}) => {
    return (
        <div className={cx('сdropdown-body--mobile', modifier)}>
            {header?.props.down && header}
            <div className="сdropdown-body--mobile-content">{otherChildren}</div>
            {footer?.props.down ? (
                footer
            ) : (
                <DefaultFooter isMobile={isMobile} onCancel={() => popupRef?.current?.close()} />
            )}
        </div>
    );
};
