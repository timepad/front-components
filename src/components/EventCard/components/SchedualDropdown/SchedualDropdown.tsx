import React from 'react';
import IconArrow from '../../../../assets/svg/16/icon-arrow-down-solid-16.svg';
import {ISchedule} from '../../types/EventCardModel';
import {Dropdown} from '../../../dropdown';
import {Button, ButtonIconAlignment, ButtonVariant} from '../../../button';
import {Row} from '../../../row';

interface ISchedualDropdownProps {
    onSetScheduleClickHandler: (period: ISchedule) => void;
    schedule: ISchedule;
}

const schedules = ['Предстоящие', 'Прошедшие'] as ISchedule[];

export const SchedualDropdown: React.FC<ISchedualDropdownProps> = ({onSetScheduleClickHandler, schedule}) => {
    return (
        <Dropdown
            trigger={() => (
                // eslint-disable-next-line react/jsx-no-undef
                <Button
                    variant={ButtonVariant.transparent}
                    icon={<IconArrow />}
                    iconAlignment={ButtonIconAlignment.right}
                    label={schedule}
                />
            )}
        >
            <div className="mtheme--darkpic-bg mtheme--darkpic mtheme--darkpic-bg">
                {schedules.map((schedual) => {
                    const handlePeriodClick = () => onSetScheduleClickHandler(schedual);
                    return (
                        <Row hoverable key={schedual} onClick={handlePeriodClick}>
                            <Row.Body>
                                <Row.Text>{schedual}</Row.Text>
                            </Row.Body>
                        </Row>
                    );
                })}
            </div>
        </Dropdown>
    );
};
