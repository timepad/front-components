import React from 'react';
import {useSnackbar} from './useSnackbar';
import {Button} from '../button';

export const SnackbarDemo: React.FC = () => {
    const [openSnackbar] = useSnackbar();

    return (
        <div>
            <Button onClick={() => openSnackbar({text: 'Что-то произошло'})}>Click to see default snackbar</Button>
            <div className="lbrick" />
            <Button
                onClick={() =>
                    openSnackbar({
                        text: 'Что-то произошло',
                        button: {
                            label: 'Отмена',
                            onClick: () => alert('Нажата кнопка Отмена'),
                        },
                    })
                }
            >
                Click to see default snackbar with button
            </Button>
            <div className="lbrick-2" />
            <Button onClick={() => openSnackbar({text: 'Что-то успешно произошло', state: 'successWithIcon'})}>
                Click to see success snackbar with icon
            </Button>
            <div className="lbrick" />
            <Button
                onClick={() =>
                    openSnackbar({
                        text: 'Что-то успешно произошло',
                        state: 'successWithIcon',
                        button: {
                            label: 'Ок',
                            onClick: () => alert('Нажата кнопка Ок'),
                        },
                    })
                }
            >
                Click to see success snackbar with icon and button
            </Button>
            <div className="lbrick-2" />
            <Button onClick={() => openSnackbar({text: 'Что-то страшное произошло', state: 'error'})}>
                Click to see error snackbar
            </Button>
            <div className="lbrick" />
            <Button
                onClick={() =>
                    openSnackbar({
                        text: 'Что-то страшное произошло',
                        state: 'error',
                        button: {
                            label: 'Ок',
                            onClick: () => alert('Нажата кнопка Ок'),
                        },
                    })
                }
            >
                Click to see error snackbar with button
            </Button>
            <div className="lbrick-2" />
            <Button onClick={() => openSnackbar({text: 'Что-то совсем страшное произошло', state: 'errorWithIcon'})}>
                Click to see error snackbar with icon
            </Button>
            <div className="lbrick" />
            <Button
                onClick={() =>
                    openSnackbar({
                        text: 'Что-то совсем страшное произошло',
                        state: 'errorWithIcon',
                        button: {
                            label: 'Ок',
                            onClick: () => alert('Нажата кнопка Ок'),
                        },
                    })
                }
            >
                Click to see error snackbar with icon and button
            </Button>
        </div>
    );
};
