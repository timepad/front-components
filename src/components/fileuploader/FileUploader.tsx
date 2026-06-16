import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import cx from 'classnames';

import './index.less';

import {component} from '../../services/helpers/classHelpers';
import {Button, ButtonVariant} from '../button';
import {Brick} from '../brick';
import {Modal} from '../modal';
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
const DEFAULT_MODAL_TITLE = 'Загрузка файла';
const cnFileUploader = component('file-uploader');
const cnFileUploaderLibraryModal = component('file-uploader', 'library-modal');

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
 *     modalRenderer="library"
 *     modalTitle="Загрузка файла"
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
    modalRenderer = 'driver',
    modalTitle = DEFAULT_MODAL_TITLE,
    modalDescription,
    modalProps,
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
    const isModalViewMode = viewMode === 'modal';
    const isDriverModalMode = isModalViewMode && modalRenderer === 'driver';
    const isLibraryModalMode = isModalViewMode && modalRenderer === 'library';
    const shouldMountInline = viewMode === 'inline' || (isLibraryModalMode && isModalOpen);
    const isNativeUploadButtonVisible = uploadStrategy === 'manual' && (showNativeUploadButton ?? isDriverModalMode);

    const [inlineContainerElement, setInlineContainerElement] = useState<HTMLDivElement | null>(null);
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
    }, [driver, modalRenderer]);

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

    const setInlineContainerRef = useCallback((element: HTMLDivElement | null) => {
        setInlineContainerElement(element);
    }, []);

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
        if (!shouldMountInline) {
            destroyMountHandle(inlineMountHandleRef.current);
            inlineMountHandleRef.current = null;
            return;
        }

        const container = inlineContainerElement;
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
    }, [driver, inlineContainerElement, reportDriverConfigurationError, shouldMountInline]);

    useEffect(() => {
        if (!isDriverModalMode) {
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
    }, [driver, isDriverModalMode, reportDriverConfigurationError]);

    useEffect(() => {
        if (viewMode === 'inline' || isLibraryModalMode) {
            inlineMountHandleRef.current?.setOptions?.(mountOptions);
            return;
        }

        if (isDriverModalMode) {
            modalMountHandleRef.current?.setOptions?.(mountOptions);
        }
    }, [isDriverModalMode, isLibraryModalMode, mountOptions, viewMode]);

    useEffect(() => {
        if (viewMode !== 'modal' && isModalOpen) {
            setModalOpen(false);
        }
    }, [isModalOpen, viewMode]);

    useEffect(() => {
        const mountHandle = modalMountHandleRef.current;
        if (!mountHandle || !isDriverModalMode) {
            return;
        }

        if (isModalOpen) {
            mountHandle.open?.();
            return;
        }

        mountHandle.close?.();
    }, [isDriverModalMode, isModalOpen]);

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

    const uploadButtonNode = uploadStrategy === 'manual' && !isNativeUploadButtonVisible && (
        <Button
            variant={ButtonVariant.primary}
            fixed
            large
            disabled={uploading || disabled}
            onClick={handleManualUpload}
            label={uploading ? 'Загрузка...' : uploadButtonText}
        />
    );

    const controlsNode = uploadButtonNode && (
        <>
            <Brick size={1} />
            {uploadButtonNode}
        </>
    );

    const renderLibraryModal = () => {
        const {className: modalClassName, ...restModalProps} = modalProps || {};

        return (
            <Modal
                {...restModalProps}
                isOpen={isModalOpen}
                onClose={onModalRequestClose}
                className={cx(cnFileUploaderLibraryModal(), modalClassName)}
            >
                <Modal.Header closeHandler={onModalRequestClose}>
                    {modalTitle && <Modal.Title>{modalTitle}</Modal.Title>}
                    {modalDescription && <Modal.Description>{modalDescription}</Modal.Description>}
                </Modal.Header>
                <Modal.Body>
                    <div ref={setInlineContainerRef} />
                </Modal.Body>
                {uploadButtonNode && <Modal.Footer>{uploadButtonNode}</Modal.Footer>}
            </Modal>
        );
    };

    return (
        <div className={cx(cnFileUploader({disabled}), className)}>
            {viewMode === 'inline' && (
                <>
                    <div ref={setInlineContainerRef} />
                    {controlsNode}
                </>
            )}

            {isDriverModalMode && (
                <>
                    {renderModalTrigger()}
                    <div ref={modalContainerRef} />
                </>
            )}

            {isLibraryModalMode && (
                <>
                    {renderModalTrigger()}
                    {renderLibraryModal()}
                </>
            )}
        </div>
    );
};
