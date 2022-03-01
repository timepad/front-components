import * as React from 'react';
import {Fragment} from 'react';
import {component, layout} from '../../services/helpers/classHelpers';
import {Button} from '../button';
import CloseSvg from '../../assets/svg/24/icon-close-24.svg';
import BackSvg from '../../assets/svg/24/icon-arrow-24.svg';
import {Typography} from '../typography';
import {Brick} from '../brick';

export interface IHeaderComponentProps {
    titleIsTransparent?: boolean;
    backHandler?: () => void;
    closeHandler?: () => void;
}

export const Title: React.FC = ({children}) => {
    return (
        <Typography.Lead noPadding responsive className={component('form', 'title-text')()}>
            {children}
        </Typography.Lead>
    );
};

export const Description: React.FC = ({children}) => {
    return (
        <Fragment>
            <Brick />
            <Typography.Caption noPadding className={component('form', 'title-desc')()}>
                {children}
            </Typography.Caption>
        </Fragment>
    );
};

export const Header: React.FC<IHeaderComponentProps> = ({backHandler, closeHandler, titleIsTransparent, children}) => {
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
                />
            )}
        </div>
    );
};
