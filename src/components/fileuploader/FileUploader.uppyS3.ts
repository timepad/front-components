import type {IFileUploaderS3UploadStrategy} from './FileUploader.presign';
import type {IUppyLike} from './FileUploader.uppyDriver';
import {AwsS3} from './FileUploader.uppyS3Runtime';

const AWS_S3_PLUGIN_ID = 'AwsS3Multipart';

export interface IInstallFileUploaderUppyS3Options {
    uppy: IUppyLike;
    uploadStrategy: IFileUploaderS3UploadStrategy;
}

/**
 * Подключает официальный Uppy AwsS3 plugin к presign-стратегии FileUploader.
 */
export const installFileUploaderUppyS3 = ({uppy, uploadStrategy}: IInstallFileUploaderUppyS3Options): (() => void) => {
    uppy.use(AwsS3, {
        shouldUseMultipart: false,
        getUploadParameters: async (file: unknown) => {
            const uploadParameters = await uploadStrategy.getUploadParameters(file);

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
