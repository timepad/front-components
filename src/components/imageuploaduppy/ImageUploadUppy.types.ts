import type Uppy from '@uppy/core';

export type UppyUploadStrategy = 'manual' | 'auto';
export type UppyViewMode = 'inline' | 'modal';

export interface IImageUploadResult {
    fileId: string;
    fileName: string;
    mimeType?: string;
    size?: number;
    uploadURL?: string;
    response?: unknown;
}

export interface IImageUploadError {
    message: string;
    cause?: unknown;
}

export interface IImageUploadLocale {
    strings?: Record<string, string>;
}

export interface IImageUploadPluginFactoryContext {
    uppy: Uppy;
}

export type ImageUploadPluginFactory = (context: IImageUploadPluginFactoryContext) => void;

export interface IImageUploadUppyAdapterConfig {
    createUploader?: () => Uppy;
    plugins?: ImageUploadPluginFactory[];
    locale?: IImageUploadLocale;
    uploadStrategy?: UppyUploadStrategy;
}

export interface IImageUploadUppyProps {
    className?: string;
    disabled?: boolean;
    note?: string;
    dashboardHeight?: number;
    viewMode?: UppyViewMode;
    openModalButtonText?: string;
    adapter?: IImageUploadUppyAdapterConfig;
    onReady?: (uppy: Uppy) => void;
    onUploadStart?: () => void;
    onProgress?: (progress: number) => void;
    onSuccess?: (result: IImageUploadResult) => void;
    onError?: (error: IImageUploadError) => void;
    onFileRemove?: (fileId: string) => void;
}
