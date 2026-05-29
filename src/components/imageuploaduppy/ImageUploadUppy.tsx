import React, {useEffect, useMemo, useRef, useState} from 'react';
import Uppy from '@uppy/core';
import ImageEditor from '@uppy/image-editor';
import Dashboard from '@uppy/react/dashboard';
import DashboardModal from '@uppy/react/dashboard-modal';

import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';
import '@uppy/image-editor/css/style.min.css';

import './index.less';

import {component} from '../../services/helpers/classHelpers';
import {Button, ButtonVariant} from '../button';
import {Brick} from '../brick';
import {Typography} from '../typography';
import {
    IImageUploadError,
    IImageUploadResult,
    IImageUploadUppyFile,
    ImageUploadPluginFactoryCleanup,
    IImageUploadUppyProps,
    UppyUploadStrategy,
} from './ImageUploadUppy.types';

const DEFAULT_NOTE = 'Выберите изображение и при необходимости обрежьте его через Edit';
const DEFAULT_OPEN_MODAL_BUTTON_TEXT = 'Открыть загрузчик';
const cnImageUploadUppy = component('image-upload-uppy');
const IMAGE_EDITOR_OPTIONS = {
    quality: 0.9,
    cropperOptions: {
        viewMode: 1,
        background: false,
        autoCropArea: 1,
    },
};
const DASHBOARD_COMMON_OPTIONS = {
    plugins: ['ImageEditor'],
    proudlyDisplayPoweredByUppy: false,
    showProgressDetails: true,
    hideCancelButton: false,
    hideProgressAfterFinish: false,
};

type UppyWithPluginApi = Uppy & {
    getPlugin?: (pluginId: string) => unknown;
    destroy?: () => void;
    close?: () => void;
    cancelAll?: () => void;
};

const getDefaultUppy = (localeStrings?: Record<string, string>) => {
    const instance = new Uppy({
        autoProceed: false,
        restrictions: {
            maxNumberOfFiles: 1,
            allowedFileTypes: ['image/*'],
        },
        locale: localeStrings ? {strings: localeStrings} : undefined,
    });

    instance.use(ImageEditor as unknown, IMAGE_EDITOR_OPTIONS as unknown);

    return instance;
};

const ensureImageEditorPlugin = (uppy: Uppy) => {
    const uppyWithPluginApi = uppy as UppyWithPluginApi;
    const imageEditorPlugin = uppyWithPluginApi.getPlugin?.('ImageEditor');

    if (!imageEditorPlugin) {
        uppy.use(ImageEditor as unknown, IMAGE_EDITOR_OPTIONS as unknown);
    }
};

const normalizeError = (error: unknown): IImageUploadError => {
    if (error instanceof Error) {
        return {message: error.message, cause: error};
    }

    if (typeof error === 'string') {
        return {message: error};
    }

    return {message: 'Upload error', cause: error};
};

export const ImageUploadUppy: React.FC<IImageUploadUppyProps> = ({
    className,
    disabled,
    note = DEFAULT_NOTE,
    dashboardHeight = 360,
    viewMode = 'inline',
    openModalButtonText = DEFAULT_OPEN_MODAL_BUTTON_TEXT,
    showNativeUploadButton,
    adapter,
    onReady,
    onUploadStart,
    onProgress,
    onSuccess,
    onError,
    onFileRemove,
}) => {
    const [uploading, setUploading] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const strategy: UppyUploadStrategy = adapter?.uploadStrategy || 'manual';
    const isNativeUploadButtonVisible = strategy === 'manual' && (showNativeUploadButton ?? viewMode === 'modal');
    const adapterCreateUploader = adapter?.createUploader;
    const adapterLocaleStrings = adapter?.locale?.strings;
    const adapterPlugins = adapter?.plugins;
    const callbacksRef = useRef({
        onReady,
        onUploadStart,
        onProgress,
        onSuccess,
        onError,
        onFileRemove,
    });

    const uppy = useMemo(() => {
        const customUppy = adapterCreateUploader?.();
        if (customUppy) {
            return customUppy;
        }

        return getDefaultUppy(adapterLocaleStrings);
    }, [adapterCreateUploader, adapterLocaleStrings]);

    useEffect(() => {
        callbacksRef.current = {
            onReady,
            onUploadStart,
            onProgress,
            onSuccess,
            onError,
            onFileRemove,
        };
    }, [onError, onFileRemove, onProgress, onReady, onSuccess, onUploadStart]);

    useEffect(() => {
        ensureImageEditorPlugin(uppy);
        const pluginCleanups: ImageUploadPluginFactoryCleanup[] = [];
        adapterPlugins?.forEach((pluginFactory) => {
            const cleanup = pluginFactory({uppy});
            if (typeof cleanup === 'function') {
                pluginCleanups.push(cleanup);
            }
        });

        callbacksRef.current.onReady?.(uppy);

        const onUpload = () => {
            setUploading(true);
            callbacksRef.current.onUploadStart?.();
        };

        const onProgressEvent = (progress: number) => {
            callbacksRef.current.onProgress?.(progress);
        };

        const onUploadSuccess = (file: IImageUploadUppyFile, response: unknown) => {
            const result: IImageUploadResult = {
                fileId: file.id,
                fileName: file.name || file.id,
                mimeType: file.type,
                size: file.size,
                uploadURL: file.uploadURL,
                response,
            };

            if (file.preview) {
                setPreviewUrl(file.preview);
            }

            callbacksRef.current.onSuccess?.(result);
        };

        const onUploadError = (_file: IImageUploadUppyFile, error: unknown) => {
            callbacksRef.current.onError?.(normalizeError(error));
        };

        const onErrorEvent = (error: unknown) => {
            callbacksRef.current.onError?.(normalizeError(error));
        };

        const onFileRemoved = (file: IImageUploadUppyFile) => {
            callbacksRef.current.onFileRemove?.(file.id);
            setPreviewUrl('');
        };

        const onComplete = () => {
            setUploading(false);
        };

        uppy.on('upload', onUpload);
        uppy.on('progress', onProgressEvent);
        uppy.on('upload-success', onUploadSuccess);
        uppy.on('upload-error', onUploadError);
        uppy.on('error', onErrorEvent);
        uppy.on('file-removed', onFileRemoved);
        uppy.on('complete', onComplete);

        return () => {
            uppy.off('upload', onUpload);
            uppy.off('progress', onProgressEvent);
            uppy.off('upload-success', onUploadSuccess);
            uppy.off('upload-error', onUploadError);
            uppy.off('error', onErrorEvent);
            uppy.off('file-removed', onFileRemoved);
            uppy.off('complete', onComplete);
            pluginCleanups.forEach((cleanup) => cleanup());
        };
    }, [adapterPlugins, uppy]);

    useEffect(() => {
        const uppyWithPluginApi = uppy as UppyWithPluginApi;
        return () => {
            uppyWithPluginApi.destroy?.();
            uppyWithPluginApi.close?.();
        };
    }, [uppy]);

    useEffect(() => {
        if (viewMode !== 'modal' && isModalOpen) {
            setModalOpen(false);
        }
    }, [isModalOpen, viewMode]);

    const controlsNode = strategy === 'manual' && !isNativeUploadButtonVisible && (
        <>
            <Brick size={1} />
            <Button
                variant={ButtonVariant.secondary}
                disabled={uploading || disabled}
                onClick={() => uppy.upload()}
                label={uploading ? 'Загрузка...' : 'Загрузить изображение'}
            />
        </>
    );

    const onDoneClick = () => {
        const uppyWithPluginApi = uppy as UppyWithPluginApi;
        uppyWithPluginApi.cancelAll?.();

        if (viewMode === 'modal') {
            setModalOpen(false);
        }
    };

    return (
        <div className={cnImageUploadUppy({disabled}, [className])}>
            {viewMode === 'inline' && (
                <>
                    <Dashboard
                        uppy={uppy}
                        {...DASHBOARD_COMMON_OPTIONS}
                        height={dashboardHeight}
                        note={note}
                        hideUploadButton={!isNativeUploadButtonVisible}
                        doneButtonHandler={onDoneClick}
                        disabled={disabled}
                    />
                    {controlsNode}
                </>
            )}
            {viewMode === 'modal' && (
                <>
                    <Button
                        variant={ButtonVariant.secondary}
                        disabled={disabled}
                        onClick={() => {
                            setModalOpen(true);
                        }}
                        label={openModalButtonText}
                    />
                    <DashboardModal
                        uppy={uppy}
                        {...DASHBOARD_COMMON_OPTIONS}
                        open={isModalOpen}
                        onRequestClose={() => setModalOpen(false)}
                        note={note}
                        hideUploadButton={!isNativeUploadButtonVisible}
                        doneButtonHandler={onDoneClick}
                        closeModalOnClickOutside={true}
                        disabled={disabled}
                    />
                </>
            )}
            {previewUrl && (
                <>
                    <Brick size={1} />
                    <Typography.Small noPadding>Предпросмотр:</Typography.Small>
                    <Brick size={0.5} />
                    <img src={previewUrl} alt="Uploaded" className="c-image-upload-uppy__preview" />
                </>
            )}
        </div>
    );
};
