import * as React from 'react';
import cx from 'classnames';
import {IPinnedContentProps} from '../../interfaces';
import {IPopupActions} from '../../../popup';
import {DefaultFooter} from '../DropdownDefaultFooter';

interface IDownPinnedContentProps extends IPinnedContentProps {
    popupRef: React.RefObject<IPopupActions>;
}

export const DownPinnedContent: React.FC<IDownPinnedContentProps> = ({
    modifier,
    header,
    footer,
    theme,
    otherChildren,
    popupRef,
}) => {
    const darkThemeClasses = theme === 'dark' ? 'mtheme--darkpic-bg mtheme--darkpic' : '';

    return (
        <div className={cx('сdropdown-body--mobile', darkThemeClasses, modifier)}>
            {header?.props.down && header}
            <div className="сdropdown-body--mobile-content">{otherChildren}</div>
            {footer?.props.down ? footer : <DefaultFooter onCancel={() => popupRef?.current?.close()} />}
        </div>
    );
};
