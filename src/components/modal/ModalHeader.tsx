import * as React from 'react';
import {Fragment} from 'react';
import {component, layout} from '../../services/helpers/classHelpers';
import {Button} from '../button';
import CloseSvg from '../../assets/svg/24/icon-close-24.svg';
import BackSvg from '../../assets/svg/24/icon-arrow-24.svg';
import {Typography} from '../typography';
import {Brick} from '../brick';
import {extractDataAttrs, IDataAttr} from '../../services/helpers/extractDataAttrs';

export interface IHeaderComponentProps<T = unknown> {
    titleIsTransparent?: boolean;
    backHandler?: () => void;
    closeHandler?: () => void;
    dataAttrs?: Array<IDataAttr<T>>;
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

export const Header = <T,>({
    backHandler,
    closeHandler,
    titleIsTransparent,
    children,
    dataAttrs = [],
}: React.PropsWithChildren<IHeaderComponentProps<T>>) => {
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
                    icon={<BackSvg />}
                    className={component('form', 'icon')({back: true})}
                    onClick={backHandler}
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
                    icon={<CloseSvg />}
                    className={component('form', 'icon')({close: true})}
                    onClick={handleClose}
                    {...extractDataAttrs<T>('btn-close', dataAttrs)}
                />
            )}
        </div>
    );
};
