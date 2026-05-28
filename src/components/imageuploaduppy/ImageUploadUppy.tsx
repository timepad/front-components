import React, {useEffect, useMemo, useState} from 'react';
import cx from 'classnames';
import Uppy from '@uppy/core/lib/index.js';
import Dashboard from '@uppy/dashboard';
import ImageEditor from '@uppy/image-editor/lib/index.js';
import DashboardModal from '@uppy/react/lib/DashboardModal.js';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';

import './index.less';

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
        {
            quality: 0.9,
            cropperOptions: {
                viewMode: 1,
                background: false,
                autoCropArea: 1,
            },
        } as any,
    );

    return instance;
};

const ensureImageEditorPlugin = (uppy: Uppy) => {
    const imageEditorPlugin = (uppy as any).getPlugin?.('ImageEditor');

    if (!imageEditorPlugin) {
        uppy.use(
            ImageEditor as any,
            {
                quality: 0.9,
                cropperOptions: {
                    viewMode: 1,
                    background: false,
                    autoCropArea: 1,
                },
            } as any,
        );
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

    const [dashboardHost, setDashboardHost] = useState<HTMLDivElement | null>(null);
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
        if (viewMode !== 'inline' || !dashboardHost) {
            return;
        }

        uppy.use(
            Dashboard as any,
            {
                target: dashboardHost,
                inline: true,
                plugins: ['ImageEditor'],
                height: dashboardHeight,
                proudlyDisplayPoweredByUppy: false,
                showProgressDetails: true,
                hideCancelButton: false,
                note,
                hideUploadButton: strategy === 'auto',
            } as any,
        );
    }, [dashboardHeight, dashboardHost, note, strategy, uppy, viewMode]);

    useEffect(() => {
        return () => {
            (uppy as any).destroy?.();
            (uppy as any).close?.();
        };
    }, [uppy]);

    const dashboardNode = (
        <div
            ref={(node) => {
                setDashboardHost((prev) => (prev === node ? prev : node));
            }}
        />
    );

    const controlsNode = strategy === 'manual' && (
        <>
            <Brick size={1} />
            <button
                className="c-button c-button--secondary"
                disabled={uploading || disabled}
                onClick={() => uppy.upload()}
                type="button"
            >
                {uploading ? 'Загрузка...' : 'Загрузить изображение'}
            </button>
        </>
    );

    return (
        <div className={cx('c-image-upload-uppy', className, {'c-image-upload-uppy--disabled': disabled})}>
            {viewMode === 'inline' && (
                <>
                    {dashboardNode}
                    {controlsNode}
                </>
            )}
            {viewMode === 'modal' && (
                <>
                    <button
                        className="c-button c-button--secondary"
                        disabled={disabled}
                        onClick={() => setModalOpen(true)}
                        type="button"
                    >
                        {openModalButtonText}
                    </button>
                    <DashboardModal
                        uppy={uppy as any}
                        open={isModalOpen}
                        onRequestClose={() => setModalOpen(false)}
                        plugins={['ImageEditor'] as any}
                        proudlyDisplayPoweredByUppy={false}
                        showProgressDetails={true}
                        hideCancelButton={false}
                        note={note}
                        hideUploadButton={strategy === 'auto'}
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
