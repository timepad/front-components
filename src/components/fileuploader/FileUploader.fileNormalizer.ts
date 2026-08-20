import type {IFileUploaderFile} from './FileUploader.types';

/** Минимальная структура файла, которую можно нормализовать для `FileUploader`. */
export interface IFileUploaderSourceFile {
    id: string;
    name?: string;
    type?: string;
    size?: number;
    preview?: string;
    uploadURL?: string;
    meta?: Record<string, unknown>;
}

/** Приводит файл конкретной uploader-библиотеки к абстрактному контракту `FileUploader`. */
export const normalizeFileUploaderFile = (file: IFileUploaderSourceFile | undefined): IFileUploaderFile | undefined => {
    if (!file) {
        return undefined;
    }

    return {
        id: file.id,
        name: file.name,
        type: file.type,
        size: file.size,
        preview: file.preview,
        uploadURL: file.uploadURL,
        meta: file.meta,
    };
};
