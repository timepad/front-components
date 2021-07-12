import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import '../../assets/css/bundle.less';
import {SnackbarProvider} from './SnackbarProvider';
import {Snackbar} from './Snackbar';
import {SnackbarDemo} from './SnackbarDemo';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Snackbar',
    component: SnackbarDemo,
} as Meta;

export const View: IStorybookComponent = () => {
    return (
        <SnackbarProvider>
            <Snackbar text="Что-то произошло" />
            <div className="lbrick" />
            <Snackbar
                text="Что-то произошло"
                button={{
                    label: 'Отмена',
                    onClick: () => null,
                }}
            />
            <div className="lbrick-2" />
            <Snackbar text="Что-то успешно произошло" state="successWithIcon" />
            <div className="lbrick" />
            <Snackbar
                text="Что-то успешно произошло"
                state="successWithIcon"
                button={{
                    label: 'Ок',
                    onClick: () => null,
                }}
            />
            <div className="lbrick-2" />
            <Snackbar text="Что-то страшное произошло" state="error" />
            <div className="lbrick" />
            <Snackbar text="Что-то страшное произошло" state="errorWithIcon" />
            <div className="lbrick" />
            <Snackbar
                text="Что-то страшное произошло"
                state="errorWithIcon"
                button={{
                    label: 'Ок',
                    onClick: () => null,
                }}
            />
        </SnackbarProvider>
    );
};
View.storyName = 'View';

export const Default: IStorybookComponent = () => {
    return (
        <SnackbarProvider>
            <SnackbarDemo />
        </SnackbarProvider>
    );
};
Default.storyName = 'Demo';
