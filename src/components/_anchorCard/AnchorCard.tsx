import React, {FC, PropsWithChildren, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {component} from '../../services/helpers/classHelpers';
import {AnchorCardPoster, IAnchorcardPoster} from './components/AnchorCardPoster/AnchorCardPoster';
import {AnchorCardContent, IAnchorCardContent} from './components/AnchorCardContent/AnchorCardContent';
import './index.less';
import cx from 'classnames';

export const AnchorCard: FC<
    PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>
> & {
    Poster: IAnchorcardPoster;
    Content: IAnchorCardContent;
} = ({children, ...props}) => {
    const ref = useRef<HTMLDivElement>(null);
    // region Styles
    const cnContainer = useMemo(() => cx(component('anchorcard')(), props.className), [props.className]);
    // endregion

    // region Validate children
    const [contentInOrder, imgSize] = useMemo(() => {
        const childrenAmount = React.Children.count(children);
        if (childrenAmount > 2) {
            throw new Error(
                'You passed too much child components! You need to pass AnchorCard.Poster and AnchorCard.Content',
            );
        }
        if (childrenAmount === 0) {
            throw new Error(
                'You passed too little child components! You need to pass AnchorCard.Poster and AnchorCard.Content',
            );
        }

        const contentInOrder = new Array(2);
        const imgSize = {
            width: 640,
            height: 360,
        };

        const passedChildTypes = {
            Poster: false,
            Content: false,
        };

        React.Children.forEach(children, (child) => {
            const isElement = typeof child === 'object' && !!child && 'type' in child;
            if (!isElement) {
                throw new Error(
                    `You passed child components with wrong type: ${typeof child}! You need to pass AnchorCard.Poster and AnchorCard.Content`,
                );
            }
            if (child.type === AnchorCardPoster) {
                contentInOrder[0] = child;
                passedChildTypes.Poster = true;

                imgSize.height = child.props.height;
                imgSize.width = child.props.width;
            } else if (child.type === AnchorCardContent) {
                contentInOrder[1] = child;
                passedChildTypes.Content = true;
            } else {
                throw new Error(
                    `You passed wrong child component: ${typeof child}! You need to pass AnchorCard.Poster and AnchorCard.Content`,
                );
            }
        });

        const missingChild = Object.entries(passedChildTypes).filter(([, value]) => !value);
        if (childrenAmount === 1 || missingChild.length > 0) {
            throw new Error(`You forgot to pass component: AnchorCard.${missingChild[0][0]} as child!`);
        }

        return [contentInOrder, imgSize];
    }, [children]);
    // endregion

    useLayoutEffect(() => {
        ref.current?.style.setProperty('--max-img-height', imgSize.height + 'px');
        ref.current?.style.setProperty('--max-img-width', imgSize.width + 'px');
    }, [imgSize]);

    return (
        <article {...props} className={cnContainer} ref={ref}>
            {contentInOrder}
        </article>
    );
};

AnchorCard.Poster = AnchorCardPoster;
AnchorCard.Content = AnchorCardContent;
