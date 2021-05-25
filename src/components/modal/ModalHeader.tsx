import * as React from 'react';
import {Fragment, ReactNode} from 'react';
import cx from 'classnames';
import {component, layout} from '../../services/helpers/classHelpers';
import {Button} from '../button';
import CloseSvg from '../../assets/svg/24/icon-close-24.svg';
import BackSvg from '../../assets/svg/24/icon-arrow-24.svg';

export interface IHeaderComponentProps {
    title: string;
    titleIsTransparent?: boolean;
    description?: string;
    headerContent?: ReactNode;
    backHandler?: () => void;
    closeHandler?: () => void;
}

export const Header: React.FC<IHeaderComponentProps> = ({
    title,
    backHandler,
    closeHandler,
    titleIsTransparent,
    description,
    headerContent,
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
                <div className={cx(layout('brick')(), layout('brick-1-5')())} />
                <h3 className={cx('t-lead', 't-lead--brick', component('form', 'title-text')())}>{title}</h3>
                {description && (
                    <Fragment>
                        <div className={layout('brick')()} />
                        <p className={cx('t-caption', 't-caption--brick', component('form', 'title-desc')())}>
                            {description}
                        </p>
                    </Fragment>
                )}
                {headerContent}
            </div>
            {closeHandler && (
                <Button
                    variant={Button.variant.transparent}
                    icon={<CloseSvg />}
                    className={component('form', 'icon')({close: true})}
                    onClick={closeHandler}
                />
            )}
        </div>
    );
};
