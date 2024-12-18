import React, {FC, useEffect, useRef, useState} from 'react';

import classNames from 'classnames';
import moment, {Moment} from 'moment';

import IconArrow from '../../assets/svg/24/icon-arrow-24.svg';
import {Button} from '../button';
import {component, layout} from '../../services/helpers/classHelpers';

import './index.less';

moment.locale('ru');

type EnableDates = 'future' | 'past' | 'all';

enum SelectViewTypes {
    'MONTH' = 'month',
    'YEAR' = 'year',
}

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
    enableDates?: EnableDates;
    invalidDates?: Moment[];
}

interface IDatePickerView {
    now: Moment;
    enableDates: EnableDates;
    today: Moment;
}

interface IDatePickerMonthView extends IDatePickerView {
    onMonthChange: (month: string) => void;
}

interface IDatePickerYearView extends IDatePickerView {
    onYearChange: (year: number) => void;
}

const baseClassName = 'datepicker';

const getYearsFromStartYear = (startYear = 1970) => {
    const currentYear = moment().year();

    return Array.from({length: currentYear - startYear + 1}, (_, index) => startYear + index);
};

const MonthSelectView = ({now, onMonthChange, enableDates, today}: IDatePickerMonthView) => {
    const months = moment.months();

    const checkMonthActive = (monthName: string) => {
        const targetMonth = moment(now).month(monthName);

        if (enableDates === 'future') {
            return !targetMonth.isBefore(today, 'month');
        }
        if (enableDates === 'past') {
            return !targetMonth.isAfter(today, 'month');
        }
        return true;
    };

    return (
        <div className={component(baseClassName, 'month')({['selection']: true})}>
            {months.map((month) => {
                const isCurrentMonth = moment(now).format('MMMM') === month;
                const isMonthActive = checkMonthActive(month);

                return (
                    <div
                        key={month}
                        onClick={() => isMonthActive && onMonthChange(month)}
                        className={component(
                            baseClassName,
                            'month',
                        )({['selection_item']: true, ['active']: isCurrentMonth, ['inactive']: !isMonthActive})}
                    >
                        <span className={component(baseClassName, 'month')({['text']: true})}>{month}</span>
                    </div>
                );
            })}
        </div>
    );
};

const YearSelectView = ({now, onYearChange, today, enableDates}: IDatePickerYearView) => {
    const checkYearActive = (year: number) => {
        const currentYear = moment(today).year();

        if (enableDates === 'future') {
            return year >= currentYear;
        }
        if (enableDates === 'past') {
            return year <= currentYear;
        }
        return true;
    };

    return (
        <div className={component(baseClassName, 'year')({['selection']: true})}>
            {getYearsFromStartYear().map((year, index) => {
                const isCurrentYear = moment(now).year() === year;
                const isActiveYear = checkYearActive(year);
                return (
                    <div
                        onClick={() => isActiveYear && onYearChange(year)}
                        className={component(
                            baseClassName,
                            'year',
                        )({['selection_item']: true, ['active']: isCurrentYear, ['inactive']: !isActiveYear})}
                        key={year + index}
                    >
                        <span className={component(baseClassName, 'year--text')()}>{year}</span>
                    </div>
                );
            })}
        </div>
    );
};

export const DatePicker: FC<React.PropsWithChildren<IDatePickerProps>> = ({
    initialToday,
    initialStart,
    initialEnd,
    onChange,
    withShortcats,
    dateRange,
    analytic,
    enableDates = 'future',
    invalidDates,
}) => {
    const isMounted = useRef(false);

    const oneDay = 1; // fix проблемы moment().add
    const [today] = useState<Moment>(initialToday ? moment(initialToday) : moment());
    const [now, setNow] = useState<Moment>(initialStart || today);
    const [start, setStart] = useState<Moment | null>(initialStart || null);
    const [end, setEnd] = useState<Moment | null>((dateRange && initialEnd) || initialStart || null);
    const [selectView, setSelectView] = useState<SelectViewTypes | null>(null);

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

    const onSelectCurrentView = (view: SelectViewTypes) => {
        if (selectView === view) {
            return setSelectView(null);
        }

        return setSelectView(view);
    };

    const onMonthChange = (monthName: string) => {
        setSelectView(null);
        setNow(moment(now).month(monthName));
    };

    const onYearChange = (year: number) => {
        setSelectView(null);
        setNow(moment(now).year(year));
    };

    const monthData: Array<Array<Moment>> = weeks.map((week) => getDaysOfWeek(week));

    const isDayOfCurrentMonth = (day: Moment | null) => day?.isBetween(startOfMonth, endOfMonth, 'days', '[]');
    const isFirstDayOfMonth = (day: Moment) => day.isSame(startOfMonth, 'days');
    const isLastDayOfMonth = (day: Moment) => day.isSame(endOfMonth, 'days');
    const isBetweenSelected = (day: Moment) => day.isBetween(start, end, 'days', '()');
    const isDayInactive = (day: Moment) => {
        const isFutureDate = day.isAfter(today, 'day');
        const isPastDate = day.isBefore(today, 'day');

        if (enableDates === 'future') return isPastDate;
        if (enableDates === 'past') return isFutureDate;

        return false;
    };

    const isInvalidDate = (day: Moment) => {
        if (!invalidDates || invalidDates.length === 0) return false;
        return invalidDates.some((invalidDate) => day.isSame(invalidDate, 'day'));
    };

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

    const bodyClasses = classNames('cdatepicker__body', {
        ['view-selected']: !!selectView,
        ['month']: selectView === SelectViewTypes.MONTH,
        ['year']: selectView === SelectViewTypes.YEAR,
    });

    const weekClasses = (week: Moment) =>
        component(
            baseClassName,
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
            baseClassName,
            'day',
        )({
            inactive: isInvalidDate(day) || isDayInactive(day) || !isDayOfCurrentMonth(day),
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
    const nextMonth = () => setNow(moment(now).add(1, 'month'));

    const selectDates = (start: Moment, end: Moment | null = start) => {
        setStart(start);
        setEnd(end);
        setNow(start);
        setSelectView(null);
    };

    const dayClicked = (day: Moment) => {
        if (isInvalidDate(day)) return;

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
    }, [start, end, today]);

    return (
        <div className={component(baseClassName)()}>
            <div className={component(baseClassName, 'header')({['active']: !!selectView})}>
                <div className={component(baseClassName, 'title')()}>
                    <span>
                        <span
                            onClick={() => onSelectCurrentView(SelectViewTypes.MONTH)}
                            className={component(baseClassName, 'header-month')()}
                        >
                            {now.format('MMMM')}
                        </span>{' '}
                        <span
                            onClick={() => onSelectCurrentView(SelectViewTypes.YEAR)}
                            className={component(baseClassName, 'header-year')()}
                        >
                            {now.format('YYYY')}
                        </span>
                    </span>
                </div>
                {!selectView && (
                    <div className={component(baseClassName, 'pager')()}>
                        <>
                            <Button
                                variant={Button.variant.transparent}
                                onClick={prevMonth}
                                disabled={enableDates !== 'past' && enableDates !== 'all' && today.isSame(now, 'month')}
                                icon={<IconArrow style={{transform: 'rotate(90deg)'}} />}
                            />
                            <Button
                                variant={Button.variant.transparent}
                                onClick={nextMonth}
                                disabled={
                                    enableDates !== 'future' && enableDates !== 'all' && today.isSame(now, 'month')
                                }
                                icon={<IconArrow style={{transform: 'rotate(-90deg)'}} />}
                            />
                        </>
                    </div>
                )}
            </div>
            {!selectView && (
                <div className={component(baseClassName, 'weekdays')()}>
                    {weekdays.map((weekday) => (
                        <span key={weekday} className={component(baseClassName, 'weekday')()}>
                            {weekday}
                        </span>
                    ))}
                </div>
            )}
            <div className={bodyClasses}>
                {selectView === SelectViewTypes.MONTH && (
                    <MonthSelectView now={now} onMonthChange={onMonthChange} enableDates={enableDates} today={today} />
                )}
                {selectView === SelectViewTypes.YEAR && (
                    <YearSelectView now={now} onYearChange={onYearChange} enableDates={enableDates} today={today} />
                )}
                {!selectView &&
                    monthData.map((week, idx) => (
                        <div key={idx} className={weekClasses(week[0])}>
                            {week.map((day) => {
                                return (
                                    <span
                                        key={day.dayOfYear()}
                                        // whileTap="tap"
                                        className={dayClasses(day)}
                                        onClick={() => dayClicked(day)}
                                    >
                                        <span className={component(baseClassName, 'day-cell')()}>
                                            <span className={component(baseClassName, 'day-text')()}>
                                                {isDayOfCurrentMonth(day) && day.date()}
                                            </span>
                                        </span>
                                    </span>
                                );
                            })}
                        </div>
                    ))}
            </div>
            {withShortcats && !selectView && (
                <>
                    <div className={component(baseClassName, 'shortcuts')()}>
                        <Button
                            label="Сегодня"
                            variant={selectedToday ? Button.variant.primary : Button.variant.stroke}
                            onClick={() => selectDates(today)}
                            data-analytics={analytic?.todayBtn}
                        />
                        <Button
                            label="Завтра"
                            variant={selectedTomorrow ? Button.variant.primary : Button.variant.stroke}
                            onClick={() => selectDates(moment(today).add(oneDay, 'day'))}
                            data-analytics={analytic?.tomorrowBtn}
                        />
                        {dateRange && (
                            <Button
                                label="В выходные"
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
                    <div className={layout('brick')()} />
                </>
            )}
        </div>
    );
};
