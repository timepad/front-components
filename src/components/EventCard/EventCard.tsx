import React, {useEffect, useMemo, useRef, useState} from 'react';
import IconCalendar from '../../assets/svg/16/icon-calendar-16.svg';

import {IEventCardModel, ISchedule, ISession} from './types/EventCardModel';
import moment from 'moment';
import {addThousandsSeparator, formatEventDate, formatRepitedEventDate, pluralize} from './helpers';
import {component} from '../../services/helpers/classHelpers';
import {Button, ButtonIconAlignment, ButtonVariant, Divider} from 'index';

import './index.less';
import {EventCardHeader} from './EventCardHeader/EventCardHeader';
import {ActionButtons} from './ActionButtons/ActionButtons';
import {EventCardInfo} from './EventCardInfo/EventCardInfo';
import {PeriodsDropdown} from './PeriodsDropdown/PeriodsDropdown';
import {SchedualDropdown} from './SchedualDropdown/SchedualDropdown';
import {EventSessionList} from './EventSession/EventSessionList';
import {EventCardStat} from './EventCardStat/EventCardStat';

interface IEventCardProps extends IEventCardModel {}

const wholePeriod = 'весь период';
const headerHeight = 64;
const sessionVariants = ['сеанс', 'сеанса', 'сеансов'];
const scheduleVariants = ['прошедшиий', 'прошедших', 'прошедших'];

export const EventCard: React.FC<IEventCardProps> = ({
    status,
    name,
    shedules,
    begin,
    end,
    income = 0,
    incomeCurrency = '',
    accessStatus,
    orderCount = 0,
    place,
    ticketCount,
    soldTicketCount,
    timeBeforeEvent,
    isExistDiscount,
    isTicketCheck,
    orderRefundCount,
    orderRefundAmount,
    positiveReviewCount,
    negativeReviewCount,
    isFree,
    isFavorite,
}) => {
    //hooks
    const [expanded, setExpanded] = useState(false);
    const [period, setPeriod] = useState(wholePeriod);
    const [schedule, setSchedule] = useState<ISchedule>('Предстоящие');
    const [[infoHeight, sessionsHeight], setHeights] = useState([0, 0]);
    const infoBlockRef = useRef<HTMLDivElement>(null);
    const sessionBlockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateSize = () => {
            setHeights([infoBlockRef.current?.clientHeight as number, sessionBlockRef.current?.clientHeight as number]);
        };
        updateSize();

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    //texts
    const isSessions = !!shedules?.actual?.length || !!shedules?.passed?.length;
    const isStatusDraft = status === 'draft';
    const eventFreeIncome = isFree ? 'Событие бесплатное' : `${addThousandsSeparator(income)} ${incomeCurrency}`;
    const eventIncome = isStatusDraft ? '—' : eventFreeIncome;
    const eventOrderCount = isStatusDraft ? '—' : orderCount;
    const eventTicketCount = isStatusDraft ? '—' : `${soldTicketCount} из ${ticketCount}`;
    const eventSchedual = isSessions
        ? `Ближайший сеанс: ${formatRepitedEventDate(begin, end)}`
        : `${formatEventDate(begin, end)}`;

    //variables
    const periodList = useMemo(() => {
        if (!shedules) return [];
        const sheduleMonths = schedule === 'Предстоящие' ? shedules?.actual : shedules?.passed;
        const months = sheduleMonths
            .sort((a, b) => new Date(a.begin).getMonth() - new Date(b.begin).getMonth())
            .map((session) => {
                return moment(session?.begin).format('MMMM');
            });
        return [wholePeriod, ...new Set(months)];
    }, [shedules, schedule]);

    const filteredSessions = useMemo(() => {
        if (!shedules) return [];
        const sessions = schedule === 'Предстоящие' ? shedules?.actual : shedules?.passed;
        if (period === wholePeriod && schedule === 'Предстоящие') {
            return shedules?.actual;
        }
        if (period === wholePeriod && schedule === 'Прошедшие') {
            return shedules?.passed;
        }
        return sessions.filter(({begin}) => {
            return moment(begin).format('MMMM') === period;
        });
    }, [period, schedule, shedules]);

    const sessions = useMemo((): Array<ISession & {sessionsInMonth?: string}> => {
        if (!filteredSessions.length) return [];
        const sortedSessionsByMounth = filteredSessions.reduce((acc, el) => {
            const month = moment(el.begin).format('MMMM');
            if (month in acc) {
                acc[month] = [...acc[month], el];
            } else {
                acc[month] = [];
                acc[month] = [...acc[month], el];
            }
            return acc;
        }, {} as {[key: string]: ISession[]});
        return Object.keys(sortedSessionsByMounth)
            .map((mounth) =>
                sortedSessionsByMounth[mounth].map((session, index) => {
                    const sessionsCount = sortedSessionsByMounth[mounth]?.length;
                    const pluralizeSession = pluralize(sessionsCount, sessionVariants);
                    const pluralizeSchedule =
                        schedule === 'Прошедшие' ? pluralize(sessionsCount, scheduleVariants) : '';
                    const sessionsInMonth = `${mounth}, ${sessionsCount} ${pluralizeSchedule} ${pluralizeSession}`;
                    return index === 0 ? {sessionsInMonth, ...session} : session;
                }),
            )
            .flat(2);
    }, [filteredSessions, schedule]);

    const handleSetExpandedClick = () => setExpanded((value) => !value);
    const handleSetPeriodClick = (period: string) => setPeriod(period);
    const handleSetScheduleCick = (schedule: ISchedule) => {
        setSchedule(schedule);
        setPeriod(wholePeriod);
    };

    //styles
    const eventCardStyle = {
        height: expanded ? headerHeight + sessionsHeight : headerHeight + infoHeight,
    };
    const sessionBlockStyle = {
        transform: expanded ? `translateY(-${infoHeight}px)` : 'none',
    };
    const infoBlockStyle = {
        transform: expanded ? `translateY(-${infoHeight}px)` : 'none',
    };
    const eventCardClass = component('event-card')({expand: expanded});

    return (
        <div className={eventCardClass} style={eventCardStyle}>
            <EventCardHeader status={status} name={name} isSessions={isSessions}>
                <ActionButtons
                    status={status}
                    isSessions={isSessions}
                    isFavorite={isFavorite}
                    isOpen={expanded}
                    onSetOpenClickHandler={handleSetExpandedClick}
                    className="caction-buttons"
                />
            </EventCardHeader>
            <div className="cevent-card-info-block" style={infoBlockStyle} ref={infoBlockRef}>
                <div className="cevent-card-info-block__block">
                    <EventCardInfo
                        accessStatus={accessStatus}
                        location={place}
                        schedual={eventSchedual}
                        isExistDiscount={isExistDiscount}
                        isTicketCheck={isTicketCheck}
                        timeBeforeEvent={timeBeforeEvent}
                    />
                    <EventCardStat
                        income={eventIncome}
                        currency={incomeCurrency}
                        orderCount={eventOrderCount}
                        ticketCount={eventTicketCount}
                        orderRefundAmount={orderRefundAmount}
                        orderRefundCount={orderRefundCount}
                        positiveReviewCount={positiveReviewCount}
                        negativeReviewCount={negativeReviewCount}
                    />
                </div>
                {isSessions && (
                    <>
                        <Divider className="cevent-card__mobile-divider" />
                        <Button
                            onClick={handleSetExpandedClick}
                            variant={ButtonVariant.transparent}
                            className="cevent-card-info-block__session-button"
                        >
                            Показать сеансы события
                        </Button>
                    </>
                )}
                <Divider className="cevent-card__mobile-divider" />
                <ActionButtons
                    status={status}
                    isOpen={expanded}
                    isFavorite={isFavorite}
                    isSessions={isSessions}
                    onSetOpenClickHandler={handleSetExpandedClick}
                    className="caction-buttons--mobile"
                />
            </div>
            <div className="cevent-card-session-block" style={sessionBlockStyle} ref={sessionBlockRef}>
                <Divider />
                <div className="cevent-card-filters">
                    <Button onClick={handleSetExpandedClick} variant={ButtonVariant.transparent}>
                        Скрыть события
                    </Button>
                    <Divider vertical />
                    <div className="cevent-card-filters__dropdown-container">
                        <PeriodsDropdown
                            periodList={periodList}
                            sessionCount={filteredSessions?.length}
                            onSetPeriodClickHandler={handleSetPeriodClick}
                            period={period}
                        />
                        <SchedualDropdown onSetScheduleClickHandler={handleSetScheduleCick} schedule={schedule} />
                    </div>
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconCalendar />}
                        label="Настроить расписание"
                        iconAlignment={ButtonIconAlignment.left}
                    />
                </div>
                <EventSessionList sessions={sessions} schedule={schedule} />
                <Divider className="cevent-card__mobile-divider" />
                <ActionButtons
                    status={status}
                    isOpen={expanded}
                    isFavorite={isFavorite}
                    isSessions={isSessions}
                    onSetOpenClickHandler={handleSetExpandedClick}
                    className="caction-buttons--mobile"
                />
            </div>
        </div>
    );
};
