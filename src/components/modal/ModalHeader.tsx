import * as React from 'react';
import {Fragment} from 'react';
import {component, layout} from '../../services/helpers/classHelpers';
import {Button} from '../button';
import {IconArrowDown24, IconClose24} from '../../icons';
import {Typography} from '../typography';
import {Brick} from '../brick';
import {extractDataAttrs, IDataAttr} from '../../services/helpers/extractDataAttrs';

enum AttrKeys {
    'btn-close',
    'btn-back',
}

type AttrKeysType = keyof typeof AttrKeys;

export interface IHeaderComponentProps {
    titleIsTransparent?: boolean;
    backHandler?: () => void;
    closeHandler?: () => void;
    attrs?: Array<IDataAttr<AttrKeysType>>;
}

export const Title: React.FC<React.PropsWithChildren<unknown>> = ({children}) => {
    return (
        <Typography.Lead noPadding responsive className={component('form', 'title-text')()}>
            {children}
        </Typography.Lead>
    );
};

export const Description: React.FC<React.PropsWithChildren<unknown>> = ({children}) => {
    return (
        <Fragment>
            <Brick />
            <Typography.Caption noPadding className={component('form', 'title-desc')()}>
                {children}
            </Typography.Caption>
        </Fragment>
    );
};

export const Header: React.FC<React.PropsWithChildren<IHeaderComponentProps>> = ({
    backHandler,
    closeHandler,
    titleIsTransparent,
    children,
    attrs,
}) => {
    const titleClass = component(
        'form',
        'title',
    )({
        'back-btn': !!backHandler && !closeHandler,
        'dual-btns': !!backHandler && !!closeHandler,
        'without-btns': !backHandler && !closeHandler,
        'bg-transparent': titleIsTransparent,
    });

    const handleClose = () => {
        if (closeHandler) {
            closeHandler();
            document.body.classList.contains('modal-open') && document.body.classList.remove('modal-open');
        }
    };
    return (
        <div className={titleClass}>
            {backHandler && (
                <Button
                    variant={Button.variant.transparent}
                    icon={<IconArrowDown24 />}
                    className={component('form', 'icon')({back: true})}
                    onClick={backHandler}
                    {...extractDataAttrs<AttrKeysType>('btn-back', attrs)}
                />
            )}
            <div className={layout('flex')({'y-axis': true})}>
                <Brick size={1.2} />
                {children}
                <Brick size={1.2} />
            </div>
            {closeHandler && (
                <Button
                    variant={Button.variant.transparent}
                    icon={<IconClose24 />}
                    className={component('form', 'icon')({close: true})}
                    onClick={handleClose}
                    {...extractDataAttrs<AttrKeysType>('btn-close', attrs)}
                />
            )}
        </div>
    );
};
