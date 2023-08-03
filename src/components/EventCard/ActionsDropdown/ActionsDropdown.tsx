import React from 'react';
import IconSettings from '../../../assets/svg/24/icon-settings-24.svg';
import IconElipses from '../../../assets/svg/24/icon-elipsis-24.svg';
import IconDelete from '../../../assets/svg/24/icon-delete-24.svg';
import IconCopy from '../../../assets/svg/16/icon-copy.svg';
import IconAdmin from '../../../assets/svg/16/icon-admin-16.svg';

import {IEventStatus} from '../types/EventCardModel';
import {Dropdown} from '../../dropdown';
import {Button, ButtonVariant} from '../../button';
import {Row} from '../../row';
import {Divider} from '../../divider';

interface IActionsDropdownProps {
    status: IEventStatus;
}
export const ActionsDropdown: React.FC<IActionsDropdownProps> = ({status}) => {
    return (
        <Dropdown
            trigger={() => (
                <Button
                    variant={ButtonVariant.transparent}
                    icon={<IconElipses className="caction-buttons__button--black" />}
                    className="caction-buttons__dropdown-button"
                />
            )}
        >
            <div className="mtheme--darkpic-bg mtheme--darkpic mtheme--darkpic-bg">
                {status !== 'past' && (
                    <Row hoverable>
                        <Row.Icon>
                            <IconSettings />
                        </Row.Icon>
                        <Row.Body>
                            <Row.Text>Редактировать</Row.Text>
                        </Row.Body>
                    </Row>
                )}
                <Row hoverable>
                    <Row.Icon>
                        <IconCopy />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>Клонировать</Row.Text>
                    </Row.Body>
                </Row>

                <Row hoverable>
                    <Row.Icon>
                        <IconDelete />
                    </Row.Icon>
                    <Row.Body>
                        <Row.Text>Удалить</Row.Text>
                    </Row.Body>
                </Row>

                <Divider />

                {status === 'published' && (
                    <>
                        <Row hoverable>
                            <Row.Body>
                                <Row.Text>Виджет события</Row.Text>
                            </Row.Body>
                        </Row>
                        <Row hoverable>
                            <Row.Body>
                                <Row.Text>Перенести</Row.Text>
                            </Row.Body>
                        </Row>
                        <Row hoverable>
                            <Row.Body>
                                <Row.Text>Отменить</Row.Text>
                            </Row.Body>
                        </Row>
                    </>
                )}

                <Divider />

                <Row hoverable>
                    <Row.Body>
                        <Row.Text>Администрирование</Row.Text>
                    </Row.Body>
                    <Row.Icon>
                        <IconAdmin />
                    </Row.Icon>
                </Row>
            </div>
        </Dropdown>
    );
};
