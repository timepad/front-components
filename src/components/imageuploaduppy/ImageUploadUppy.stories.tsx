import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import 'css/bundle.less';

import {ImageUploadUppy} from './ImageUploadUppy';
import {createS3PresignedUploadPlugin} from './s3PresignedExample';
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

const withDemoUpload = [
    ({uppy}: {uppy: Uppy}) => {
        (uppy as any).use(XHRUpload as any, {
            endpoint: 'https://httpbin.org/post',
            method: 'post',
            formData: true,
            fieldName: 'file',
        });
    },
];

export const SingleUploadManual: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Single upload (manual)</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '640px'}}>
                <ImageUploadUppy
                    adapter={{
                        createUploader: createBaseUploader,
                        uploadStrategy: 'manual',
                        plugins: withDemoUpload,
                    }}
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
    return (
        <>
            <StoryTitle>Image crop + auto strategy</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '640px'}}>
                <ImageUploadUppy
                    adapter={{
                        createUploader: createAutoUploader,
                        uploadStrategy: 'auto',
                        plugins: withDemoUpload,
                        locale: {
                            strings: {
                                dropPasteFiles: 'Перетащите изображение сюда или %{browseFiles}',
                            },
                        },
                    }}
                />
            </div>
        </>
    );
};

export const ButtonWithModal: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Button + modal uploader</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '640px'}}>
                <ImageUploadUppy
                    viewMode="modal"
                    openModalButtonText="Добавить изображение"
                    adapter={{
                        createUploader: createBaseUploader,
                        uploadStrategy: 'manual',
                        plugins: withDemoUpload,
                    }}
                />
            </div>
        </>
    );
};

export const ErrorStateDemo: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Error state demo</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '640px'}}>
                <ImageUploadUppy
                    adapter={{
                        createUploader: createBaseUploader,
                        uploadStrategy: 'manual',
                    }}
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
    return (
        <>
            <StoryTitle>S3-compatible presigned upload example</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '640px'}}>
                <ImageUploadUppy
                    adapter={{
                        createUploader: createBaseUploader,
                        uploadStrategy: 'manual',
                        plugins: [
                            createS3PresignedUploadPlugin({
                                // Replace with your backend endpoint that returns
                                // { uploadUrl, headers?, publicUrl? }.
                                presignEndpoint: '/api/uploads/presign-image',
                            }),
                        ],
                    }}
                    onError={(error) => {
                        // eslint-disable-next-line no-console
                        console.error('s3 presigned upload error', error);
                    }}
                />
            </div>
        </>
    );
};
