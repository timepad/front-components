import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import 'css/bundle.less';

import {FileUploader} from './FileUploader';
import {createFilePresignUploadStrategy, IFileUploaderPresignSession, IFileUploaderS3UploadStrategy} from './presign';
import {DEFAULT_IMAGE_EDITOR_OPTIONS, IFileUploaderBundle, IImageEditorPluginOptions, IUppyLike} from './uppy';
import {UPPY_IMAGE_EDITOR_PLUGIN} from './uppyImageEditor';
import {createReactUppyFileUploaderBundle} from './uppyReact';
import {IFileUploaderFile, IFileUploaderResult} from './FileUploader.types';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Brick} from 'components/brick';
import {Button, ButtonVariant} from 'components/button';

export default {
    title: 'FileUploader',
    component: FileUploader,
} as Meta;

const DOCUMENT_FILE_TYPES = ['application/pdf', 'text/plain', '.doc', '.docx'];
const IMAGE_FILE_TYPES = ['image/*'];
const STORY_CONTAINER_STYLE: React.CSSProperties = {width: '640px'};

const createBaseUppyOptions = (
    autoProceed: boolean,
    allowedFileTypes: string[],
    maxNumberOfFiles: number,
): Record<string, unknown> => {
    return {
        autoProceed,
        restrictions: {
            maxNumberOfFiles,
            allowedFileTypes,
        },
    };
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type StoryUploader = (fileIds: string[]) => Promise<void>;
type StoryMockMode = 'success' | 'error';
type StoryUppyFileProgress = {
    uploadStarted?: number | null;
};
type StoryUppyFile = IFileUploaderFile & {
    data?: Blob | File;
    progress?: StoryUppyFileProgress;
};
type StoryMockUploadOptions = {
    mode?: StoryMockMode;
    s3UploadStrategy?: IFileUploaderS3UploadStrategy;
};

type UppyWithStoryApi = IUppyLike & {
    addUploader?: (uploader: StoryUploader) => void;
    removeUploader?: (uploader: StoryUploader) => void;
    getFile?: (fileId: string) => IFileUploaderFile | undefined;
    emit?: (eventName: string, ...args: unknown[]) => void;
};

const FileUploaderStoryFrame: React.FC<{children: React.ReactNode; title: string}> = ({children, title}) => {
    return (
        <>
            <StoryTitle>{title}</StoryTitle>
            <div style={STORY_CONTAINER_STYLE}>{children}</div>
        </>
    );
};

const installMockUploadPlugin = (
    uppy: UppyWithStoryApi,
    {mode = 'success', s3UploadStrategy}: StoryMockUploadOptions = {},
) => {
    let isDisposed = false;
    const createdObjectUrls = new Set<string>();

    const wait = async (ms: number): Promise<boolean> => {
        await sleep(ms);
        return !isDisposed;
    };

    const getCurrentFile = (fileId: string): StoryUppyFile | undefined => {
        return uppy.getFile?.(fileId) as StoryUppyFile | undefined;
    };

    const getCurrentFiles = (fileIds: string[]): StoryUppyFile[] => {
        return fileIds.reduce<StoryUppyFile[]>((files, fileId) => {
            const file = getCurrentFile(fileId);

            if (file) {
                files.push(file);
            }

            return files;
        }, []);
    };

    const getUploadStarted = (file: StoryUppyFile): number => {
        return file.progress?.uploadStarted || Date.now();
    };

    const emitUploadProgress = (fileId: string, bytesUploaded: number, bytesTotal: number): boolean => {
        const file = getCurrentFile(fileId);

        if (!file) {
            return false;
        }

        uppy.emit?.('upload-progress', file, {
            uploadStarted: getUploadStarted(file),
            bytesUploaded,
            bytesTotal,
        });

        return true;
    };

    const createPreviewUrl = (file: StoryUppyFile): string => {
        if (file.preview) {
            return file.preview;
        }

        const fileData = file.data;
        if (!fileData || typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') {
            return '';
        }

        const objectUrl = URL.createObjectURL(fileData);
        createdObjectUrls.add(objectUrl);
        return objectUrl;
    };

    const uploader = async (fileIds: string[]) => {
        if (isDisposed) {
            return;
        }

        const filesToUpload = getCurrentFiles(fileIds);
        if (filesToUpload.length === 0) {
            return;
        }

        uppy.emit?.('upload-start', filesToUpload);

        for (const fileId of fileIds) {
            if (isDisposed) {
                return;
            }

            const file = getCurrentFile(fileId);
            if (!file) {
                continue;
            }

            const bytesTotal = Number(file.size) || 1;
            const progressSteps = [0.25, 0.6, 1];

            for (const step of progressSteps) {
                if (!(await wait(180))) {
                    return;
                }
                const bytesUploaded = Math.min(bytesTotal, Math.round(bytesTotal * step));
                if (isDisposed) {
                    return;
                }
                emitUploadProgress(fileId, bytesUploaded, bytesTotal);
            }

            if (mode === 'error') {
                if (!(await wait(120))) {
                    return;
                }
                const uploadError = new Error('Mock upload failed');
                uppy.emit?.('upload-error', getCurrentFile(fileId), uploadError);
                throw uploadError;
            }

            if (!(await wait(120))) {
                return;
            }

            const fileBeforeSuccess = getCurrentFile(fileId);
            if (!fileBeforeSuccess) {
                continue;
            }

            const uploadParameters = await s3UploadStrategy?.getUploadParameters(fileBeforeSuccess);
            const uploadURL =
                uploadParameters?.url ||
                createPreviewUrl(fileBeforeSuccess) ||
                `https://example.local/uploads/${encodeURIComponent(fileBeforeSuccess.name || fileBeforeSuccess.id)}`;
            if (isDisposed) {
                return;
            }
            emitUploadProgress(fileId, bytesTotal, bytesTotal);

            const fileBeforeSuccessEvent = getCurrentFile(fileId);
            if (!fileBeforeSuccessEvent) {
                continue;
            }

            uppy.emit?.('upload-success', fileBeforeSuccessEvent, {
                status: 200,
                body: {uploadParameters, url: uploadURL},
                uploadURL,
            });
        }
    };

    uppy.addUploader?.(uploader);

    return () => {
        isDisposed = true;
        uppy.removeUploader?.(uploader);
        createdObjectUrls.forEach((objectUrl) => {
            if (typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
                URL.revokeObjectURL(objectUrl);
            }
        });
        createdObjectUrls.clear();
    };
};

const createStoryBundle = ({
    allowedFileTypes,
    autoProceed,
    imageEditor,
    maxNumberOfFiles,
}: {
    allowedFileTypes: string[];
    autoProceed: boolean;
    imageEditor?: IImageEditorPluginOptions | false;
    maxNumberOfFiles: number;
}): IFileUploaderBundle => {
    return createReactUppyFileUploaderBundle({
        uppyOptions: createBaseUppyOptions(autoProceed, allowedFileTypes, maxNumberOfFiles),
        driverOptions: {
            imageEditor,
            imageEditorPlugin:
                imageEditor === false || imageEditor === undefined ? undefined : UPPY_IMAGE_EDITOR_PLUGIN,
            dashboard: {
                proudlyDisplayPoweredByUppy: false,
                hideProgressDetails: false,
                hideCancelButton: false,
                hideProgressAfterFinish: false,
            },
        },
    });
};

const extractPreviewUrl = (result: IFileUploaderResult): string => {
    if (result.uploadURL) {
        return result.uploadURL;
    }

    const response = result.response as
        | {
              uploadURL?: string;
              body?: {url?: string};
          }
        | undefined;

    return response?.uploadURL || response?.body?.url || '';
};

const useStoryDriver = ({
    allowedFileTypes = DOCUMENT_FILE_TYPES,
    autoProceed = false,
    imageEditor = false,
    maxNumberOfFiles = 1,
    mockMode = 'success',
    s3UploadStrategy,
}: {
    allowedFileTypes?: string[];
    autoProceed?: boolean;
    imageEditor?: IImageEditorPluginOptions | false;
    maxNumberOfFiles?: number;
    mockMode?: StoryMockMode;
    s3UploadStrategy?: IFileUploaderS3UploadStrategy;
} = {}) => {
    const storyDriver = React.useMemo(() => {
        const bundle = createStoryBundle({allowedFileTypes, autoProceed, imageEditor, maxNumberOfFiles});
        const cleanupMockUpload = installMockUploadPlugin(bundle.uppy as UppyWithStoryApi, {
            mode: mockMode,
            s3UploadStrategy,
        });

        return {
            driver: bundle.driver,
            cleanup: () => {
                cleanupMockUpload();
                bundle.destroy();
            },
        };
    }, [allowedFileTypes, autoProceed, imageEditor, maxNumberOfFiles, mockMode, s3UploadStrategy]);

    React.useEffect(() => {
        return () => {
            storyDriver.cleanup();
        };
    }, [storyDriver]);

    return storyDriver.driver;
};

export const FileInlineManual: IStorybookComponent = () => {
    const driver = useStoryDriver({autoProceed: false});

    return (
        <FileUploaderStoryFrame title="File: inline manual">
            <FileUploader
                driver={driver}
                uploadStrategy="manual"
                onSuccess={(result) => {
                    // eslint-disable-next-line no-console
                    console.log('success', result);
                }}
                onError={(error) => {
                    // eslint-disable-next-line no-console
                    console.error('error', error);
                }}
            />
        </FileUploaderStoryFrame>
    );
};

export const FileModalManual: IStorybookComponent = () => {
    const driver = useStoryDriver({autoProceed: false});

    return (
        <FileUploaderStoryFrame title="File: button + modal">
            <FileUploader driver={driver} viewMode="modal" uploadStrategy="manual">
                {({disabled, open, uploading}) => (
                    <Button
                        variant={ButtonVariant.secondary}
                        disabled={disabled || uploading}
                        onClick={open}
                        label="Добавить файл"
                    />
                )}
            </FileUploader>
        </FileUploaderStoryFrame>
    );
};

export const FileLibraryModalManual: IStorybookComponent = () => {
    const driver = useStoryDriver({autoProceed: false});

    return (
        <FileUploaderStoryFrame title="File: library modal + inline dashboard">
            <FileUploader
                driver={driver}
                viewMode="modal"
                modalRenderer="library"
                uploadStrategy="manual"
                dashboardHeight={320}
                note="Выберите файл для загрузки внутри модалки"
                modalTitle="Загрузка файла"
                modalDescription="Внутри модалки используется inline-режим FileUploader"
                onSuccess={(result) => {
                    // eslint-disable-next-line no-console
                    console.log('library modal success', result);
                }}
            >
                {({disabled, open, uploading}) => (
                    <Button
                        variant={ButtonVariant.secondary}
                        disabled={disabled || uploading}
                        onClick={open}
                        label="Открыть загрузчик в модалке"
                    />
                )}
            </FileUploader>
        </FileUploaderStoryFrame>
    );
};

export const FileInlineAuto: IStorybookComponent = () => {
    const driver = useStoryDriver({autoProceed: true});

    return (
        <FileUploaderStoryFrame title="File: inline auto">
            <FileUploader driver={driver} uploadStrategy="auto" />
        </FileUploaderStoryFrame>
    );
};

export const FileMultiUploadManual: IStorybookComponent = () => {
    const driver = useStoryDriver({autoProceed: false, maxNumberOfFiles: 3});

    return (
        <FileUploaderStoryFrame title="File: multi upload manual">
            <FileUploader
                driver={driver}
                uploadStrategy="manual"
                note="Выберите до 3 файлов для загрузки"
                onSuccess={(result) => {
                    // eslint-disable-next-line no-console
                    console.log('multi success', result);
                }}
            />
        </FileUploaderStoryFrame>
    );
};

export const ImageCropManual: IStorybookComponent = () => {
    const driver = useStoryDriver({
        allowedFileTypes: IMAGE_FILE_TYPES,
        autoProceed: false,
        imageEditor: DEFAULT_IMAGE_EDITOR_OPTIONS,
    });

    return (
        <FileUploaderStoryFrame title="Image: inline + crop flow">
            <FileUploader
                driver={driver}
                uploadStrategy="manual"
                note='Выберите изображение и нажмите "Edit" для обрезки перед загрузкой'
                uploadButtonText="Загрузить изображение"
            />
        </FileUploaderStoryFrame>
    );
};

export const FileInlineError: IStorybookComponent = () => {
    const driver = useStoryDriver({autoProceed: false, mockMode: 'error'});

    return (
        <FileUploaderStoryFrame title="File: inline error state">
            <FileUploader
                driver={driver}
                uploadStrategy="manual"
                onError={(error) => {
                    // eslint-disable-next-line no-console
                    console.error('error', error);
                }}
            />
        </FileUploaderStoryFrame>
    );
};

export const ImageExternalPreview: IStorybookComponent = () => {
    const driver = useStoryDriver({
        allowedFileTypes: IMAGE_FILE_TYPES,
        autoProceed: false,
        imageEditor: DEFAULT_IMAGE_EDITOR_OPTIONS,
    });
    const [previewUrl, setPreviewUrl] = React.useState<string>('');

    return (
        <FileUploaderStoryFrame title="Image: external preview (host logic)">
            <FileUploader
                driver={driver}
                uploadStrategy="manual"
                uploadButtonText="Загрузить изображение"
                onUploadStart={() => setPreviewUrl('')}
                onFileRemove={() => setPreviewUrl('')}
                onSuccess={(result) => setPreviewUrl(extractPreviewUrl(result))}
            />
            {previewUrl && (
                <>
                    <Brick />
                    <img
                        src={previewUrl}
                        alt="External preview"
                        style={{display: 'block', width: '100%', maxWidth: '360px', borderRadius: '8px'}}
                    />
                </>
            )}
        </FileUploaderStoryFrame>
    );
};

export const FileS3PresignExample: IStorybookComponent = () => {
    const [uploadSession, setUploadSession] = React.useState<IFileUploaderPresignSession | null>(null);
    const s3UploadStrategy = React.useMemo(() => {
        return createFilePresignUploadStrategy({
            intent: 'event_poster',
            entityId: 12345,
            requestPresign: async (payload, file) => {
                const fileName = encodeURIComponent(file.name || file.id);

                return {
                    upload_url: `https://s3.example.local/front-components-demo/${payload.intent}/${fileName}`,
                    session_id: `mock-session-${payload.intent}-${file.id}`,
                    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                };
            },
        });
    }, []);
    const driver = useStoryDriver({autoProceed: false, s3UploadStrategy});

    return (
        <FileUploaderStoryFrame title="File: /file/presign/ + S3 PUT example">
            <FileUploader
                driver={driver}
                uploadStrategy="manual"
                onUploadStart={() => setUploadSession(null)}
                onSuccess={(result) => {
                    const session = s3UploadStrategy.getUploadSession?.(result.fileId) || null;
                    setUploadSession(session);
                    // eslint-disable-next-line no-console
                    console.log('file presign success', {result, session});
                }}
                onFileRemove={(fileId) => {
                    s3UploadStrategy.clearUploadSession?.(fileId);
                    setUploadSession(null);
                }}
            />
            {uploadSession && (
                <>
                    <Brick />
                    <pre style={{whiteSpace: 'pre-wrap'}}>
                        {JSON.stringify(
                            {
                                session_id: uploadSession.sessionId,
                                expires_at: uploadSession.expiresAt,
                                payload: uploadSession.payload,
                            },
                            null,
                            2,
                        )}
                    </pre>
                </>
            )}
        </FileUploaderStoryFrame>
    );
};
