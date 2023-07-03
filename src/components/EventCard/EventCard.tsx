import React, {useEffect, useMemo, useRef, useState} from 'react';
import IconCalendar from '../../assets/svg/16/icon-calendar-16.svg';

import {IEventCardModel, ISchedule, ISession} from './types/EventCardModel';
import {
    EventCardHeader,
    EventCardInfo,
    EventCardStat,
    PeriodsDropdown,
    SchedualDropdown,
    EventSessionList,
    ActionButtons,
} from './components';
import {formatEventDate, formatRepitedEventDate} from './helpers';
import moment from 'moment';
import {component} from '../../services/helpers/classHelpers';
import {Button, ButtonIconAlignment, ButtonVariant, Divider} from 'index';

import './index.less';

interface IEventCardProps extends IEventCardModel {}

export const EventCard: React.FC<IEventCardProps> = ({
    status,
    name,
    shedules,
    begin,
    end,
    income,
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
    const [period, setPeriod] = useState('весь период');
    const [schedule, setSchedule] = useState<ISchedule>('Предстоящие');
    const [[infoHeight, sessionsHeight], setHeights] = useState([0, 0]);
    const infoBlockRef = useRef<HTMLDivElement>(null);
    const sessionBlockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const updateSize = () => {};
        setHeights([infoBlockRef.current?.clientHeight as number, sessionBlockRef.current?.clientHeight as number]);
        updateSize();

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    //variables
    const isRepitenEvent = !!shedules?.actual?.length || !!shedules?.passed?.length;
    const isStatusDraft = status === 'draft';
    const eventIncome = isStatusDraft ? '—' : isFree ? 'Событие бесплатное' : `${income} ${incomeCurrency}`;
    const eventOrderCount = isStatusDraft ? '—' : orderCount;
    const eventTicketCount = isStatusDraft ? '—' : `${soldTicketCount} из ${ticketCount}`;
    const eventSchedual = isRepitenEvent
        ? `Ближайший сеанс: ${formatRepitedEventDate(begin, end)}`
        : `${formatEventDate(begin, end)}`;

    const periodList = useMemo(() => {
        if (!shedules) return [];
        const months = [...shedules?.actual, ...shedules?.passed]
            .sort((a, b) => new Date(a.begin).getMonth() - new Date(b.begin).getMonth())
            .map((session) => {
                return moment(session?.begin).format('MMMM');
            });
        return ['весь период', ...new Set(months)];
    }, [shedules]);

    const filteredSessions = useMemo(() => {
        if (!shedules) return [];
        const sessions = schedule === 'Предстоящие' ? shedules?.actual : shedules?.passed;
        if (period === 'весь период' && schedule === 'Предстоящие') {
            return shedules?.actual;
        }
        if (period === 'весь период' && schedule === 'Прошедшие') {
            return shedules?.passed;
        }
        return sessions.filter(({begin}) => {
            return moment(begin).format('MMMM') === period;
        });
    }, [period, schedule, shedules]);

    const sortedSessionsByMounth = useMemo((): {[key: string]: ISession[]} => {
        if (!filteredSessions.length) return {};
        return filteredSessions.reduce((acc, el) => {
            const month = moment(el.begin).format('MMMM');
            if (month in acc) {
                acc[month] = [...acc[month], el];
            } else {
                acc[month] = [];
                acc[month] = [...acc[month], el];
            }
            return acc;
        }, {} as {[key: string]: ISession[]});
    }, [filteredSessions]);

    const handleSetExpandedClick = () => setExpanded((value) => !value);
    const handleSetPeriodClick = (period: string) => setPeriod(period);
    const handleSetScheduleCick = (schedule: ISchedule) => setSchedule(schedule);

    //styles
    const headerHeight = 64;
    const eventCardStyle = {
        height: expanded ? headerHeight + sessionsHeight : headerHeight + infoHeight,
    };
    const sessionBlockStyle = {
        transform: expanded ? `translateY(-${infoHeight}px)` : 'none',
    };
    const infoBlockStyle = {
        transform: expanded ? `translateY(-${infoHeight}px)` : 'none',
    };
    const eventCardClass = component('event_card')({expand: expanded});

    return (
        <div className={eventCardClass} style={eventCardStyle}>
            <EventCardHeader status={status} name={name} isRepitenEvent={isRepitenEvent}>
                <ActionButtons
                    status={status}
                    isRepitenEvent={isRepitenEvent}
                    isFavorite={isFavorite}
                    isOpen={expanded}
                    onSetOpenClickHandler={handleSetExpandedClick}
                    className="caction_buttons"
                />
            </EventCardHeader>
            <div className="cevent_card_info_block" style={infoBlockStyle} ref={infoBlockRef}>
                <div className="cevent_card_info_block__block">
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
                {isRepitenEvent && (
                    <>
                        <Divider className="cevent_card__mobile_divider" />
                        <Button
                            onClick={handleSetExpandedClick}
                            variant={ButtonVariant.transparent}
                            className="cevent_card_info_block__session_button"
                        >
                            Показать сеансы события
                        </Button>
                    </>
                )}
                <Divider className="cevent_card__mobile_divider" />
                <ActionButtons
                    status={status}
                    isOpen={expanded}
                    isFavorite={isFavorite}
                    isRepitenEvent={isRepitenEvent}
                    onSetOpenClickHandler={handleSetExpandedClick}
                    className="caction_buttons--mobile"
                />
            </div>
            <div className="cevent_card_session_block" style={sessionBlockStyle} ref={sessionBlockRef}>
                <Divider />
                <div className="cevent_card_filters">
                    <Button onClick={handleSetExpandedClick} variant={ButtonVariant.transparent}>
                        Скрыть события
                    </Button>
                    <Divider vertical />
                    <div className="cevent_card_filters__dropdown_container">
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
                <EventSessionList sessions={sortedSessionsByMounth} schedule={schedule} />
                <Divider className="cevent_card__mobile_divider" />
                <ActionButtons
                    status={status}
                    isOpen={expanded}
                    isFavorite={isFavorite}
                    isRepitenEvent={isRepitenEvent}
                    onSetOpenClickHandler={handleSetExpandedClick}
                    className="caction_buttons--mobile"
                />
            </div>
        </div>
    );
};
