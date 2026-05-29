import XHRUpload from '@uppy/xhr-upload';
import type Uppy from '@uppy/core';

import type {ImageUploadPluginFactory, IImageUploadUppyFile} from './ImageUploadUppy.types';

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
    pluginId?: string;
    presignTimeoutMs?: number;
}

type UppyWithS3PluginApi = Uppy & {
    getPlugin?: (pluginId: string) => unknown;
    removePlugin?: (pluginInstance: unknown) => void;
};

export const createS3PresignedUploadPlugin = ({
    presignEndpoint,
    getAuthToken,
    pluginId = 'S3PresignedXHRUpload',
    presignTimeoutMs = 10000,
}: IS3PresignedPluginOptions): ImageUploadPluginFactory => {
    return ({uppy}) => {
        const uppyWithS3PluginApi = uppy as UppyWithS3PluginApi;
        const existingPlugin = uppyWithS3PluginApi.getPlugin?.(pluginId);

        if (existingPlugin) {
            return;
        }

        uppy.use(XHRUpload as unknown, {
            id: pluginId,
            // Presigned S3 PUT: upload raw file body to the signed URL.
            formData: false,
            method: 'PUT',
            endpoint: async (file: IImageUploadUppyFile) => {
                const payload: IS3PresignRequestPayload = {
                    fileName: file.name || 'file',
                    mimeType: file.type,
                    size: file.size,
                };

                const token = await getAuthToken?.();
                const abortController = new AbortController();
                const timeoutId = setTimeout(() => abortController.abort(), presignTimeoutMs);
                let response: Response;
                try {
                    response = await fetch(presignEndpoint, {
                        signal: abortController.signal,
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            ...(token ? {authorization: `Bearer ${token}`} : {}),
                        },
                        body: JSON.stringify(payload),
                    });
                } finally {
                    clearTimeout(timeoutId);
                }

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
            headers: (file: IImageUploadUppyFile) => {
                return file.meta?.s3Headers || {};
            },
            getResponseData: (_xhr: XMLHttpRequest, file: IImageUploadUppyFile) => {
                return {
                    url: file.meta?.publicUrl || file.uploadURL || '',
                };
            },
        });

        return () => {
            const pluginInstance = uppyWithS3PluginApi.getPlugin?.(pluginId);
            if (pluginInstance) {
                uppyWithS3PluginApi.removePlugin?.(pluginInstance);
            }
        };
    };
};
