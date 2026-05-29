import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import Uppy from '@uppy/core';
import 'css/bundle.less';

import {ImageUploadUppy} from './ImageUploadUppy';
import {createS3PresignedUploadPlugin} from './s3PresignedExample';
import {
    IImageUploadPluginFactoryContext,
    IImageUploadUppyAdapterConfig,
    IImageUploadUppyFile,
} from './ImageUploadUppy.types';
import {IStorybookComponent, Spacer, StoryTitle} from '../../services/helpers/storyBookHelpers';

export default {
    title: 'ImageUploadUppy',
    component: ImageUploadUppy,
} as Meta;

const createBaseUploader = () => {
    return new Uppy({
        autoProceed: false,
        restrictions: {
            maxNumberOfFiles: 1,
            allowedFileTypes: ['image/*'],
        },
    });
};

const createAutoUploader = () => {
    return new Uppy({
        autoProceed: true,
        restrictions: {
            maxNumberOfFiles: 1,
            allowedFileTypes: ['image/*'],
        },
    });
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type StoryUploader = (fileIds: string[]) => Promise<void>;

type UppyWithStoryEvents = Uppy & {
    getFile?: (fileId: string) => IImageUploadUppyFile | undefined;
    emit?: (eventName: string, ...args: unknown[]) => void;
    addUploader?: (uploader: StoryUploader) => void;
    removeUploader?: (uploader: StoryUploader) => void;
};

const createMockUploadPlugin = () => {
    return ({uppy}: IImageUploadPluginFactoryContext) => {
        const uppyWithStoryEvents = uppy as UppyWithStoryEvents;
        const uploader = async (fileIds: string[]) => {
            const files = fileIds
                .map((fileId) => uppyWithStoryEvents.getFile?.(fileId))
                .filter(Boolean) as IImageUploadUppyFile[];

            if (files.length > 0) {
                uppyWithStoryEvents.emit?.('upload-start', files);
            }

            for (const fileId of fileIds) {
                const file = uppyWithStoryEvents.getFile?.(fileId) as IImageUploadUppyFile | undefined;
                if (!file) {
                    continue;
                }

                const bytesTotal = Number(file.size) || 1;
                const progressSteps = [0.25, 0.6, 1];

                for (const step of progressSteps) {
                    await sleep(180);
                    const bytesUploaded = Math.min(bytesTotal, Math.round(bytesTotal * step));
                    uppyWithStoryEvents.emit?.('upload-progress', file, {
                        uploadStarted: Date.now(),
                        bytesUploaded,
                        bytesTotal,
                    });
                }

                await sleep(120);

                const uploadURL = `https://example.local/uploads/${encodeURIComponent(file.name || file.id)}`;
                uppyWithStoryEvents.emit?.('upload-progress', file, {
                    uploadStarted: Date.now(),
                    bytesUploaded: bytesTotal,
                    bytesTotal,
                });
                uppyWithStoryEvents.emit?.('upload-success', file, {
                    status: 200,
                    body: {url: uploadURL},
                    uploadURL,
                });
            }
        };

        uppyWithStoryEvents.addUploader?.(uploader);

        return () => {
            uppyWithStoryEvents.removeUploader?.(uploader);
        };
    };
};

const withDemoUpload = [createMockUploadPlugin()];

export const SingleUploadManual: IStorybookComponent = () => {
    const adapter = React.useMemo<IImageUploadUppyAdapterConfig>(() => {
        return {
            createUploader: createBaseUploader,
            uploadStrategy: 'manual',
            plugins: withDemoUpload,
        };
    }, []);

    return (
        <>
            <StoryTitle>Single upload (manual)</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '640px'}}>
                <ImageUploadUppy
                    adapter={adapter}
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

export const ImageCropAuto: IStorybookComponent = () => {
    const adapter = React.useMemo<IImageUploadUppyAdapterConfig>(() => {
        return {
            createUploader: createAutoUploader,
            uploadStrategy: 'auto',
            plugins: withDemoUpload,
            locale: {
                strings: {
                    dropPasteFiles: 'Перетащите изображение сюда или %{browseFiles}',
                },
            },
        };
    }, []);

    return (
        <>
            <StoryTitle>Image crop + auto strategy</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '640px'}}>
                <ImageUploadUppy adapter={adapter} />
            </div>
        </>
    );
};

export const InlineWithNativeUploadButton: IStorybookComponent = () => {
    const adapter = React.useMemo<IImageUploadUppyAdapterConfig>(() => {
        return {
            createUploader: createBaseUploader,
            uploadStrategy: 'manual',
            plugins: withDemoUpload,
        };
    }, []);

    return (
        <>
            <StoryTitle>Inline + native upload button</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '640px'}}>
                <ImageUploadUppy showNativeUploadButton={true} adapter={adapter} />
            </div>
        </>
    );
};

export const ButtonWithModal: IStorybookComponent = () => {
    const adapter = React.useMemo<IImageUploadUppyAdapterConfig>(() => {
        return {
            createUploader: createBaseUploader,
            uploadStrategy: 'manual',
            plugins: withDemoUpload,
        };
    }, []);

    return (
        <>
            <StoryTitle>Button + modal uploader</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '640px'}}>
                <ImageUploadUppy viewMode="modal" openModalButtonText="Добавить изображение" adapter={adapter} />
            </div>
        </>
    );
};

export const ErrorStateDemo: IStorybookComponent = () => {
    const adapter = React.useMemo<IImageUploadUppyAdapterConfig>(() => {
        return {
            createUploader: createBaseUploader,
            uploadStrategy: 'manual',
        };
    }, []);

    return (
        <>
            <StoryTitle>Error state demo</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '640px'}}>
                <ImageUploadUppy
                    adapter={adapter}
                    onError={(error) => {
                        // eslint-disable-next-line no-console
                        console.error('expected error (no uploader plugin configured)', error);
                    }}
                />
            </div>
        </>
    );
};

export const S3PresignedUploadExample: IStorybookComponent = () => {
    const adapter = React.useMemo<IImageUploadUppyAdapterConfig>(() => {
        return {
            createUploader: createBaseUploader,
            uploadStrategy: 'manual',
            plugins: [
                createS3PresignedUploadPlugin({
                    // Replace with your backend endpoint that returns
                    // { uploadUrl, headers?, publicUrl? }.
                    presignEndpoint: '/api/uploads/presign-image',
                }),
            ],
        };
    }, []);

    return (
        <>
            <StoryTitle>S3-compatible presigned upload example</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '640px'}}>
                <ImageUploadUppy
                    adapter={adapter}
                    onError={(error) => {
                        // eslint-disable-next-line no-console
                        console.error('s3 presigned upload error', error);
                    }}
                />
            </div>
        </>
    );
};
