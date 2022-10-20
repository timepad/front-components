import React from 'react';
import {ISnackbarProps, SnackbarContext} from './SnackbarProvider';

export interface ISnackbarProviderProps {
    openSnackbar: (props: ISnackbarProps) => void;
    closeSnackbar: () => void;
}

// High order Component to trigger the snackbar on class components
export function withSnackbar<P>(
    WrappedComponent: React.ComponentClass<P>,
): React.ComponentClass<P & ISnackbarProviderProps> {
    return class WrappedComponentWithSnackbar extends React.Component<P & ISnackbarProviderProps> {
        declare context: React.ContextType<typeof SnackbarContext>;

        open = (props: ISnackbarProps) => {
            const {openSnackbar} = this.context;
            openSnackbar && openSnackbar(props);
        };

        close = () => {
            const {closeSnackbar} = this.context;
            closeSnackbar && closeSnackbar();
        };

        render() {
            return <WrappedComponent {...this.props} openSnackbar={this.open} closeSnackbar={this.close} />;
        }
    };
}
