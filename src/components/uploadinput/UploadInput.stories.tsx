import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import 'css/bundle.less';

import {UploadInput} from './UploadInput';
import {IUploadcareConfig} from './UploadInput.types';
import {IStorybookComponent, Spacer, StoryTitle} from '../../services/helpers/storyBookHelpers';

export default {
    title: 'UploadInput',
    component: UploadInput,
} as Meta;

const config: IUploadcareConfig = {
    UPLOADCARE_PUBLIC_KEY: '',
    STATIC_BASE_URL: '',
    STATIC_UPLOAD_URL: '',
};

export const DefaultUploadInput: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>UploadInput</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '300px'}}>
                <UploadInput
                    name={'file'}
                    onChange={(name, value) => {
                        console.log({name, value});
                    }}
                    setStatus={(status) => console.log(status)}
                    config={config}
                />
            </div>
        </>
    );
};
