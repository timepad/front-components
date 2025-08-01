import React, {useState, FC} from 'react';
import moment, {Moment} from 'moment';

import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';

import {DatePicker} from './index';
import {Dropdown} from '../dropdown';
import {Button} from '../button';

import 'css/bundle.less';

import {Brick} from '../brick';

import {IAnalyticsProps} from './DatePicker';

export default {
    title: 'DatePicker',
    component: DatePicker,
} as Meta;

const initialDate = moment('2020-03-24');

const Wrapper: FC<React.PropsWithChildren<unknown>> = ({children}) => (
    <div className="сdropdown-body" style={{width: 'fit-content'}}>
        {children}
    </div>
);

const dataAnalyticsProps: IAnalyticsProps = {
    todayBtn: 'test_DataAnalytics.userDateToday',
    tomorrowBtn: 'test_DataAnalytics.userDateTomorrow',
    weekendBtn: 'test_DataAnalytics.userDateDayoff',
};

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Datepicker</StoryTitle>
            <Wrapper>
                <DatePicker initialToday={initialDate} />
            </Wrapper>
            <Brick size={3} />
            <StoryTitle>DatePicker with shortcats</StoryTitle>
            <Wrapper>
                <DatePicker withShortcats initialStart={initialDate} analytic={dataAnalyticsProps} />
            </Wrapper>
        </>
    );
};

Simple.storyName = 'Simple';

export const withPastDates: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>DatePicker with past dates</StoryTitle>
            <Wrapper>
                <DatePicker withShortcats initialStart={initialDate} analytic={dataAnalyticsProps} enableDates="all" />
            </Wrapper>
        </>
    );
};

withPastDates.storyName = 'withPastDates';

export const Range: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Date Range</StoryTitle>
            <Wrapper>
                <DatePicker dateRange initialToday={initialDate} />
            </Wrapper>
            <Brick size={3} />
            <StoryTitle>Date Range with shortcats</StoryTitle>
            <Wrapper>
                <DatePicker withShortcats dateRange initialStart={initialDate} analytic={dataAnalyticsProps} />
            </Wrapper>
        </>
    );
};

Range.storyName = 'Date Range';

const dateFormater = (date?: Moment) => {
    return date && moment(date).format('DD.MM.YYYY');
};

export const WithTrigger: IStorybookComponent = () => {
    const [date, setDate] = useState<Moment>();
    const [dateVisible, setDateVisible] = useState(false);

    const [range, setRange] = useState<[Moment?, Moment?]>([]);
    const [rangeVisible, setRangeVisible] = useState(false);

    return (
        <>
            <StoryTitle>DatePicker with trigger</StoryTitle>
            <Dropdown
                show={dateVisible}
                trigger={() => (
                    <Button onClick={() => setDateVisible(true)}>Date{date && `: ${dateFormater(date)}`}</Button>
                )}
            >
                <DatePicker
                    withShortcats
                    initialStart={date}
                    onChange={(start) => {
                        setDate(start);
                        setDateVisible(false);
                    }}
                />
            </Dropdown>
            <Brick size={3} />
            <StoryTitle>DateRange with trigger</StoryTitle>
            <Dropdown
                show={rangeVisible}
                trigger={() => (
                    <Button onClick={() => setRangeVisible(true)}>
                        DateRange{range.length > 0 && `: ${dateFormater(range[0])} - ${dateFormater(range[1])}`}
                    </Button>
                )}
            >
                <DatePicker
                    dateRange
                    withShortcats
                    initialStart={range[0]}
                    initialEnd={range[1]}
                    onChange={(start, end) => {
                        setRange([start, end]);
                        setRangeVisible(false);
                    }}
                    analytic={dataAnalyticsProps}
                />
            </Dropdown>
        </>
    );
};

WithTrigger.storyName = 'DatePicker with Trigger';
