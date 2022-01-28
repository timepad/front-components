import * as React from 'react';
import {Fragment} from 'react';
import cx from 'classnames';
import {component, layout} from '../../services/helpers/classHelpers';
import {Button} from '../button';
import CloseSvg from '../../assets/svg/24/icon-close-24.svg';
import BackSvg from '../../assets/svg/24/icon-arrow-24.svg';
import {Brick} from '../brick';

export interface IHeaderComponentProps {
    titleIsTransparent?: boolean;
    backHandler?: () => void;
    closeHandler?: () => void;
}

export const Title: React.FC = ({children}) => {
    return <h3 className={cx('t-lead', 't-lead--brick', component('form', 'title-text')())}>{children}</h3>;
};

export const Description: React.FC = ({children}) => {
    return (
        <Fragment>
            <Brick />
            <p className={cx('t-caption', 't-caption--brick', component('form', 'title-desc')())}>{children}</p>
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
                <Brick size={1.5} />
                {children}
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
