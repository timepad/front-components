import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import cx from 'classnames';

import './index.less';

import {component} from '../../services/helpers/classHelpers';
import {Button, ButtonVariant} from '../button';
import {Brick} from '../brick';
import {
    IFileUploaderDriver,
    IFileUploaderDriverEventMap,
    IFileUploaderDriverMountHandle,
    IFileUploaderDriverMountOptions,
    IFileUploaderError,
    IFileUploaderResult,
    IFileUploaderFile,
    IFileUploaderModalTriggerOptions,
    IFileUploaderProps,
} from './FileUploader.types';

const DEFAULT_NOTE = 'Выберите файл для загрузки';
const DEFAULT_OPEN_MODAL_BUTTON_TEXT = 'Открыть загрузчик';
const DEFAULT_UPLOAD_BUTTON_TEXT = 'Загрузить файл';
const cnFileUploader = component('file-uploader');

const normalizeMountHandle = (
    mountResult: void | (() => void) | IFileUploaderDriverMountHandle,
): IFileUploaderDriverMountHandle => {
    if (typeof mountResult === 'function') {
        return {cleanup: mountResult};
    }

    return mountResult || {};
};

const destroyMountHandle = (mountHandle: IFileUploaderDriverMountHandle | null | undefined) => {
    if (!mountHandle) {
        return;
    }

    if (mountHandle.destroy) {
        mountHandle.destroy();
        return;
    }

    mountHandle.cleanup?.();
};

const normalizeError = (error: unknown): IFileUploaderError => {
    if (error instanceof Error) {
        return {message: error.message, cause: error};
    }

    if (typeof error === 'string') {
        return {message: error};
    }

    return {message: 'Upload error', cause: error};
};

const createResult = (file: IFileUploaderFile, response: unknown): IFileUploaderResult => {
    return {
        fileId: file.id,
        fileName: file.name || file.id,
        mimeType: file.type,
        size: file.size,
        uploadURL: file.uploadURL,
        response,
    };
};

const subscribeDriverEvent = <K extends keyof IFileUploaderDriverEventMap>(
    driver: IFileUploaderDriver,
    eventName: K,
    callback: IFileUploaderDriverEventMap[K],
): (() => void) => {
    const unsubscribe = driver.on?.(eventName, callback);

    if (typeof unsubscribe === 'function') {
        return unsubscribe;
    }

    if (driver.off) {
        return () => {
            driver.off?.(eventName, callback);
        };
    }

    return () => undefined;
};

/**
 * Абстрактная оболочка для загрузчика файлов.
 *
 * Компонент отвечает за layout, inline/modal режимы, внешнюю кнопку загрузки и нормализацию callbacks.
 * Конкретная uploader-библиотека подключается через `driver`, поэтому в проектах можно использовать разные
 * версии Uppy или другой upload UI без изменения `FileUploader`.
 *
 * @example
 * <FileUploader
 *     driver={driver}
 *     viewMode="modal"
 *     uploadStrategy="manual"
 *     onSuccess={(result) => saveFile(result)}
 * >
 *     {({disabled, open, uploading}) => (
 *         <Button disabled={disabled || uploading} onClick={open} label="Добавить файл" />
 *     )}
 * </FileUploader>
 */
export const FileUploader: React.FC<IFileUploaderProps> = ({
    className,
    children,
    disabled,
    note = DEFAULT_NOTE,
    dashboardHeight = 360,
    viewMode = 'inline',
    openModalButtonText = DEFAULT_OPEN_MODAL_BUTTON_TEXT,
    uploadButtonText = DEFAULT_UPLOAD_BUTTON_TEXT,
    showNativeUploadButton,
    uploadStrategy = 'manual',
    driver,
    destroyDriverOnUnmount = false,
    onReady,
    onUploadStart,
    onProgress,
    onSuccess,
    onError,
    onFileRemove,
}) => {
    const [uploading, setUploading] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const isNativeUploadButtonVisible = uploadStrategy === 'manual' && (showNativeUploadButton ?? viewMode === 'modal');

    const inlineContainerRef = useRef<HTMLDivElement | null>(null);
    const inlineMountHandleRef = useRef<IFileUploaderDriverMountHandle | null>(null);
    const modalContainerRef = useRef<HTMLDivElement | null>(null);
    const modalMountHandleRef = useRef<IFileUploaderDriverMountHandle | null>(null);
    const activeUploadsCountRef = useRef<number>(0);
    const mountOptionsRef = useRef<IFileUploaderDriverMountOptions | null>(null);
    const missingMountMethodReportedRef = useRef<{inline: boolean; modal: boolean}>({inline: false, modal: false});
    const callbacksRef = useRef({
        onReady,
        onUploadStart,
        onProgress,
        onSuccess,
        onError,
        onFileRemove,
    });

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
        missingMountMethodReportedRef.current = {inline: false, modal: false};
        activeUploadsCountRef.current = 0;
        setUploading(false);
    }, [driver]);

    const startUploadSession = useCallback(() => {
        activeUploadsCountRef.current += 1;
        setUploading(true);
    }, []);

    const finishUploadSession = useCallback(() => {
        activeUploadsCountRef.current = Math.max(0, activeUploadsCountRef.current - 1);
        setUploading(activeUploadsCountRef.current > 0);
    }, []);

    const resetUploadSessions = useCallback(() => {
        activeUploadsCountRef.current = 0;
        setUploading(false);
    }, []);

    const reportDriverConfigurationError = useCallback((mode: 'inline' | 'modal') => {
        if (missingMountMethodReportedRef.current[mode]) {
            return;
        }

        missingMountMethodReportedRef.current[mode] = true;
        const message = `FileUploader driver must implement mount${
            mode === 'inline' ? 'Inline' : 'Modal'
        } for viewMode="${mode}"`;

        callbacksRef.current.onError?.({message});
        // eslint-disable-next-line no-console
        console.error(message);
    }, []);

    useEffect(() => {
        callbacksRef.current.onReady?.(driver);
    }, [driver]);

    useEffect(() => {
        const onUploadStartEvent = () => {
            startUploadSession();
            callbacksRef.current.onUploadStart?.();
        };

        const onProgressEvent = (progress: number) => {
            callbacksRef.current.onProgress?.(progress);
        };

        const onUploadSuccessEvent = (file: IFileUploaderFile, response?: unknown) => {
            callbacksRef.current.onSuccess?.(createResult(file, response));
        };

        const onUploadErrorEvent = (_file: IFileUploaderFile | undefined, error: unknown) => {
            callbacksRef.current.onError?.(normalizeError(error));
        };

        const onErrorEvent = (error: unknown) => {
            callbacksRef.current.onError?.(normalizeError(error));
        };

        const onFileRemovedEvent = (file: IFileUploaderFile) => {
            callbacksRef.current.onFileRemove?.(file.id);
        };

        const onCompleteEvent = () => {
            finishUploadSession();
        };

        const unsubs = [
            subscribeDriverEvent(driver, 'upload-start', onUploadStartEvent),
            subscribeDriverEvent(driver, 'progress', onProgressEvent),
            subscribeDriverEvent(driver, 'upload-success', onUploadSuccessEvent),
            subscribeDriverEvent(driver, 'upload-error', onUploadErrorEvent),
            subscribeDriverEvent(driver, 'error', onErrorEvent),
            subscribeDriverEvent(driver, 'file-removed', onFileRemovedEvent),
            subscribeDriverEvent(driver, 'complete', onCompleteEvent),
        ];

        return () => {
            unsubs.forEach((unsubscribe) => unsubscribe());
        };
    }, [driver, finishUploadSession, startUploadSession]);

    const onModalRequestClose = useCallback(() => {
        setModalOpen(false);
    }, []);

    const openModal = useCallback(() => {
        if (disabled) {
            return;
        }

        setModalOpen(true);
    }, [disabled]);

    const onDoneClick = useCallback(() => {
        driver.cancelAll?.();
        resetUploadSessions();

        if (viewMode === 'modal') {
            setModalOpen(false);
        }
    }, [driver, resetUploadSessions, viewMode]);

    const renderModalTrigger = useCallback(() => {
        const triggerOptions: IFileUploaderModalTriggerOptions = {
            disabled,
            open: openModal,
            uploading,
        };

        if (children) {
            return children(triggerOptions);
        }

        return (
            <Button
                variant={ButtonVariant.secondary}
                disabled={disabled}
                onClick={openModal}
                label={openModalButtonText}
            />
        );
    }, [children, disabled, openModal, openModalButtonText, uploading]);

    const mountOptions = useMemo(() => {
        return {
            note,
            dashboardHeight,
            disabled,
            showNativeUploadButton: isNativeUploadButtonVisible,
            doneButtonHandler: onDoneClick,
            onRequestClose: onModalRequestClose,
        };
    }, [dashboardHeight, disabled, isNativeUploadButtonVisible, note, onDoneClick, onModalRequestClose]);

    useEffect(() => {
        mountOptionsRef.current = mountOptions;
    }, [mountOptions]);

    useEffect(() => {
        if (viewMode !== 'inline') {
            destroyMountHandle(inlineMountHandleRef.current);
            inlineMountHandleRef.current = null;
            return;
        }

        const container = inlineContainerRef.current;
        if (!container) {
            return;
        }

        if (!driver.mountInline) {
            reportDriverConfigurationError('inline');
            return;
        }

        const currentMountOptions = mountOptionsRef.current;
        if (!currentMountOptions) {
            return;
        }
        const mountHandle = normalizeMountHandle(driver.mountInline(container, currentMountOptions));
        inlineMountHandleRef.current = mountHandle;

        return () => {
            if (inlineMountHandleRef.current === mountHandle) {
                inlineMountHandleRef.current = null;
            }
            destroyMountHandle(mountHandle);
        };
    }, [driver, reportDriverConfigurationError, viewMode]);

    useEffect(() => {
        if (viewMode !== 'modal') {
            destroyMountHandle(modalMountHandleRef.current);
            modalMountHandleRef.current = null;
            return;
        }

        const container = modalContainerRef.current;
        if (!container) {
            return;
        }

        if (!driver.mountModal) {
            reportDriverConfigurationError('modal');
            return;
        }

        const currentMountOptions = mountOptionsRef.current;
        if (!currentMountOptions) {
            return;
        }
        const mountHandle = normalizeMountHandle(driver.mountModal(container, currentMountOptions));
        modalMountHandleRef.current = mountHandle;

        return () => {
            if (modalMountHandleRef.current === mountHandle) {
                modalMountHandleRef.current = null;
            }

            destroyMountHandle(mountHandle);
        };
    }, [driver, reportDriverConfigurationError, viewMode]);

    useEffect(() => {
        if (viewMode === 'inline') {
            inlineMountHandleRef.current?.setOptions?.(mountOptions);
            return;
        }

        if (viewMode === 'modal') {
            modalMountHandleRef.current?.setOptions?.(mountOptions);
        }
    }, [mountOptions, viewMode]);

    useEffect(() => {
        if (viewMode !== 'modal' && isModalOpen) {
            setModalOpen(false);
        }
    }, [isModalOpen, viewMode]);

    useEffect(() => {
        const mountHandle = modalMountHandleRef.current;
        if (!mountHandle || viewMode !== 'modal') {
            return;
        }

        if (isModalOpen) {
            mountHandle.open?.();
            return;
        }

        mountHandle.close?.();
    }, [isModalOpen, viewMode]);

    useEffect(() => {
        return () => {
            destroyMountHandle(inlineMountHandleRef.current);
            inlineMountHandleRef.current = null;
            destroyMountHandle(modalMountHandleRef.current);
            modalMountHandleRef.current = null;

            if (destroyDriverOnUnmount) {
                driver.destroy?.();
            }
        };
    }, [destroyDriverOnUnmount, driver]);

    const handleManualUpload = useCallback(async () => {
        if (!driver.upload) {
            callbacksRef.current.onError?.({message: 'Upload method is not configured in driver'});
            return;
        }

        try {
            await driver.upload();
        } catch (error) {
            resetUploadSessions();
            callbacksRef.current.onError?.(normalizeError(error));
        }
    }, [driver, resetUploadSessions]);

    const controlsNode = uploadStrategy === 'manual' && !isNativeUploadButtonVisible && (
        <>
            <Brick size={1} />
            <Button
                variant={ButtonVariant.secondary}
                disabled={uploading || disabled}
                onClick={handleManualUpload}
                label={uploading ? 'Загрузка...' : uploadButtonText}
            />
        </>
    );

    return (
        <div className={cx(cnFileUploader({disabled}), className)}>
            {viewMode === 'inline' && (
                <>
                    <div ref={inlineContainerRef} />
                    {controlsNode}
                </>
            )}

            {viewMode === 'modal' && (
                <>
                    {renderModalTrigger()}
                    <div ref={modalContainerRef} />
                </>
            )}
        </div>
    );
};
