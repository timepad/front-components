import {useContext} from 'react';
import {SnackbarContext, ISnackbarProps} from './SnackbarProvider';

// Custom hook to trigger the snackbar on function components
export const useSnackbar = (): (((props: ISnackbarProps) => void) | (() => void))[] => {
    const {openSnackbar, closeSnackbar = () => null} = useContext(SnackbarContext);

    const open = ({text = '', state = 'info', button}: ISnackbarProps) => {
        openSnackbar && openSnackbar({text, state, button});
    };

    // Returns methods in hooks array way
    return [open, closeSnackbar];
};
