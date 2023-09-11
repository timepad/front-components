export interface ISession {
    begin: Date;
    end?: Date;
    timeBeforeEvent: string;
    income?: number;
    incomeCurrency?: string;
    orderCount?: number;
    ticketCount?: number;
    soldTicketCount?: number;
    isFree: boolean;
    orderRefundCount?: number;
    orderRefundAmount?: number;
    orderRefundCurrency?: string;
}

export interface ISessions {
    passed: ISession[];
    actual: ISession[];
}

export type IEventStatus = 'draft' | 'published' | 'past';

export type IEventAccessStatus = 'public' | 'link' | 'private';

export interface IEventCardModel extends ISession {
    id: number;
    name: string;
    status: IEventStatus;
    accessStatus: IEventAccessStatus;
    place: string;
    isFavorite: boolean;
    isTicketCheck: boolean;
    isExistDiscount: boolean;
    positiveReviewCount?: number;
    negativeReviewCount?: number;
    shedules?: ISessions;
}

export type ISchedule = 'Предстоящие' | 'Прошедшие';
