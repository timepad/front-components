import React from 'react';
import IconSettings from '../../../assets/svg/24/icon-settings-24.svg';
import IconArrowNW from '../../../assets/svg/24/icon-arrow-NW-24.svg';
import IconBookmark from '../../../assets/svg/24/icon-bookmark_s-24.svg';
import IconBookmarkOutline from '../../../assets/svg/24/icon-bookmark-24.svg';
import IconArrow from '../../../assets/svg/24/icon-arrow-24.svg';

import {ActionsDropdown} from '../ActionsDropdown';
import {IEventStatus} from '../types/EventCardModel';
import {component} from '../../../services/helpers/classHelpers';
import {Button, ButtonVariant} from '../../button';
import {Divider} from '../../divider';

interface IActionButtonsProps {
    status: IEventStatus;
    isSessions?: boolean;
    onSetOpenClickHandler?: () => void;
    isOpen: boolean;
    isFavorite: boolean;
    className: string;
}

export const ActionButtons: React.FC<IActionButtonsProps> = ({
    status,
    isFavorite,
    isOpen,
    isSessions,
    onSetOpenClickHandler,
    className,
}) => {
    const btnClassName = component('action-buttons', 'button')();

    return (
        <div className={className}>
            <div className={component('action-buttons', 'hidden-buttons')()}>
                <Button className={btnClassName} variant={ButtonVariant.secondary}>
                    {btnText[status]}
                </Button>
                <Button className={btnClassName} variant={ButtonVariant.secondary} icon={<IconSettings />} />
                <Button className={btnClassName} variant={ButtonVariant.secondary} icon={<IconArrowNW />} />
                <Divider className={component('action-buttons', 'divider')()} vertical margin={[0, 8]} />
            </div>
            <div className={component('action-buttons', 'visible-buttons')()}>
                {isFavorite ? (
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconBookmark className={component('action-buttons', 'button')({gray: true})} />}
                        className={btnClassName}
                    />
                ) : (
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconBookmarkOutline />}
                        className={component('action-buttons', 'button')({hidden: !isFavorite})}
                    />
                )}
                {isSessions && (
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconArrow className={component('action-buttons', 'button')({black: true})} />}
                        onClick={onSetOpenClickHandler}
                        className={component('action-buttons', 'button')({expand: isOpen, hidden: true})}
                    />
                )}
                <ActionsDropdown status={status} />
            </div>
        </div>
    );
};

const btnText: {[key in IEventStatus]: string} = {
    draft: 'Опубликовать',
    published: 'Продвигать',
    past: 'Перейти к заказам',
};
