import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import cx from 'classnames';

import './index.less';

import {component} from '../../services/helpers/classHelpers';
import {Button, ButtonVariant} from '../button';
import {Brick} from '../brick';
import {
    IImageUploaderDriver,
    IImageUploaderDriverEventMap,
    IImageUploaderDriverMountHandle,
    IImageUploaderDriverMountOptions,
    IImageUploaderError,
    IImageUploaderResult,
    IImageUploaderFile,
    IImageUploaderProps,
} from './ImageUploader.types';

const DEFAULT_NOTE = 'Выберите изображение и при необходимости обрежьте его через Edit';
const DEFAULT_OPEN_MODAL_BUTTON_TEXT = 'Открыть загрузчик';
const cnImageUploader = component('image-uploader');

const normalizeMountHandle = (
    mountResult: void | (() => void) | IImageUploaderDriverMountHandle,
): IImageUploaderDriverMountHandle => {
    if (typeof mountResult === 'function') {
        return {cleanup: mountResult};
    }

    return mountResult || {};
};

const destroyMountHandle = (mountHandle: IImageUploaderDriverMountHandle | null | undefined) => {
    if (!mountHandle) {
        return;
    }

    if (mountHandle.destroy) {
        mountHandle.destroy();
        return;
    }

    mountHandle.cleanup?.();
};

const normalizeError = (error: unknown): IImageUploaderError => {
    if (error instanceof Error) {
        return {message: error.message, cause: error};
    }

    if (typeof error === 'string') {
        return {message: error};
    }

    return {message: 'Upload error', cause: error};
};

const createResult = (file: IImageUploaderFile, response: unknown): IImageUploaderResult => {
    return {
        fileId: file.id,
        fileName: file.name || file.id,
        mimeType: file.type,
        size: file.size,
        uploadURL: file.uploadURL,
        response,
    };
};

const subscribeDriverEvent = <K extends keyof IImageUploaderDriverEventMap>(
    driver: IImageUploaderDriver,
    eventName: K,
    callback: IImageUploaderDriverEventMap[K],
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

export const ImageUploader: React.FC<IImageUploaderProps> = ({
    className,
    disabled,
    note = DEFAULT_NOTE,
    dashboardHeight = 360,
    viewMode = 'inline',
    openModalButtonText = DEFAULT_OPEN_MODAL_BUTTON_TEXT,
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
    const inlineMountHandleRef = useRef<IImageUploaderDriverMountHandle | null>(null);
    const modalContainerRef = useRef<HTMLDivElement | null>(null);
    const modalMountHandleRef = useRef<IImageUploaderDriverMountHandle | null>(null);
    const mountOptionsRef = useRef<IImageUploaderDriverMountOptions | null>(null);
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
    }, [driver]);

    const reportDriverConfigurationError = useCallback((mode: 'inline' | 'modal') => {
        if (missingMountMethodReportedRef.current[mode]) {
            return;
        }

        missingMountMethodReportedRef.current[mode] = true;
        const message = `ImageUploader driver must implement mount${
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
            setUploading(true);
            callbacksRef.current.onUploadStart?.();
        };

        const onProgressEvent = (progress: number) => {
            callbacksRef.current.onProgress?.(progress);
        };

        const onUploadSuccessEvent = (file: IImageUploaderFile, response?: unknown) => {
            callbacksRef.current.onSuccess?.(createResult(file, response));
        };

        const onUploadErrorEvent = (_file: IImageUploaderFile | undefined, error: unknown) => {
            setUploading(false);
            callbacksRef.current.onError?.(normalizeError(error));
        };

        const onErrorEvent = (error: unknown) => {
            setUploading(false);
            callbacksRef.current.onError?.(normalizeError(error));
        };

        const onFileRemovedEvent = (file: IImageUploaderFile) => {
            callbacksRef.current.onFileRemove?.(file.id);
        };

        const onCompleteEvent = () => {
            setUploading(false);
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
    }, [driver]);

    const onModalRequestClose = useCallback(() => {
        setModalOpen(false);
    }, []);

    const onDoneClick = useCallback(() => {
        driver.cancelAll?.();
        setUploading(false);

        if (viewMode === 'modal') {
            setModalOpen(false);
        }
    }, [driver, viewMode]);

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
            setUploading(false);
            callbacksRef.current.onError?.(normalizeError(error));
        }
    }, [driver]);

    const controlsNode = uploadStrategy === 'manual' && !isNativeUploadButtonVisible && (
        <>
            <Brick size={1} />
            <Button
                variant={ButtonVariant.secondary}
                disabled={uploading || disabled}
                onClick={handleManualUpload}
                label={uploading ? 'Загрузка...' : 'Загрузить изображение'}
            />
        </>
    );

    return (
        <div className={cx(cnImageUploader({disabled}), className)}>
            {viewMode === 'inline' && (
                <>
                    <div ref={inlineContainerRef} />
                    {controlsNode}
                </>
            )}

            {viewMode === 'modal' && (
                <>
                    <Button
                        variant={ButtonVariant.secondary}
                        disabled={disabled}
                        onClick={() => setModalOpen(true)}
                        label={openModalButtonText}
                    />
                    <div ref={modalContainerRef} />
                </>
            )}
        </div>
    );
};
