import {
    createUppyFileUploaderBundle,
    createUppyFileUploaderDriver,
    ICreateFileUploaderBundleOptions,
    ICreateFileUploaderDriverOptions,
    IFileUploaderBundle,
    IFileUploaderReactRenderer,
    IUppyLike,
} from './FileUploader.uppyDriver';
import {createRoot, Dashboard, DashboardModal, flushSync} from './FileUploader.uppyReactRuntime';
import type {IFileUploaderDriver} from './FileUploader.types';

/** React runtime Uppy v5, подключаемый отдельно от vanilla-драйвера. */
export const UPPY_REACT_RENDERER: IFileUploaderReactRenderer = {
    type: 'react',
    createRoot,
    flushSync,
    DashboardComponent: Dashboard,
    DashboardModalComponent: DashboardModal,
};

export type ICreateReactUppyFileUploaderDriverOptions = Omit<ICreateFileUploaderDriverOptions, 'renderer'>;

export interface ICreateReactUppyFileUploaderBundleOptions
    extends Omit<ICreateFileUploaderBundleOptions, 'driverOptions'> {
    driverOptions?: ICreateReactUppyFileUploaderDriverOptions;
}

/** Создает driver с React-компонентами `@uppy/react`. Требует React 18+. */
export const createReactUppyFileUploaderDriver = (
    uppy: IUppyLike,
    options: ICreateReactUppyFileUploaderDriverOptions = {},
): IFileUploaderDriver => {
    return createUppyFileUploaderDriver(uppy, {...options, renderer: UPPY_REACT_RENDERER});
};

/** Создает Uppy bundle с React renderer-ом. Требует React 18+. */
export const createReactUppyFileUploaderBundle = (
    options: ICreateReactUppyFileUploaderBundleOptions = {},
): IFileUploaderBundle => {
    const {driverOptions, ...bundleOptions} = options;

    return createUppyFileUploaderBundle({
        ...bundleOptions,
        driverOptions: {...driverOptions, renderer: UPPY_REACT_RENDERER},
    });
};
