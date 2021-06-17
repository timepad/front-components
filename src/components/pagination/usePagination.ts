import {useMemo} from 'react';

export interface IUsePaginationEntry {
    activePage: number;
    coefficient: number;
    total: number;
}

export type TUsePaginationOutput = {
    centerItems: TPage[];
    startItems: TPage[];
    endItems: TPage[];
    isStartEllipsis: boolean;
    isEndEllipsis: boolean;
};

export type TPage = {
    id: number;
};

export const usePagination = ({coefficient, activePage, total}: IUsePaginationEntry): TUsePaginationOutput => {
    const validCoef = useMemo<number>(
        () => (coefficient * 2 + 1 > total ? (total - 1) / 2 : coefficient),
        [coefficient, total],
    );

    const centerItems = useMemo<TPage[]>(() => {
        const result: TPage[] = [];
        const startPosition = activePage - validCoef;
        const endPosition = activePage + validCoef;
        for (let i = startPosition; i <= endPosition && i <= total; i++) {
            if (i > 0) result.push({id: i});
        }

        return result;
    }, [activePage, validCoef, total]);

    const startItems = useMemo<TPage[]>(() => {
        const result: TPage[] = [];
        const startPosition = 1;
        const endPosition = startPosition + validCoef;
        const [{id}] = centerItems;
        for (let i = startPosition; i < endPosition; i++) {
            if (i > 0 && i < id) result.push({id: i});
        }

        return result;
    }, [validCoef, centerItems]);

    const endItems = useMemo<TPage[]>(() => {
        const result: TPage[] = [];
        const endPosition = total;
        const startPosition = endPosition - validCoef + 1;
        const {id} = centerItems[centerItems.length - 1];
        for (let i = startPosition; i <= endPosition; i++) {
            if (i > 0 && i > id) result.push({id: i});
        }

        return result;
    }, [validCoef, centerItems, total]);

    const isStartEllipsis = useMemo<boolean>(
        () => startItems.length > 0 && startItems[startItems.length - 1].id + 1 !== centerItems[0].id,
        [centerItems, startItems],
    );

    const isEndEllipsis = useMemo<boolean>(
        () => endItems.length > 0 && centerItems[centerItems.length - 1].id + 1 !== endItems[0].id,
        [centerItems, endItems],
    );

    return {
        centerItems,
        startItems,
        endItems,
        isStartEllipsis,
        isEndEllipsis,
    };
};
