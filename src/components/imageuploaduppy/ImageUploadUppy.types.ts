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

export interface IImageUploadFileMeta {
    s3Headers?: Record<string, string>;
    publicUrl?: string;
    [key: string]: unknown;
}

export interface IImageUploadUppyFile {
    id: string;
    name?: string;
    type?: string;
    size?: number;
    preview?: string;
    uploadURL?: string;
    meta?: IImageUploadFileMeta;
}

export interface IImageUploadLocale {
    strings?: Record<string, string>;
}

export interface IImageUploadPluginFactoryContext {
    uppy: Uppy;
}

export type ImageUploadPluginFactoryCleanup = () => void;
export type ImageUploadPluginFactory = (
    context: IImageUploadPluginFactoryContext,
) => void | ImageUploadPluginFactoryCleanup;

export interface IImageUploadUppyAdapterConfig {
    // Adapter should be memoized in parent to avoid recreating Uppy instance.
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
    showNativeUploadButton?: boolean;
    adapter?: IImageUploadUppyAdapterConfig;
    onReady?: (uppy: Uppy) => void;
    onUploadStart?: () => void;
    onProgress?: (progress: number) => void;
    onSuccess?: (result: IImageUploadResult) => void;
    onError?: (error: IImageUploadError) => void;
    onFileRemove?: (fileId: string) => void;
}
