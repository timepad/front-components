import React, {useEffect, useMemo, useState} from 'react';
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

    instance.use(
        ImageEditor as any,
        IMAGE_EDITOR_OPTIONS as any,
    );

    return instance;
};

const ensureImageEditorPlugin = (uppy: Uppy) => {
    const imageEditorPlugin = (uppy as any).getPlugin?.('ImageEditor');

    if (!imageEditorPlugin) {
        uppy.use(ImageEditor as any, IMAGE_EDITOR_OPTIONS as any);
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

    const uppy = useMemo(() => {
        const customUppy = adapter?.createUploader?.();
        if (customUppy) {
            return customUppy;
        }

        return getDefaultUppy(adapter?.locale?.strings);
    }, [adapter]);

    useEffect(() => {
        ensureImageEditorPlugin(uppy);
        adapter?.plugins?.forEach((pluginFactory) => pluginFactory({uppy}));

        onReady?.(uppy);

        uppy.on('upload', () => {
            setUploading(true);
            onUploadStart?.();
        });

        uppy.on('progress', (progress: number) => {
            onProgress?.(progress);
        });

        uppy.on('upload-success', (file: any, response: any) => {
            const result: IImageUploadResult = {
                fileId: file?.id,
                fileName: file?.name,
                mimeType: file?.type,
                size: file?.size,
                uploadURL: file?.uploadURL,
                response,
            };

            if (file?.preview) {
                setPreviewUrl(file.preview);
            }

            onSuccess?.(result);
        });

        uppy.on('upload-error', (_file: any, error: unknown) => {
            onError?.(normalizeError(error));
        });

        uppy.on('error', (error: unknown) => {
            onError?.(normalizeError(error));
        });

        uppy.on('file-removed', (file: any) => {
            onFileRemove?.(file?.id);
            setPreviewUrl('');
        });

        uppy.on('complete', () => {
            setUploading(false);
        });
    }, [adapter?.plugins, onError, onFileRemove, onProgress, onReady, onSuccess, onUploadStart, uppy]);

    useEffect(() => {
        return () => {
            (uppy as any).destroy?.();
            (uppy as any).close?.();
        };
    }, [uppy]);

    const controlsNode = strategy === 'manual' && (
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

    return (
        <div className={cnImageUploadUppy({disabled}, [className])}>
            {viewMode === 'inline' && (
                <>
                    <Dashboard
                        uppy={uppy as any}
                        {...(DASHBOARD_COMMON_OPTIONS as any)}
                        height={dashboardHeight}
                        note={note}
                        hideUploadButton={strategy === 'auto'}
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
                        uppy={uppy as any}
                        {...(DASHBOARD_COMMON_OPTIONS as any)}
                        open={isModalOpen}
                        onRequestClose={() => setModalOpen(false)}
                        note={note}
                        hideUploadButton={strategy === 'auto'}
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
