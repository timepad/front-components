import type {IUppyLike} from './FileUploader.uppyDriver';

interface IUppyConstructor {
    new (options?: Record<string, unknown>): IUppyLike;
}

export const Uppy: IUppyConstructor;
export const Dashboard: unknown;
