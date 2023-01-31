import React, {FC, PropsWithChildren, useEffect, useMemo, useRef} from 'react';
import {AnchorTitleLink, IAnchorTitle} from './AnchorTitleLink';
import cx from 'classnames';
import {component} from '../../../../services/helpers/classHelpers';
import './canchorcard-content.less';

interface IAchorCardContentProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export type IAnchorCardContent = FC<PropsWithChildren<IAchorCardContentProps>> & {TitleLink: IAnchorTitle};

// Don't use this compoent as is. Instead, use AnchorCard.Content
export const AnchorCardContent: IAnchorCardContent = ({children, ...props}) => {
    const cnContent = useMemo(() => cx(component('anchorcard-content')(), props.className), [props.className]);
    const ref = useRef<HTMLDivElement>(null);
    // region Validate children
    useEffect(() => {
        let isTitlePresent = false;
        React.Children.forEach(children, (child) => {
            const isElement = typeof child === 'object' && !!child && 'type' in child;
            if (isElement) {
                if (child.type === AnchorTitleLink) {
                    isTitlePresent = true;
                }
            }
        });
        if (!isTitlePresent) {
            throw new Error(`You forgot to pass component: AnchorCard.Content.Title as child of AnchorCard.Content!`);
        }
    }, [children]);
    // endregion

    useEffect(() => {
        ref.current?.parentElement?.style.setProperty('--content-height', ref.current?.clientHeight + 'px');
    }, []);

    return (
        <div {...props} className={cnContent} ref={ref}>
            {children}
        </div>
    );
};

AnchorCardContent.TitleLink = AnchorTitleLink;
