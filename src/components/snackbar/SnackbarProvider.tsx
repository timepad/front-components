import React, {createContext, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import './index.less';
import {Snackbar} from './Snackbar';

export type snackbarStateType = 'info' | 'success' | 'error' | 'successWithIcon' | 'errorWithIcon';

export type snackbarButtonType = {
    label: string;
    onClick: () => void;
};

export interface ISnackbarProps {
    state?: snackbarStateType;
    text?: string;
    button?: snackbarButtonType;
}

export type ContextType = {
    openSnackbar?: (props: ISnackbarProps) => void;
    closeSnackbar?: () => void;
};

export const snackbarDuration = 4000;
export const snackbarInterval = 150;

// Context used by the hook useSnackbar() and HoC withSnackbar()
export const SnackbarContext: React.Context<ContextType> = createContext({});

export const SnackbarProvider: React.FC = ({children}) => {
    const [open, setOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState(-1);
    const [text, setText] = useState('');
    const [state, setState] = useState<snackbarStateType>('info');
    const [actionButton, setActionButton] = useState<snackbarButtonType>();

    const triggerSnackbar = ({text, state, button}: ISnackbarProps) => {
        setText(text || '');
        setOpen(true);
        setState(state || 'info');
        setActionButton(button);
    };

    // Manages all the snackbar's opening process
    const openSnackbar = (snackbarProps: ISnackbarProps) => {
        // Closes the snackbar if it is already open
        if (open) {
            setOpen(false);
            setTimeout(() => {
                triggerSnackbar(snackbarProps);
            }, snackbarInterval);
        } else {
            triggerSnackbar(snackbarProps);
        }
    };

    // Closes the snackbar
    const closeSnackbar = () => {
        setOpen(false);
    };

    // Returns the Provider that must wrap the application
    return (
        <SnackbarContext.Provider value={{openSnackbar, closeSnackbar}}>
            {children}
            <CSSTransition
                in={open}
                timeout={150}
                mountOnEnter
                unmountOnExit
                // Sets timeout to close the snackbar
                onEnter={() => {
                    clearTimeout(timeoutId);
                    const timerId = setTimeout(() => setOpen(false), snackbarDuration);
                    setTimeoutId(timerId);
                }}
                className={`csnackbar-wrapper`}
                classNames={{
                    enter: `csnackbar-enter`,
                    enterActive: 'csnackbar-enter-active',
                    exitActive: 'csnackbar-exit-active',
                }}
            >
                <div onClick={closeSnackbar}>
                    <Snackbar
                        text={text}
                        state={state}
                        button={
                            actionButton
                                ? {
                                      label: actionButton?.label,
                                      onClick: () => {
                                          actionButton?.onClick();
                                          closeSnackbar();
                                      },
                                  }
                                : undefined
                        }
                    />
                </div>
            </CSSTransition>
        </SnackbarContext.Provider>
    );
};
