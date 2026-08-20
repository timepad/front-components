import {
    createUppyFileUploaderIntegration,
    createUppyFileUploaderDriver,
    ICreateUppyFileUploaderIntegrationOptions,
    ICreateUppyFileUploaderDriverOptions,
    IUppyFileUploaderIntegration,
    IUppyReactRendererRuntime,
    IUppyLike,
} from './FileUploader.uppyDriver';
import {createRoot, Dashboard, DashboardModal, flushSync} from './FileUploader.uppyReactRuntime';
import type {IFileUploaderDriver} from './FileUploader.types';

/** React runtime Uppy v5, подключаемый отдельно от vanilla-драйвера. */
export const UPPY_REACT_RENDERER_RUNTIME: IUppyReactRendererRuntime = {
    type: 'react',
    createRoot,
    flushSync,
    DashboardComponent: Dashboard,
    DashboardModalComponent: DashboardModal,
};

export type ICreateReactUppyFileUploaderDriverOptions = Omit<ICreateUppyFileUploaderDriverOptions, 'dashboardRenderer'>;

export interface ICreateReactUppyFileUploaderIntegrationOptions
    extends Omit<ICreateUppyFileUploaderIntegrationOptions, 'driverOptions'> {
    driverOptions?: ICreateReactUppyFileUploaderDriverOptions;
}

/** Создает driver с React-компонентами `@uppy/react`. Требует React 18+. */
export const createReactUppyFileUploaderDriver = (
    uppy: IUppyLike,
    options: ICreateReactUppyFileUploaderDriverOptions = {},
): IFileUploaderDriver => {
    return createUppyFileUploaderDriver(uppy, {
        ...options,
        dashboardRenderer: UPPY_REACT_RENDERER_RUNTIME,
    });
};

/** Создает Uppy-интеграцию с React renderer-ом. Требует React 18+. */
export const createReactUppyFileUploaderIntegration = (
    options: ICreateReactUppyFileUploaderIntegrationOptions = {},
): IUppyFileUploaderIntegration => {
    const {driverOptions, ...integrationOptions} = options;

    return createUppyFileUploaderIntegration({
        ...integrationOptions,
        driverOptions: {
            ...driverOptions,
            dashboardRenderer: UPPY_REACT_RENDERER_RUNTIME,
        },
    });
};
