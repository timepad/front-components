import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import 'css/bundle.less';
import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';
import '@uppy/image-editor/css/style.min.css';

import {ImageUploader} from './ImageUploader';
import {createReactImageUploaderBundle, IReactImageUploaderBundle, IUppyLike} from './ImageUploader.helpers';
import {IImageUploaderFile, IImageUploaderResult} from './ImageUploader.types';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Brick} from 'components/brick';
import {Button, ButtonVariant} from 'components/button';

export default {
    title: 'ImageUploader',
    component: ImageUploader,
} as Meta;

const createBaseUppyOptions = (autoProceed: boolean): Record<string, unknown> => {
    return {
        autoProceed,
        restrictions: {
            maxNumberOfFiles: 1,
            allowedFileTypes: ['image/*'],
        },
    };
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type StoryUploader = (fileIds: string[]) => Promise<void>;
type StoryMockMode = 'success' | 'error';
type StoryUppyFile = IImageUploaderFile & {data?: Blob | File};

type UppyWithStoryApi = IUppyLike & {
    addUploader?: (uploader: StoryUploader) => void;
    removeUploader?: (uploader: StoryUploader) => void;
    getFile?: (fileId: string) => IImageUploaderFile | undefined;
    emit?: (eventName: string, ...args: unknown[]) => void;
};

const installMockUploadPlugin = (uppy: UppyWithStoryApi, mode: StoryMockMode = 'success') => {
    let isDisposed = false;
    const createdObjectUrls = new Set<string>();

    const wait = async (ms: number): Promise<boolean> => {
        await sleep(ms);
        return !isDisposed;
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

        const files = fileIds
            .map((fileId) => uppy.getFile?.(fileId) as IImageUploaderFile | undefined)
            .filter(Boolean) as IImageUploaderFile[];

        if (!isDisposed && files.length > 0) {
            uppy.emit?.('upload-start', files);
        }

        for (const fileId of fileIds) {
            if (isDisposed) {
                return;
            }

            const file = uppy.getFile?.(fileId) as StoryUppyFile | undefined;
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
                uppy.emit?.('upload-progress', file, {
                    uploadStarted: Date.now(),
                    bytesUploaded,
                    bytesTotal,
                });
            }

            if (mode === 'error') {
                if (!(await wait(120))) {
                    return;
                }
                const uploadError = new Error('Mock upload failed');
                if (isDisposed) {
                    return;
                }
                uppy.emit?.('upload-error', file, uploadError);
                throw uploadError;
            }

            if (!(await wait(120))) {
                return;
            }

            const uploadURL =
                createPreviewUrl(file) || `https://example.local/uploads/${encodeURIComponent(file.name || file.id)}`;
            if (isDisposed) {
                return;
            }
            uppy.emit?.('upload-progress', file, {
                uploadStarted: Date.now(),
                bytesUploaded: bytesTotal,
                bytesTotal,
            });
            uppy.emit?.('upload-success', file, {
                status: 200,
                body: {url: uploadURL},
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

const createStoryBundle = (autoProceed: boolean): IReactImageUploaderBundle => {
    return createReactImageUploaderBundle({
        uppyOptions: createBaseUppyOptions(autoProceed),
        driverOptions: {
            dashboard: {
                proudlyDisplayPoweredByUppy: false,
                showProgressDetails: true,
                hideCancelButton: false,
                hideProgressAfterFinish: false,
            },
        },
    });
};

const extractPreviewUrl = (result: IImageUploaderResult): string => {
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
    autoProceed = false,
    mockMode = 'success',
}: {autoProceed?: boolean; mockMode?: StoryMockMode} = {}) => {
    return React.useMemo(() => {
        const bundle = createStoryBundle(autoProceed);
        const cleanupMockUpload = installMockUploadPlugin(bundle.uppy as UppyWithStoryApi, mockMode);

        return {
            driver: bundle.driver,
            cleanup: () => {
                cleanupMockUpload();
                bundle.destroy();
            },
        };
    }, [autoProceed, mockMode]);
};

export const FullPassThroughInlineManual: IStorybookComponent = () => {
    const {driver, cleanup} = useStoryDriver({autoProceed: false});

    React.useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    return (
        <>
            <StoryTitle>Full pass-through: inline manual</StoryTitle>
            <div style={{width: '640px'}}>
                <ImageUploader
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
            </div>
        </>
    );
};

export const FullPassThroughModalManual: IStorybookComponent = () => {
    const {driver, cleanup} = useStoryDriver({autoProceed: false});

    React.useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    return (
        <>
            <StoryTitle>Full pass-through: button + modal</StoryTitle>
            <div style={{width: '640px'}}>
                <ImageUploader driver={driver} viewMode="modal" uploadStrategy="manual">
                    {({disabled, open, uploading}) => (
                        <Button
                            variant={ButtonVariant.secondary}
                            disabled={disabled || uploading}
                            onClick={open}
                            label="Добавить изображение"
                        />
                    )}
                </ImageUploader>
            </div>
        </>
    );
};

export const FullPassThroughInlineAuto: IStorybookComponent = () => {
    const {driver, cleanup} = useStoryDriver({autoProceed: true});

    React.useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    return (
        <>
            <StoryTitle>Full pass-through: inline auto</StoryTitle>
            <div style={{width: '640px'}}>
                <ImageUploader driver={driver} uploadStrategy="auto" />
            </div>
        </>
    );
};

export const FullPassThroughInlineCropManual: IStorybookComponent = () => {
    const {driver, cleanup} = useStoryDriver({autoProceed: false});

    React.useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    return (
        <>
            <StoryTitle>Full pass-through: inline + crop flow</StoryTitle>
            <div style={{width: '640px'}}>
                <ImageUploader
                    driver={driver}
                    uploadStrategy="manual"
                    note='Выберите изображение и нажмите "Edit" для обрезки перед загрузкой'
                />
            </div>
        </>
    );
};

export const FullPassThroughInlineError: IStorybookComponent = () => {
    const {driver, cleanup} = useStoryDriver({autoProceed: false, mockMode: 'error'});

    React.useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    return (
        <>
            <StoryTitle>Full pass-through: inline error state</StoryTitle>
            <div style={{width: '640px'}}>
                <ImageUploader
                    driver={driver}
                    uploadStrategy="manual"
                    onError={(error) => {
                        // eslint-disable-next-line no-console
                        console.error('error', error);
                    }}
                />
            </div>
        </>
    );
};

export const FullPassThroughInlineExternalPreview: IStorybookComponent = () => {
    const {driver, cleanup} = useStoryDriver({autoProceed: false});
    const [previewUrl, setPreviewUrl] = React.useState<string>('');

    React.useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    return (
        <>
            <StoryTitle>Full pass-through: external preview (host logic)</StoryTitle>
            <div style={{width: '640px'}}>
                <ImageUploader
                    driver={driver}
                    uploadStrategy="manual"
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
            </div>
        </>
    );
};
