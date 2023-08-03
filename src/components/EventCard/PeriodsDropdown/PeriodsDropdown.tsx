import React from 'react';
import IconArrow from '../../../assets/svg/16/icon-arrow-down-solid-16.svg';
import {Dropdown} from '../../dropdown';
import {Button, ButtonIconAlignment, ButtonVariant} from '../../button';
import {Row} from '../../row';
import {pluralize} from '../helpers';

interface IPeriodsDropdownProps {
    sessionCount: number;
    periodList: string[];
    onSetPeriodClickHandler: (period: string) => void;
    period: string;
}

export const PeriodsDropdown: React.FC<IPeriodsDropdownProps> = ({
    periodList,
    onSetPeriodClickHandler,
    sessionCount,
    period,
}) => {
    const dropdownLabel = `${sessionCount} ${pluralize(sessionCount, ['событие', 'события', 'событий'])} за ${period}`;

    return (
        <Dropdown
            trigger={() => (
                <Button
                    variant={ButtonVariant.transparent}
                    icon={<IconArrow />}
                    iconAlignment={ButtonIconAlignment.right}
                    label={dropdownLabel}
                />
            )}
        >
            <div className="mtheme--darkpic-bg mtheme--darkpic mtheme--darkpic-bg">
                {periodList.map((mounth) => {
                    return (
                        <Row hoverable key={mounth} onClick={() => onSetPeriodClickHandler(mounth)}>
                            <Row.Body>
                                <Row.Text>{mounth}</Row.Text>
                            </Row.Body>
                        </Row>
                    );
                })}
            </div>
        </Dropdown>
    );
};
