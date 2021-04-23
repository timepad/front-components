import {createContext, Ref} from 'react';

interface IContext {
    toggle: () => void;
    onCloseHandler: () => void;
    setScrolledToBottom: (value: boolean) => void;
    show: boolean;
    ddRef?: Ref<HTMLDivElement>;
    ddBtnRef?: Ref<HTMLElement>;
    ddListRef?: Ref<HTMLDivElement>;
    doNotCloseMobileDDOnAnyClick?: boolean;
    white?: boolean;
    dropClassName: any;
}

export const DropDownManagerContext = createContext<IContext | null>(null);
