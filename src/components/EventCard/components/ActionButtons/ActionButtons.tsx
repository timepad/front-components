import React from 'react';
import IconSettings from '../../../../assets/svg/24/icon-settings-24.svg';
import IconArrowNW from '../../../..//assets/svg/24/icon-arrow-NW-24.svg';
import IconBookmark from '../../../..//assets/svg/24/icon-bookmark_s-24.svg';
import IconBookmarkOutline from '../../../../assets/svg/24/icon-bookmark-24.svg';
import IconArrow from '../../../../assets/svg/24/icon-arrow-24.svg';

import {ActionsDropdown} from '../ActionsDropdown/ActionsDropdown';
import {IEventStatus} from '../../types/EventCardModel';
import {component} from '../../../../services/helpers/classHelpers';
import {Button, ButtonVariant} from '../../../button';
import {Divider} from '../../../divider';

interface IActionButtonsProps {
    status: IEventStatus;
    isRepitenEvent?: boolean;
    onSetOpenClickHandler?: () => void;
    isOpen: boolean;
    isFavorite: boolean;
    className: string;
}

export const ActionButtons: React.FC<IActionButtonsProps> = ({
    status,
    isFavorite,
    isOpen,
    isRepitenEvent,
    onSetOpenClickHandler,
    className,
}) => {
    const expandButtonClassName = component('action_buttons', 'button')({expand: isOpen, hidden: true});
    const bookmarkButtonClassName = component('action_buttons', 'button')({hidden: !isFavorite});

    return (
        <div className={className}>
            <div className="caction_buttons__hidden_buttons">
                {status === 'draft' && (
                    <Button className="caction_buttons__button" variant={ButtonVariant.secondary}>
                        Опубликовать
                    </Button>
                )}
                {status === 'published' && (
                    <Button className="caction_buttons__button" variant={ButtonVariant.secondary}>
                        Продвигать
                    </Button>
                )}
                {status === 'past' && (
                    <Button className="caction_buttons__button" variant={ButtonVariant.secondary}>
                        Перейти к заказам
                    </Button>
                )}
                <Button className="caction_buttons__button" variant={ButtonVariant.secondary} icon={<IconSettings />} />
                <Button className="caction_buttons__button" variant={ButtonVariant.secondary} icon={<IconArrowNW />} />
                <Divider className="caction_buttons__divider" vertical margin={[0, 8]} />
            </div>
            <div className="caction_buttons__visible_buttons">
                {isFavorite ? (
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconBookmark className="caction_buttons__button--gray" />}
                        className="caction_buttons__button"
                    />
                ) : (
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconBookmarkOutline />}
                        className={bookmarkButtonClassName}
                    />
                )}
                {isRepitenEvent && (
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconArrow className="caction_buttons__button--black" />}
                        onClick={onSetOpenClickHandler}
                        className={expandButtonClassName}
                    />
                )}
                <ActionsDropdown status={status} />
            </div>
        </div>
    );
};
