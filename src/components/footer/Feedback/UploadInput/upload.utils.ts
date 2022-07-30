import axios from 'axios';
import {ChangeEvent} from 'react';
import {UploadApiService} from './UploadApiService';

const api = new UploadApiService();

export type setProgressFunction = (p: number) => void;

const updateProgress = (setProgress: setProgressFunction) => (event: ProgressEvent) => {
    const percentCompleted = Math.floor((event.loaded * 100) / event.total);
    setProgress(percentCompleted);
};

export interface IFileUpload {
    e: Event;
    setProgress: setProgressFunction;
    onLoad: (e: Event) => void | boolean;
    onUpload: (url: string) => void;
    onError: (error: string) => void;
}

export const getFileNameOnUpload = (e: ChangeEvent): string | null => {
    const target = e.target as HTMLInputElement;

    const files = target.files;
    if (files?.length) {
        const file = files[0];

        return file?.name;
    } else {
        return null;
    }
};

/** Хелпер для загрузки файлов асинхронно от формы.
 * Предполагается, что будет обёрнут в useCallback и передан в метод addEventListener или, как проп в onChange */
export const fileUpload = async ({e, setProgress, onLoad, onUpload, onError}: IFileUpload): Promise<void> => {
    setProgress(0);

    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files?.length) {
        const file = files[0];

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = function (event) {
            onLoad(event);
        };

        const formData = new FormData();
        formData.append('file', file);

        try {
            const result = await api.uploadFile(formData, updateProgress(setProgress));
            if (result) {
                const fileUrl = process.env.STATIC_BASE_URL + result.file + '/';
                onUpload(fileUrl);
            }
        } catch (err) {
            setProgress(0);
            !axios.isCancel(err) && onError('Произошла ошибка при загрузке, попробуйте еще раз.');
        }
    }
};
