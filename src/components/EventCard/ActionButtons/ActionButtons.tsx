import React from 'react';
import IconSettings from '../../../assets/svg/24/icon-settings-24.svg';
import IconArrowNW from '../../../assets/svg/24/icon-arrow-NW-24.svg';
import IconBookmark from '../../../assets/svg/24/icon-bookmark_s-24.svg';
import IconBookmarkOutline from '../../../assets/svg/24/icon-bookmark-24.svg';
import IconArrow from '../../../assets/svg/24/icon-arrow-24.svg';

import {ActionsDropdown} from '../ActionsDropdown/ActionsDropdown';
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
    const expandButtonClassName = component('action-buttons', 'button')({expand: isOpen, hidden: true});
    const bookmarkButtonClassName = component('action-buttons', 'button')({hidden: !isFavorite});

    return (
        <div className={className}>
            <div className="caction-buttons__hidden-buttons">
                {status === 'draft' && (
                    <Button className="caction-buttons__button" variant={ButtonVariant.secondary}>
                        Опубликовать
                    </Button>
                )}
                {status === 'published' && (
                    <Button className="caction-buttons__button" variant={ButtonVariant.secondary}>
                        Продвигать
                    </Button>
                )}
                {status === 'past' && (
                    <Button className="caction-buttons__button" variant={ButtonVariant.secondary}>
                        Перейти к заказам
                    </Button>
                )}
                <Button className="caction-buttons__button" variant={ButtonVariant.secondary} icon={<IconSettings />} />
                <Button className="caction-buttons__button" variant={ButtonVariant.secondary} icon={<IconArrowNW />} />
                <Divider className="caction-buttons__divider" vertical margin={[0, 8]} />
            </div>
            <div className="caction-buttons__visible-buttons">
                {isFavorite ? (
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconBookmark className="caction-buttons__button--gray" />}
                        className="caction-buttons__button"
                    />
                ) : (
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconBookmarkOutline />}
                        className={bookmarkButtonClassName}
                    />
                )}
                {isSessions && (
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconArrow className="caction-buttons__button--black" />}
                        onClick={onSetOpenClickHandler}
                        className={expandButtonClassName}
                    />
                )}
                <ActionsDropdown status={status} />
            </div>
        </div>
    );
};
