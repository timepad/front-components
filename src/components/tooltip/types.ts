import * as React from 'react';
import * as PopperJS from '@popperjs/core';

export type TriggerType = 'click' | 'hover' | 'focus';

export type Config = {
    closeOnTriggerHidden?: boolean;
    trigger?: TriggerType | null;
    followCursor?: boolean;
    mutationObserverOptions?: MutationObserverInit | null;
    defaultVisible?: boolean;
    visible?: boolean;
    onVisibleChange?: (state: boolean) => void;
    closeOnOutsideClick?: boolean;
    interactive?: boolean;
    placement?: PopperJS.Placement;
    offset?: [number, number];
};

export type PopperOptions = Partial<PopperJS.Options> & {
    createPopper?: typeof PopperJS.createPopper;
};

export type PropsGetterArgs = {
    style?: React.CSSProperties;
    [key: string]: unknown;
};
