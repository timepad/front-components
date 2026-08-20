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
    IFileUploaderUploadResult,
    IFileUploaderFile,
    IFileUploaderTriggerRenderProps,
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
        return {destroy: mountResult};
    }

    return mountResult || {};
};

const destroyMountHandle = (mountHandle: IFileUploaderDriverMountHandle | null | undefined) => {
    mountHandle?.destroy?.();
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

const createUploadResult = (file: IFileUploaderFile, response: unknown): IFileUploaderUploadResult => {
    return {
        fileId: file.id,
        fileName: file.name || file.id,
        mimeType: file.type,
        size: file.size,
        uploadURL: file.uploadURL,
        previewURL: file.preview,
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

type DriverMountMode = 'inline' | 'modal';

interface IUseFileUploaderDriverMountOptions {
    container: HTMLDivElement | null;
    driver: IFileUploaderDriver;
    active: boolean;
    mode: DriverMountMode;
    mountOptions: IFileUploaderDriverMountOptions;
    onUnsupportedMode: (mode: DriverMountMode) => void;
}

const useFileUploaderDriverMount = ({
    container,
    driver,
    active,
    mode,
    mountOptions,
    onUnsupportedMode,
}: IUseFileUploaderDriverMountOptions): React.MutableRefObject<IFileUploaderDriverMountHandle | null> => {
    const mountHandleRef = useRef<IFileUploaderDriverMountHandle | null>(null);
    const mountOptionsRef = useRef(mountOptions);

    useEffect(() => {
        mountOptionsRef.current = mountOptions;
        mountHandleRef.current?.setOptions?.(mountOptions);
    }, [mountOptions]);

    useEffect(() => {
        if (!active) {
            return;
        }

        if (!container) {
            return;
        }

        const mount = mode === 'inline' ? driver.mountInline : driver.mountModal;
        if (!mount) {
            onUnsupportedMode(mode);
            return;
        }

        const mountHandle = normalizeMountHandle(mount(container, mountOptionsRef.current));
        mountHandleRef.current = mountHandle;

        return () => {
            if (mountHandleRef.current === mountHandle) {
                mountHandleRef.current = null;
            }

            destroyMountHandle(mountHandle);
        };
    }, [active, container, driver, mode, onUnsupportedMode]);

    return mountHandleRef;
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
 *     modalProvider="library"
 *     modalTitle="Загрузка файла"
 *     uploadMode="manual"
 *     onUploadSuccess={(result) => saveFile(result)}
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
    contentHeight = 360,
    viewMode = 'inline',
    modalProvider = 'driver',
    modalTitle = DEFAULT_MODAL_TITLE,
    modalDescription,
    modalProps,
    openModalButtonText = DEFAULT_OPEN_MODAL_BUTTON_TEXT,
    uploadButtonText = DEFAULT_UPLOAD_BUTTON_TEXT,
    uploadButtonVariant = ButtonVariant.primary,
    uploadButtonFixed = true,
    uploadButtonLarge = true,
    showDriverUploadButton,
    uploadMode = 'manual',
    driver,
    destroyDriverOnUnmount = false,
    onReady,
    onUploadStart,
    onProgress,
    onUploadSuccess,
    onError,
    onFileRemoved,
}) => {
    const callbacks = useMemo(
        () => ({onReady, onUploadStart, onProgress, onUploadSuccess, onError, onFileRemoved}),
        [onError, onFileRemoved, onProgress, onReady, onUploadStart, onUploadSuccess],
    );
    const [uploading, setUploading] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const isModalViewMode = viewMode === 'modal';
    const usesDriverModal = isModalViewMode && modalProvider === 'driver';
    const usesLibraryModal = isModalViewMode && modalProvider === 'library';
    const shouldMountInline = viewMode === 'inline' || (usesLibraryModal && isModalOpen);
    const isDriverUploadButtonVisible = uploadMode === 'manual' && (showDriverUploadButton ?? usesDriverModal);

    const [inlineContainer, setInlineContainer] = useState<HTMLDivElement | null>(null);
    const [modalContainer, setModalContainer] = useState<HTMLDivElement | null>(null);
    const activeUploadsCountRef = useRef<number>(0);
    const unsupportedModeReportedRef = useRef<{inline: boolean; modal: boolean}>({inline: false, modal: false});
    const callbacksRef = useRef(callbacks);

    useEffect(() => {
        callbacksRef.current = callbacks;
    }, [callbacks]);

    useEffect(() => {
        unsupportedModeReportedRef.current = {inline: false, modal: false};
        activeUploadsCountRef.current = 0;
        setUploading(false);
    }, [driver, modalProvider]);

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

    const reportUnsupportedDriverMode = useCallback((mode: 'inline' | 'modal') => {
        if (unsupportedModeReportedRef.current[mode]) {
            return;
        }

        unsupportedModeReportedRef.current[mode] = true;
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
            callbacksRef.current.onUploadSuccess?.(createUploadResult(file, response));
        };

        const onErrorEvent = (error: unknown) => {
            callbacksRef.current.onError?.(normalizeError(error));
        };

        const onUploadErrorEvent = (_file: IFileUploaderFile | undefined, error: unknown) => {
            onErrorEvent(error);
        };

        const onFileRemovedEvent = (file: IFileUploaderFile) => {
            callbacksRef.current.onFileRemoved?.(file.id);
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

    const handleModalRequestClose = useCallback(() => {
        setModalOpen(false);
    }, []);

    const openModal = useCallback(() => {
        if (disabled) {
            return;
        }

        setModalOpen(true);
    }, [disabled]);

    const handleDone = useCallback(() => {
        driver.cancelAll?.();
        resetUploadSessions();

        if (viewMode === 'modal') {
            setModalOpen(false);
        }
    }, [driver, resetUploadSessions, viewMode]);

    const renderModalTrigger = useCallback(() => {
        const triggerProps: IFileUploaderTriggerRenderProps = {
            disabled,
            open: openModal,
            uploading,
        };

        if (children) {
            return children(triggerProps);
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
            contentHeight,
            disabled,
            showDriverUploadButton: isDriverUploadButtonVisible,
            onDone: handleDone,
            onRequestClose: handleModalRequestClose,
        };
    }, [contentHeight, disabled, handleDone, handleModalRequestClose, isDriverUploadButtonVisible, note]);

    useFileUploaderDriverMount({
        container: inlineContainer,
        driver,
        active: shouldMountInline,
        mode: 'inline',
        mountOptions,
        onUnsupportedMode: reportUnsupportedDriverMode,
    });
    const modalMountHandleRef = useFileUploaderDriverMount({
        container: modalContainer,
        driver,
        active: usesDriverModal,
        mode: 'modal',
        mountOptions,
        onUnsupportedMode: reportUnsupportedDriverMode,
    });

    useEffect(() => {
        if (viewMode !== 'modal' && isModalOpen) {
            setModalOpen(false);
        }
    }, [isModalOpen, viewMode]);

    useEffect(() => {
        const mountHandle = modalMountHandleRef.current;
        if (!mountHandle || !usesDriverModal) {
            return;
        }

        if (isModalOpen) {
            mountHandle.open?.();
            return;
        }

        mountHandle.close?.();
    }, [isModalOpen, modalMountHandleRef, usesDriverModal]);

    useEffect(() => {
        return () => {
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

    const uploadButtonNode = uploadMode === 'manual' && !isDriverUploadButtonVisible && (
        <Button
            variant={uploadButtonVariant}
            fixed={uploadButtonFixed}
            large={uploadButtonLarge}
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
                onClose={handleModalRequestClose}
                className={cx(cnFileUploaderLibraryModal(), modalClassName)}
            >
                <Modal.Header closeHandler={handleModalRequestClose}>
                    {modalTitle && <Modal.Title>{modalTitle}</Modal.Title>}
                    {modalDescription && <Modal.Description>{modalDescription}</Modal.Description>}
                </Modal.Header>
                <Modal.Body>
                    <div ref={setInlineContainer} />
                </Modal.Body>
                {uploadButtonNode && <Modal.Footer>{uploadButtonNode}</Modal.Footer>}
            </Modal>
        );
    };

    return (
        <div className={cx(cnFileUploader({disabled}), className)}>
            {viewMode === 'inline' && (
                <>
                    <div ref={setInlineContainer} />
                    {controlsNode}
                </>
            )}

            {isModalViewMode && renderModalTrigger()}

            {usesDriverModal && <div ref={setModalContainer} />}

            {usesLibraryModal && renderLibraryModal()}
        </div>
    );
};
