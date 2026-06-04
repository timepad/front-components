import React from 'react';

export type ImageUploaderUploadStrategy = 'manual' | 'auto';
export type ImageUploaderViewMode = 'inline' | 'modal';

export interface IImageUploaderResult {
    fileId: string;
    fileName: string;
    mimeType?: string;
    size?: number;
    uploadURL?: string;
    response?: unknown;
}

export interface IImageUploaderError {
    message: string;
    cause?: unknown;
}

export interface IImageUploaderFileMeta {
    [key: string]: unknown;
}

export interface IImageUploaderFile {
    id: string;
    name?: string;
    type?: string;
    size?: number;
    preview?: string;
    uploadURL?: string;
    meta?: IImageUploaderFileMeta;
}

export interface IImageUploaderDriverEventMap {
    'upload-start': () => void;
    progress: (progress: number) => void;
    'upload-success': (file: IImageUploaderFile, response?: unknown) => void;
    'upload-error': (file: IImageUploaderFile | undefined, error: unknown) => void;
    error: (error: unknown) => void;
    'file-removed': (file: IImageUploaderFile) => void;
    complete: () => void;
}

export type ImageUploaderDriverCleanup = () => void;

export interface IImageUploaderDriverMountOptions {
    note?: string;
    dashboardHeight?: number;
    disabled?: boolean;
    showNativeUploadButton?: boolean;
    doneButtonHandler?: () => void;
    onRequestClose?: () => void;
}

export interface IImageUploaderDriverMountHandle {
    cleanup?: ImageUploaderDriverCleanup;
    setOptions?: (options: IImageUploaderDriverMountOptions) => void;
    open?: () => void;
    close?: () => void;
    destroy?: () => void;
}

export interface IImageUploaderDriver {
    mountInline?: (
        container: HTMLElement,
        options: IImageUploaderDriverMountOptions,
    ) => void | ImageUploaderDriverCleanup | IImageUploaderDriverMountHandle;
    mountModal?: (
        container: HTMLElement,
        options: IImageUploaderDriverMountOptions,
    ) => void | ImageUploaderDriverCleanup | IImageUploaderDriverMountHandle;
    on?: <K extends keyof IImageUploaderDriverEventMap>(
        eventName: K,
        callback: IImageUploaderDriverEventMap[K],
    ) => void | ImageUploaderDriverCleanup;
    off?: <K extends keyof IImageUploaderDriverEventMap>(
        eventName: K,
        callback: IImageUploaderDriverEventMap[K],
    ) => void;
    upload?: () => void | Promise<void>;
    cancelAll?: () => void;
    destroy?: () => void;
}

export interface IImageUploaderModalTriggerOptions {
    disabled?: boolean;
    open: () => void;
    uploading: boolean;
}

export type ImageUploaderModalTriggerChildren = (options: IImageUploaderModalTriggerOptions) => React.ReactNode;

export interface IImageUploaderProps {
    className?: string;
    children?: ImageUploaderModalTriggerChildren;
    disabled?: boolean;
    note?: string;
    dashboardHeight?: number;
    viewMode?: ImageUploaderViewMode;
    openModalButtonText?: string;
    showNativeUploadButton?: boolean;
    uploadStrategy?: ImageUploaderUploadStrategy;
    driver: IImageUploaderDriver;
    destroyDriverOnUnmount?: boolean;
    onReady?: (driver: IImageUploaderDriver) => void;
    onUploadStart?: () => void;
    onProgress?: (progress: number) => void;
    onSuccess?: (result: IImageUploaderResult) => void;
    onError?: (error: IImageUploaderError) => void;
    onFileRemove?: (fileId: string) => void;
}
