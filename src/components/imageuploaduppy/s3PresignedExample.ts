import XHRUpload from '@uppy/xhr-upload';

import type {ImageUploadPluginFactory} from './ImageUploadUppy.types';

export interface IS3PresignRequestPayload {
    fileName: string;
    mimeType?: string;
    size?: number;
}

export interface IS3PresignResponse {
    uploadUrl: string;
    publicUrl?: string;
    headers?: Record<string, string>;
}

export interface IS3PresignedPluginOptions {
    presignEndpoint: string;
    getAuthToken?: () => string | undefined | Promise<string | undefined>;
}

export const createS3PresignedUploadPlugin = ({
    presignEndpoint,
    getAuthToken,
}: IS3PresignedPluginOptions): ImageUploadPluginFactory => {
    return ({uppy}) => {
        (uppy as any).use(XHRUpload as any, {
            // Presigned S3 PUT: upload raw file body to the signed URL.
            formData: false,
            method: 'PUT',
            endpoint: async (file: any) => {
                const payload: IS3PresignRequestPayload = {
                    fileName: file?.name || 'file',
                    mimeType: file?.type,
                    size: file?.size,
                };

                const token = await getAuthToken?.();
                const response = await fetch(presignEndpoint, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        ...(token ? {authorization: `Bearer ${token}`} : {}),
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    throw new Error(`Presign failed with status ${response.status}`);
                }

                const presignData = (await response.json()) as IS3PresignResponse;
                const headers = presignData.headers || {};
                uppy.setFileMeta(file.id, {
                    s3Headers: headers,
                    publicUrl: presignData.publicUrl,
                });

                return presignData.uploadUrl;
            },
            headers: (file: any) => {
                return file?.meta?.s3Headers || {};
            },
            getResponseData: (_xhr: XMLHttpRequest, file: any) => {
                return {
                    url: file?.meta?.publicUrl || file?.uploadURL || '',
                };
            },
        });
    };
};
