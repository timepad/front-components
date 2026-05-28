import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import Uppy from '@uppy/core/lib/index.js';
import 'css/bundle.less';

import {ImageUploadUppy} from './ImageUploadUppy';
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
