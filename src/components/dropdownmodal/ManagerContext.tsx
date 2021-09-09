// НЕ ИСПОЛЬЗОВАТЬ БУДЕТ УДАЛЕН!
import {createContext, Ref} from 'react';
import * as React from 'react';

interface IContext {
    white: boolean;
    show: boolean;
    toggle: () => void;
    onCloseHandler: () => void;
    setReferenceElement: any;
    setPopperElement: any;
    styles: {[key: string]: React.CSSProperties};
    attributes: {[key: string]: {[key: string]: string} | undefined};
    dropClassName: any;
    scrollRef: Ref<HTMLDivElement>;
}

export const DropDownManagerContext = createContext<IContext | null>(null);
