import React from 'react';
import {FC, useEffect, useRef, useState} from 'react';

import IconArrow from '../../assets/svg/24/icon-arrow-24.svg';

import moment, {Moment} from 'moment';

import {Button} from '../button';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

interface ICalendarProps {
    initialToday?: Moment;
    initialStart?: Moment;
    initialEnd?: Moment;
    onChange?: (start: Moment, end: Moment) => void;
    withShortcats?: boolean;
    dateRange?: boolean;
}

export const DatePicker: FC<ICalendarProps> = ({
    initialToday,
    initialStart,
    initialEnd,
    onChange,
    withShortcats,
    dateRange,
}) => {
    const isMounted = useRef(false);

    const [today] = useState<Moment>(initialToday ? moment(initialToday) : moment());
    const [now, setNow] = useState<Moment>(initialStart || today);
    const [start, setStart] = useState<Moment | null>(initialStart || null);
    const [end, setEnd] = useState<Moment | null>((dateRange && initialEnd) || initialStart || null);
    const weekdays = moment.weekdaysShort(true);

    const startOfMonth = moment(now).startOf('month');
    const endOfMonth = moment(now).endOf('month');

    const firstWeekMonday = moment(startOfMonth).startOf('week');
    const lastWeekSunday = moment(endOfMonth).endOf('week');

    const weekCount = Math.round(lastWeekSunday.diff(firstWeekMonday, 'weeks', true));
    const weeks = [...Array.from(Array(weekCount).keys())].map((weekNumber) =>
        moment(startOfMonth).add(weekNumber, 'weeks'),
    );

    const getDaysOfWeek = (week: Moment) => {
        return [...Array.from(Array(7).keys())].map((idx) => moment(week).weekday(idx) as Moment);
    };

    const monthData: Array<Array<Moment>> = weeks.map((week) => getDaysOfWeek(week));

    const isDayOfCurrentMonth = (day: Moment | null) => day?.isBetween(startOfMonth, endOfMonth, 'days', '[]');
    const isFirstDayOfMonth = (day: Moment) => day.isSame(startOfMonth, 'days');
    const isLastDayOfMonth = (day: Moment) => day.isSame(endOfMonth, 'days');
    const isBetweenSelected = (day: Moment) => day.isBetween(start, end, 'days', '()');

    const getMonthEdgeStateForDay = (day: Moment) => {
        if (isLastDayOfMonth(moment(day).subtract(1, 'day')) && !isDayOfCurrentMonth(end) && isBetweenSelected(day)) {
            return 'end';
        } else if (
            isFirstDayOfMonth(moment(day).add(1, 'day')) &&
            !isDayOfCurrentMonth(start) &&
            isBetweenSelected(day)
        ) {
            return 'start';
        } else {
            return null;
        }
    };

    const weekClasses = (week: Moment) =>
        component(
            'datepicker',
            'week',
        )({
            start:
                week.isBetween(start, end, 'weeks', '[]') &&
                start?.isBefore(week, 'weeks') &&
                (!week.isSame(startOfMonth, 'week') || startOfMonth.isoWeekday() === 1),
            end:
                week.isBetween(start, end, 'weeks', '[]') &&
                end?.isAfter(week, 'weeks') &&
                (!week.isSame(endOfMonth, 'week') || endOfMonth.isoWeekday() === 7),
        });

    const dayClasses = (day: Moment) =>
        component(
            'datepicker',
            'day',
        )({
            inactive: !day.isBetween(today, endOfMonth, 'days', '[]') || !isDayOfCurrentMonth(day),
            cell: isBetweenSelected(day) && isDayOfCurrentMonth(day),
            start: !!end && !start?.isSame(end, 'days') && day.isSame(start, 'days') && isDayOfCurrentMonth(day),
            end: !start?.isSame(end, 'days') && day.isSame(end, 'days') && isDayOfCurrentMonth(day),
            edge: isDayOfCurrentMonth(day) && (day.isSame(start, 'days') || day.isSame(end, 'days')),
            month: !!getMonthEdgeStateForDay(day),
            today: day.isSame(today, 'day') && day.isSame(now, 'month'),
        });

    const prevMonth = () => setNow(moment(now).subtract(1, 'month'));
    const nextMonth = () => setNow(moment(now).add(1, 'month'));

    const dayClicked = (day: Moment) => {
        // для одной даты
        if (!dateRange) {
            setStart(day);
            setEnd(day);
            return;
        }

        if (end) {
            setStart(day);
            setEnd(null);
        } else {
            if (day.isAfter(start, 'days')) {
                setEnd(day);
            } else {
                setEnd(start);
                setStart(day);
            }
        }
    };
    // const cellAnimationVariants = {
    //     tap: {
    //         scale: 1.2,
    //         transition: {
    //             type: 'spring',
    //             stiffness: 360,
    //             damping: 12,
    //         },
    //     },
    // };

    useEffect(() => {
        if (start && end && isMounted.current) {
            onChange?.(
                today.isSame(start, 'day') ? moment(today) : moment(start).startOf('day'),
                moment(end).endOf('day'),
            );
        }
        isMounted.current = true;
    }, [start, end, today]);

    const IconArrowLeft = (
        <div style={{transform: 'rotate(90deg)'}}>
            <IconArrow />
        </div>
    );

    const IconArrowRight = (
        <div style={{transform: 'rotate(-90deg)'}}>
            <IconArrow />
        </div>
    );

    return (
        <div className="cdatepicker">
            <div className="cdatepicker__header">
                <div className="cdatepicker__title">
                    <span>
                        <span className="cdatepicker__month">{now.format('MMMM')}</span>{' '}
                        <span className="cdatepicker__year">{now.format('YYYY')}</span>
                    </span>
                </div>
                <div className="cdatepicker__pager">
                    <Button
                        variant={Button.variant.transparent}
                        onClick={prevMonth}
                        disabled={today.isSame(now, 'month')}
                        icon={IconArrowLeft}
                    />
                    <Button variant={Button.variant.transparent} onClick={nextMonth} icon={IconArrowRight} />
                </div>
            </div>
            <div className="cdatepicker__weekdays">
                {weekdays.map((weekday) => (
                    <span key={weekday} className="cdatepicker__weekday">
                        {weekday}
                    </span>
                ))}
            </div>
            <div className="cdatepicker__body">
                {monthData.map((week, idx) => (
                    <div key={idx} className={weekClasses(week[0])}>
                        {week.map((day) => {
                            return (
                                <span
                                    key={day.dayOfYear()}
                                    // whileTap="tap"
                                    className={dayClasses(day)}
                                    onClick={() => dayClicked(day)}
                                >
                                    <span className="cdatepicker__day-cell">
                                        <span className="cdatepicker__day-text">
                                            {isDayOfCurrentMonth(day) && day.date()}
                                        </span>
                                    </span>
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
            {withShortcats && (
                <>
                    <div className="cdatepicker__shortcuts">
                        <Button
                            label="Сегодня"
                            fixed
                            variant={
                                start?.isSame(today, 'day') && end?.isSame(today, 'day')
                                    ? Button.variant.primary
                                    : Button.variant.stroke
                            }
                            onClick={() => {
                                setStart(today);
                                setEnd(today);
                            }}
                        />
                        <Button
                            label="Завтра"
                            fixed
                            variant={
                                start?.isSame(moment(today).add(1, 'day'), 'day') &&
                                end?.isSame(moment(today).add(1, 'day'), 'day')
                                    ? Button.variant.primary
                                    : Button.variant.stroke
                            }
                            onClick={() => {
                                setStart(moment(today).add(1, 'day'));
                                setEnd(moment(today).add(1, 'day'));
                            }}
                        />
                        {dateRange && (
                            <Button
                                label="В выходные"
                                fixed
                                variant={
                                    // TODO: да, я знаю, это все в топку
                                    end?.isSame(moment(today).isoWeekday(7), 'day') &&
                                    (today.isAfter(moment(today).isoWeekday(6)) ||
                                        start?.isSame(moment(today).isoWeekday(6), 'day'))
                                        ? Button.variant.primary
                                        : Button.variant.stroke
                                }
                                onClick={() => {
                                    const saturday = moment(today).isoWeekday(6);
                                    const sunday = moment(today).isoWeekday(7);

                                    if (today.isAfter(saturday, 'days')) {
                                        setStart(sunday);
                                        setEnd(sunday);
                                    } else {
                                        setStart(saturday);
                                        setEnd(sunday);
                                    }
                                }}
                            />
                        )}
                    </div>
                    <div className="lbrick" />
                </>
            )}
        </div>
    );
};

export const DateRangePicker: React.FC<ICalendarProps> = (props) => <DatePicker {...props} dateRange />;
