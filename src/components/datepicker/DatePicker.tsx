import React, {FC, useEffect, useRef, useState} from 'react';

import IconArrow from '../../assets/svg/24/icon-arrow-24.svg';

import moment, {Moment} from 'moment';

import {Button} from '../button';
import {component} from '../../services/helpers/classHelpers';
import './index.less';

moment.locale('ru');

export interface IAnalyticsProps {
    todayBtn?: string;
    tomorrowBtn?: string;
    weekendBtn?: string;
}

interface IDatePickerProps {
    initialToday?: Moment;
    initialStart?: Moment;
    initialEnd?: Moment;
    onChange?: (start: Moment, end: Moment) => void;
    withShortcats?: boolean;
    dateRange?: boolean;
    analytic?: IAnalyticsProps;
}

export const DatePicker: FC<IDatePickerProps> = ({
    initialToday,
    initialStart,
    initialEnd,
    onChange,
    withShortcats,
    dateRange,
    analytic,
}) => {
    const isMounted = useRef(false);

    const oneDay = 1; // fix проблемы moment().add
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
            isFirstDayOfMonth(moment(day).add(oneDay, 'day')) &&
            !isDayOfCurrentMonth(start) &&
            isBetweenSelected(day)
        ) {
            return 'start';
        } else {
            return null;
        }
    };

    // TODO: Переработать правила, на основе имеющихся
    const selectedToday = start?.isSame(today, 'day') && end?.isSame(today, 'day');
    const selectedTomorrow =
        start?.isSame(moment(today).add(oneDay, 'day'), 'day') && end?.isSame(moment(today).add(oneDay, 'day'), 'day');
    const selectedWeekend =
        end?.isSame(moment(today).isoWeekday(7), 'day') &&
        (today.isAfter(moment(today).isoWeekday(6)) || start?.isSame(moment(today).isoWeekday(6), 'day'));

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
            month: !getMonthEdgeStateForDay(day),
            month_end: getMonthEdgeStateForDay(day) === 'end',
            month_start: getMonthEdgeStateForDay(day) === 'start',
            today: day.isSame(today, 'day') && day.isSame(now, 'month'),
        });

    const prevMonth = () => setNow(moment(now).subtract(1, 'month'));
    const nextMonth = () => setNow(moment(now).add(oneDay, 'month'));

    const selectDates = (start: Moment, end: Moment | null = start) => {
        setStart(start);
        setEnd(end);
        setNow(start);
    };

    const dayClicked = (day: Moment) => {
        // для одной даты
        if (!dateRange) return selectDates(day);

        // если есть конечная дата, начинаем сначала
        if (end) return selectDates(day, null);

        // выделение конечной точки
        if (day.isAfter(start, 'days')) {
            setEnd(day);
        } else {
            // инвертируем выделение
            selectDates(day, start);
        }
    };

    useEffect(() => {
        if (start && end && isMounted.current) {
            onChange?.(
                today.isSame(start, 'day') ? moment(today) : moment(start).startOf('day'),
                moment(end).endOf('day'),
            );
        }
        isMounted.current = true;
    }, [onChange, start, end, today]);

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
                        icon={<IconArrow style={{transform: 'rotate(90deg)'}} />}
                    />
                    <Button
                        variant={Button.variant.transparent}
                        onClick={nextMonth}
                        icon={<IconArrow style={{transform: 'rotate(-90deg)'}} />}
                    />
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
                            variant={selectedToday ? Button.variant.primary : Button.variant.stroke}
                            onClick={() => selectDates(today)}
                            data-analytics={analytic?.todayBtn}
                        />
                        <Button
                            label="Завтра"
                            fixed
                            variant={selectedTomorrow ? Button.variant.primary : Button.variant.stroke}
                            onClick={() => selectDates(moment(today).add(oneDay, 'day'))}
                            data-analytics={analytic?.tomorrowBtn}
                        />
                        {dateRange && (
                            <Button
                                label="В выходные"
                                fixed
                                variant={selectedWeekend ? Button.variant.primary : Button.variant.stroke}
                                onClick={() => {
                                    const saturday = moment(today).isoWeekday(6);
                                    const sunday = moment(today).isoWeekday(7);

                                    if (today.isAfter(saturday, 'days')) {
                                        selectDates(sunday);
                                    } else {
                                        selectDates(saturday, sunday);
                                    }
                                }}
                                data-analytics={analytic?.weekendBtn}
                            />
                        )}
                    </div>
                    <div className="lbrick" />
                </>
            )}
        </div>
    );
};

export const DateRangePicker: React.FC<IDatePickerProps> = (props) => <DatePicker {...props} dateRange />;
