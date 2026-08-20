import type {IFileUploaderPresignedUploadStrategy} from './FileUploader.presign';
import type {IUppyLike} from './FileUploader.uppyDriver';
import {AwsS3} from './FileUploader.uppyS3Runtime';

const AWS_S3_PLUGIN_ID = 'AwsS3Multipart';

export interface IInstallUppyS3UploadOptions {
    /** Uppy-инстанс, в который нужно установить AwsS3 plugin. */
    uppy: IUppyLike;
    /** Стратегия получения presigned PUT параметров. */
    presignedUploadStrategy: IFileUploaderPresignedUploadStrategy;
}

/**
 * Подключает официальный Uppy AwsS3 plugin к presign-стратегии FileUploader.
 */
export const installUppyS3Upload = ({uppy, presignedUploadStrategy}: IInstallUppyS3UploadOptions): (() => void) => {
    uppy.use(AwsS3, {
        shouldUseMultipart: false,
        getUploadParameters: async (file: unknown) => {
            const uploadParameters = await presignedUploadStrategy.getUploadParameters(file);

            return {
                method: 'PUT',
                url: uploadParameters.url,
                headers: uploadParameters.headers,
            };
        },
    });

    return () => {
        const plugin = uppy.getPlugin(AWS_S3_PLUGIN_ID);

        if (plugin) {
            uppy.removePlugin(plugin);
        }
    };
};
