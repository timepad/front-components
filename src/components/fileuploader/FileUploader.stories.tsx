import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import 'css/bundle.less';

import {FileUploader} from './FileUploader';
import {
    createFilePresignUploadStrategy,
    IFileUploaderPresignSession,
    IFileUploaderPresignedUploadStrategy,
} from './presign';
import {DEFAULT_IMAGE_EDITOR_OPTIONS, IUppyFileUploaderIntegration, IUppyImageEditorOptions, IUppyLike} from './uppy';
import {UPPY_IMAGE_EDITOR_PLUGIN} from './uppyImageEditor';
import {createReactUppyFileUploaderIntegration} from './uppyReact';
import {IFileUploaderFile, IFileUploaderUploadResult} from './FileUploader.types';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Brick} from 'components/brick';
import {Button, ButtonVariant} from 'components/button';

export default {
    title: 'FileUploader',
    component: FileUploader,
} as Meta;

const DOCUMENT_FILE_TYPES = ['application/pdf', 'text/plain', '.doc', '.docx'];
const IMAGE_FILE_TYPES = ['image/*'];
const PRESIGN_STORY_FILE_TYPES = ['application/pdf', 'image/*', 'text/*', '.csv', '.doc', '.docx'];
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
    presignedUploadStrategy?: IFileUploaderPresignedUploadStrategy;
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
    {mode = 'success', presignedUploadStrategy}: StoryMockUploadOptions = {},
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

        const filesToUpload = fileIds.map(getCurrentFile).filter((file): file is StoryUppyFile => file !== undefined);
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
            const progressSteps = [0.25, 0.6, 0.9];

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

            const uploadParameters = await presignedUploadStrategy?.getUploadParameters(fileBeforeSuccess);
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

const createStoryIntegration = ({
    allowedFileTypes,
    autoProceed,
    imageEditor,
    maxNumberOfFiles,
}: {
    allowedFileTypes: string[];
    autoProceed: boolean;
    imageEditor?: IUppyImageEditorOptions | false;
    maxNumberOfFiles: number;
}): IUppyFileUploaderIntegration => {
    return createReactUppyFileUploaderIntegration({
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

const extractPreviewUrl = (result: IFileUploaderUploadResult): string => {
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
    presignedUploadStrategy,
}: {
    allowedFileTypes?: string[];
    autoProceed?: boolean;
    imageEditor?: IUppyImageEditorOptions | false;
    maxNumberOfFiles?: number;
    mockMode?: StoryMockMode;
    presignedUploadStrategy?: IFileUploaderPresignedUploadStrategy;
} = {}) => {
    const storyIntegration = React.useMemo(() => {
        const integration = createStoryIntegration({allowedFileTypes, autoProceed, imageEditor, maxNumberOfFiles});
        const cleanupMockUpload = installMockUploadPlugin(integration.uppy as UppyWithStoryApi, {
            mode: mockMode,
            presignedUploadStrategy,
        });

        return {
            driver: integration.driver,
            cleanup: () => {
                cleanupMockUpload();
                integration.destroy();
            },
        };
    }, [allowedFileTypes, autoProceed, imageEditor, maxNumberOfFiles, mockMode, presignedUploadStrategy]);

    React.useEffect(() => {
        return () => {
            storyIntegration.cleanup();
        };
    }, [storyIntegration]);

    return storyIntegration.driver;
};

export const InlineManualUpload: IStorybookComponent = () => {
    const driver = useStoryDriver({autoProceed: false});

    return (
        <FileUploaderStoryFrame title="Inline manual upload">
            <FileUploader
                driver={driver}
                uploadMode="manual"
                onUploadSuccess={(result) => {
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

export const DriverModalManualUpload: IStorybookComponent = () => {
    const driver = useStoryDriver({autoProceed: false});

    return (
        <FileUploaderStoryFrame title="Driver modal manual upload">
            <FileUploader driver={driver} viewMode="modal" uploadMode="manual">
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

export const LibraryModalManualUpload: IStorybookComponent = () => {
    const driver = useStoryDriver({autoProceed: false});

    return (
        <FileUploaderStoryFrame title="Library modal manual upload">
            <FileUploader
                driver={driver}
                viewMode="modal"
                modalProvider="library"
                uploadMode="manual"
                contentHeight={320}
                note="Выберите файл для загрузки внутри модалки"
                modalTitle="Загрузка файла"
                modalDescription="Внутри модалки используется inline-режим FileUploader"
                onUploadSuccess={(result) => {
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

export const InlineAutoUpload: IStorybookComponent = () => {
    const driver = useStoryDriver({autoProceed: true});

    return (
        <FileUploaderStoryFrame title="Inline auto upload">
            <FileUploader driver={driver} uploadMode="auto" />
        </FileUploaderStoryFrame>
    );
};

export const MultipleFilesManualUpload: IStorybookComponent = () => {
    const driver = useStoryDriver({autoProceed: false, maxNumberOfFiles: 3});

    return (
        <FileUploaderStoryFrame title="Multiple files manual upload">
            <FileUploader
                driver={driver}
                uploadMode="manual"
                note="Выберите до 3 файлов для загрузки"
                onUploadSuccess={(result) => {
                    // eslint-disable-next-line no-console
                    console.log('multi success', result);
                }}
            />
        </FileUploaderStoryFrame>
    );
};

export const ImageCrop: IStorybookComponent = () => {
    const driver = useStoryDriver({
        allowedFileTypes: IMAGE_FILE_TYPES,
        autoProceed: false,
        imageEditor: DEFAULT_IMAGE_EDITOR_OPTIONS,
    });

    return (
        <FileUploaderStoryFrame title="Image crop">
            <FileUploader
                driver={driver}
                uploadMode="manual"
                note='Выберите изображение и нажмите "Edit" для обрезки перед загрузкой'
                uploadButtonText="Загрузить изображение"
            />
        </FileUploaderStoryFrame>
    );
};

export const UploadError: IStorybookComponent = () => {
    const driver = useStoryDriver({autoProceed: false, mockMode: 'error'});

    return (
        <FileUploaderStoryFrame title="Upload error">
            <FileUploader
                driver={driver}
                uploadMode="manual"
                onError={(error) => {
                    // eslint-disable-next-line no-console
                    console.error('error', error);
                }}
            />
        </FileUploaderStoryFrame>
    );
};

export const ExternalImagePreview: IStorybookComponent = () => {
    const driver = useStoryDriver({
        allowedFileTypes: IMAGE_FILE_TYPES,
        autoProceed: false,
        imageEditor: DEFAULT_IMAGE_EDITOR_OPTIONS,
    });
    const [previewUrl, setPreviewUrl] = React.useState<string>('');

    return (
        <FileUploaderStoryFrame title="External image preview">
            <FileUploader
                driver={driver}
                uploadMode="manual"
                uploadButtonText="Загрузить изображение"
                onUploadStart={() => setPreviewUrl('')}
                onFileRemoved={() => setPreviewUrl('')}
                onUploadSuccess={(result) => setPreviewUrl(extractPreviewUrl(result))}
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

export const PresignedS3Upload: IStorybookComponent = () => {
    const [presignSession, setPresignSession] = React.useState<IFileUploaderPresignSession | null>(null);
    const presignedUploadStrategy = React.useMemo(() => {
        return createFilePresignUploadStrategy({
            intent: 'event_poster',
            entityId: 12345,
            requestPresign: async (payload, file) => {
                const fileName = encodeURIComponent(file.name || file.id);

                return {
                    upload_url: `https://s3.example.local/front-components-demo/${payload.intent}/${fileName}`,
                    session_id: `mock-session-${payload.intent}-${file.id}`,
                    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                    size_limit_in_mb: 20,
                    allowed_extensions: ['pdf', 'jpg', 'png', 'csv'],
                    allowed_content_types: [
                        'application/pdf',
                        'image/jpeg',
                        'image/jpg',
                        'image/png',
                        'text/csv',
                        'application/csv',
                    ],
                };
            },
        });
    }, []);
    const driver = useStoryDriver({
        allowedFileTypes: PRESIGN_STORY_FILE_TYPES,
        autoProceed: false,
        presignedUploadStrategy,
    });

    return (
        <FileUploaderStoryFrame title="Presigned S3 upload">
            <FileUploader
                driver={driver}
                uploadMode="manual"
                note="Разрешены PDF, JPG, PNG и CSV размером до 20 МБ"
                onUploadStart={() => setPresignSession(null)}
                onUploadSuccess={(result) => {
                    const session = presignedUploadStrategy.getPresignSession?.(result.fileId) || null;
                    setPresignSession(session);
                    // eslint-disable-next-line no-console
                    console.log('file presign success', {result, session});
                }}
                onFileRemoved={(fileId) => {
                    presignedUploadStrategy.clearPresignSession?.(fileId);
                    setPresignSession(null);
                }}
                onError={(error) => {
                    // eslint-disable-next-line no-console
                    console.error('file presign error', error);
                }}
            />
            {presignSession && (
                <>
                    <Brick />
                    <pre style={{whiteSpace: 'pre-wrap'}}>
                        {JSON.stringify(
                            {
                                session_id: presignSession.sessionId,
                                expires_at: presignSession.expiresAt,
                                payload: presignSession.payload,
                                restrictions: {
                                    size_limit_in_mb: presignSession.response.size_limit_in_mb,
                                    allowed_extensions: presignSession.response.allowed_extensions,
                                    allowed_content_types: presignSession.response.allowed_content_types,
                                },
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
