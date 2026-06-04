import React from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import ImageEditor from '@uppy/image-editor';

import {
    IImageUploaderDriver,
    IImageUploaderDriverEventMap,
    IImageUploaderDriverMountHandle,
    IImageUploaderDriverMountOptions,
    IImageUploaderFile,
} from './ImageUploader.types';

const DEFAULT_DASHBOARD_PLUGIN_ID = 'ImageUploaderDashboard';
const DEFAULT_IMAGE_EDITOR_PLUGIN_ID = 'ImageEditor';

type ImageUploaderUppyEventName =
    | 'upload'
    | 'progress'
    | 'upload-success'
    | 'upload-error'
    | 'error'
    | 'file-removed'
    | 'complete';
type ImageUploaderDriverEventName = keyof IImageUploaderDriverEventMap;
type UppyEventCallback = (...args: unknown[]) => void;
type DriverEventCallback = IImageUploaderDriverEventMap[keyof IImageUploaderDriverEventMap];

export interface IImageUploaderS3UploadParameters {
    method?: 'POST' | 'PUT';
    url: string;
    fields?: Record<string, string>;
    headers?: Record<string, string>;
}

export type ImageUploaderS3GetUploadParameters = (
    file: IImageUploaderFile,
) => Promise<IImageUploaderS3UploadParameters>;

export interface ICreateS3UploadStrategyOptions {
    getUploadParameters: ImageUploaderS3GetUploadParameters;
}

export interface IImageUploaderS3UploadStrategy {
    getUploadParameters: (file: unknown) => Promise<IImageUploaderS3UploadParameters>;
}

export interface IImageEditorPluginOptions {
    quality?: number;
    cropperOptions?: Record<string, unknown>;
    [key: string]: unknown;
}

export interface IImageUploaderDashboardOptions {
    note?: string | null;
    disabled?: boolean;
    plugins?: string[];
    hideUploadButton?: boolean;
    doneButtonHandler?: () => void;
    proudlyDisplayPoweredByUppy?: boolean;
    showProgressDetails?: boolean;
    hideCancelButton?: boolean;
    hideProgressAfterFinish?: boolean;
    closeModalOnClickOutside?: boolean;
    [key: string]: unknown;
}

export const DEFAULT_IMAGE_EDITOR_OPTIONS: IImageEditorPluginOptions = {
    quality: 0.9,
    cropperOptions: {
        viewMode: 1,
        background: false,
        autoCropArea: 1,
    },
};

export interface ICreateUppyDriverOptions {
    dashboardPluginId?: string;
    imageEditorPluginId?: string;
    imageEditor?: IImageEditorPluginOptions | false;
    dashboard?: IImageUploaderDashboardOptions;
    plugins?: string[];
}

export interface ICreateReactUppyDriverOptions {
    imageEditorPluginId?: string;
    imageEditor?: IImageEditorPluginOptions | false;
    dashboard?: IImageUploaderDashboardOptions;
    plugins?: string[];
}

export interface IUppyLike {
    use: (plugin: unknown, options?: Record<string, unknown>) => void;
    getPlugin: <T = unknown>(id: string) => T | undefined;
    removePlugin: (plugin: unknown) => void;
    on: (eventName: ImageUploaderUppyEventName, callback: UppyEventCallback) => void;
    off: (eventName: ImageUploaderUppyEventName, callback: UppyEventCallback) => void;
    upload: () => Promise<unknown>;
    cancelAll: () => void;
    destroy: () => void;
}

export interface ICreateImageUploaderBundleOptions {
    uppy?: IUppyLike;
    uppyOptions?: Record<string, unknown>;
    createUppy?: () => IUppyLike;
    driverOptions?: ICreateUppyDriverOptions;
}

export interface ICreateReactImageUploaderBundleOptions {
    uppy?: IUppyLike;
    uppyOptions?: Record<string, unknown>;
    createUppy?: () => IUppyLike;
    driverOptions?: ICreateReactUppyDriverOptions;
}

export interface IImageUploaderBundle {
    uppy: IUppyLike;
    driver: IImageUploaderDriver;
    destroy: () => void;
}

export type IReactImageUploaderBundle = IImageUploaderBundle;

interface IUppyFileLike {
    id: string;
    name?: string;
    type?: string;
    size?: number;
    preview?: string;
    uploadURL?: string;
    meta?: Record<string, unknown>;
}

interface IDashboardPluginLike {
    setOptions: (options: Record<string, unknown>) => void;
    openModal: () => Promise<void> | void;
    closeModal: (options?: Record<string, unknown>) => Promise<void> | void;
}

interface IReactRootLike {
    render: (node: React.ReactElement) => void;
    unmount: () => void;
}

interface IReactDashboardRuntime {
    createRoot: (container: HTMLElement) => IReactRootLike;
    DashboardComponent: React.ComponentType<Record<string, unknown>>;
    DashboardModalComponent: React.ComponentType<Record<string, unknown>>;
}

let dashboardMountCounter = 0;
let reactDashboardRuntime: IReactDashboardRuntime | null = null;

type IDriverDashboardConfig = Pick<ICreateUppyDriverOptions, 'dashboard' | 'plugins'>;

interface ICreateUppyInstanceOptions {
    uppy?: IUppyLike;
    uppyOptions?: Record<string, unknown>;
    createUppy?: () => IUppyLike;
}

const getDefaultExport = <T>(moduleRecord: unknown): T => {
    if (moduleRecord && typeof moduleRecord === 'object' && 'default' in moduleRecord) {
        return (moduleRecord as {default: T}).default;
    }

    return moduleRecord as T;
};

const deferTask = (callback: () => void) => {
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(() => {
            callback();
        });
        return;
    }

    setTimeout(callback, 0);
};

const loadReactDashboardRuntime = (): IReactDashboardRuntime => {
    if (reactDashboardRuntime) {
        return reactDashboardRuntime;
    }

    let createRootFn: ((container: HTMLElement) => IReactRootLike) | undefined;
    let dashboardComponent: React.ComponentType<Record<string, unknown>> | undefined;
    let dashboardModalComponent: React.ComponentType<Record<string, unknown>> | undefined;

    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
        const reactDomClient = require('react-dom/client');
        createRootFn = reactDomClient.createRoot as (container: HTMLElement) => IReactRootLike;
    } catch (error) {
        throw new Error(
            `ImageUploader: failed to load "react-dom/client". Uppy React driver requires React 18+ and react-dom/client. ${
                error instanceof Error ? error.message : ''
            }`,
        );
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
        const dashboardModule = require('@uppy/react/dashboard');
        // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
        const dashboardModalModule = require('@uppy/react/dashboard-modal');
        dashboardComponent = getDefaultExport<React.ComponentType<Record<string, unknown>>>(dashboardModule);
        dashboardModalComponent = getDefaultExport<React.ComponentType<Record<string, unknown>>>(dashboardModalModule);
    } catch (error) {
        throw new Error(
            `ImageUploader: failed to load "@uppy/react/dashboard(-modal)". Install @uppy/react in the host project. ${
                error instanceof Error ? error.message : ''
            }`,
        );
    }

    if (typeof createRootFn !== 'function') {
        throw new Error('ImageUploader: react-dom/client.createRoot is unavailable');
    }

    if (!dashboardComponent || !dashboardModalComponent) {
        throw new Error('ImageUploader: @uppy/react components are unavailable');
    }

    reactDashboardRuntime = {
        createRoot: createRootFn,
        DashboardComponent: dashboardComponent,
        DashboardModalComponent: dashboardModalComponent,
    };

    return reactDashboardRuntime;
};

const toImageUploaderFile = (file: IUppyFileLike | undefined): IImageUploaderFile | undefined => {
    if (!file) {
        return undefined;
    }

    return {
        id: file.id,
        name: file.name,
        type: file.type,
        size: file.size,
        preview: file.preview,
        uploadURL: file.uploadURL,
        meta: file.meta,
    };
};

const getImageEditorOptions = (
    imageEditorOptions: IImageEditorPluginOptions | false | undefined,
): IImageEditorPluginOptions | false => {
    if (imageEditorOptions === false) {
        return false;
    }

    return {
        ...DEFAULT_IMAGE_EDITOR_OPTIONS,
        ...imageEditorOptions,
        cropperOptions: {
            ...DEFAULT_IMAGE_EDITOR_OPTIONS.cropperOptions,
            ...imageEditorOptions?.cropperOptions,
        },
    };
};

const createDashboardPluginId = (basePluginId: string, mode: 'inline' | 'modal'): string => {
    dashboardMountCounter += 1;
    return `${basePluginId}-${mode}-${dashboardMountCounter}`;
};

const buildPluginIds = (
    imageEditorPluginId: string | null,
    pluginIdsFromOptions: string[] | undefined,
    pluginIdsFromDashboardOptions: string[] | undefined,
): string[] => {
    const pluginIds = new Set<string>(pluginIdsFromOptions || []);

    (pluginIdsFromDashboardOptions || []).forEach((pluginId) => {
        pluginIds.add(pluginId);
    });

    if (imageEditorPluginId) {
        pluginIds.add(imageEditorPluginId);
    }

    return Array.from(pluginIds);
};

const buildDashboardCommonOptions = (
    mountOptions: IImageUploaderDriverMountOptions,
    pluginIds: string[],
    dashboardOptions: IImageUploaderDashboardOptions | undefined,
): IImageUploaderDashboardOptions => {
    return {
        ...dashboardOptions,
        note: mountOptions.note ?? dashboardOptions?.note,
        disabled: mountOptions.disabled ?? dashboardOptions?.disabled,
        plugins: pluginIds,
        hideUploadButton: !mountOptions.showNativeUploadButton,
        doneButtonHandler: mountOptions.doneButtonHandler,
    };
};

const resolveCloseModalOnClickOutside = (dashboardOptions: IImageUploaderDashboardOptions | undefined): boolean => {
    return dashboardOptions?.closeModalOnClickOutside ?? true;
};

const ensureImageEditorPlugin = (
    uppy: IUppyLike,
    imageEditorPluginId: string,
    imageEditorOptions: IImageEditorPluginOptions | false,
): string | null => {
    if (imageEditorOptions === false) {
        return null;
    }

    const existingPlugin = uppy.getPlugin(imageEditorPluginId);
    if (existingPlugin) {
        return imageEditorPluginId;
    }

    uppy.use(ImageEditor, {
        id: imageEditorPluginId,
        ...imageEditorOptions,
    });

    return imageEditorPluginId;
};

const mountDashboard = (
    uppy: IUppyLike,
    mode: 'inline' | 'modal',
    container: HTMLElement,
    mountOptions: IImageUploaderDriverMountOptions,
    config: IDriverDashboardConfig & {dashboardPluginId?: string},
    imageEditorPluginId: string | null,
): IDashboardPluginLike => {
    const dashboardPluginId = config.dashboardPluginId || DEFAULT_DASHBOARD_PLUGIN_ID;
    const runtimeDashboardPluginId = createDashboardPluginId(dashboardPluginId, mode);
    const pluginIds = buildPluginIds(imageEditorPluginId, config.plugins, config.dashboard?.plugins);
    const commonOptions = buildDashboardCommonOptions(mountOptions, pluginIds, config.dashboard);

    const dashboardOptions: Record<string, unknown> =
        mode === 'inline'
            ? {
                  ...commonOptions,
                  id: runtimeDashboardPluginId,
                  inline: true,
                  target: container,
                  height: mountOptions.dashboardHeight,
              }
            : {
                  ...commonOptions,
                  id: runtimeDashboardPluginId,
                  inline: false,
                  target: container,
                  onRequestCloseModal: mountOptions.onRequestClose,
                  closeModalOnClickOutside: resolveCloseModalOnClickOutside(config.dashboard),
              };

    uppy.use(Dashboard, dashboardOptions);

    const plugin = uppy.getPlugin<IDashboardPluginLike>(runtimeDashboardPluginId);
    if (!plugin) {
        throw new Error(`Dashboard plugin "${runtimeDashboardPluginId}" was not initialized`);
    }

    return plugin;
};

const updateDashboard = (
    dashboard: IDashboardPluginLike,
    mode: 'inline' | 'modal',
    mountOptions: IImageUploaderDriverMountOptions,
    config: IDriverDashboardConfig,
    imageEditorPluginId: string | null,
): void => {
    const pluginIds = buildPluginIds(imageEditorPluginId, config.plugins, config.dashboard?.plugins);
    const commonOptions = buildDashboardCommonOptions(mountOptions, pluginIds, config.dashboard);

    if (mode === 'inline') {
        dashboard.setOptions({
            ...commonOptions,
            inline: true,
            height: mountOptions.dashboardHeight,
        });
        return;
    }

    dashboard.setOptions({
        ...commonOptions,
        inline: false,
        onRequestCloseModal: mountOptions.onRequestClose,
        closeModalOnClickOutside: resolveCloseModalOnClickOutside(config.dashboard),
    });
};

const unmountDashboard = (uppy: IUppyLike, dashboard: IDashboardPluginLike | null): void => {
    if (!dashboard) {
        return;
    }

    uppy.removePlugin(dashboard);
};

const createDashboardMountHandle = (
    uppy: IUppyLike,
    dashboard: IDashboardPluginLike,
    mode: 'inline' | 'modal',
    config: IDriverDashboardConfig,
    imageEditorPluginId: string | null,
): IImageUploaderDriverMountHandle => {
    let isDestroyed = false;

    const destroy = () => {
        if (isDestroyed) {
            return;
        }

        isDestroyed = true;
        unmountDashboard(uppy, dashboard);
    };

    const mountHandle: IImageUploaderDriverMountHandle = {
        setOptions: (nextOptions) => {
            if (isDestroyed) {
                return;
            }

            updateDashboard(dashboard, mode, nextOptions, config, imageEditorPluginId);
        },
        cleanup: destroy,
        destroy,
    };

    if (mode === 'modal') {
        mountHandle.open = () => {
            if (isDestroyed) {
                return;
            }

            void dashboard.openModal();
        };
        mountHandle.close = () => {
            if (isDestroyed) {
                return;
            }

            void dashboard.closeModal({manualClose: true});
        };
    }

    return mountHandle;
};

export const createS3UploadStrategy = ({
    getUploadParameters,
}: ICreateS3UploadStrategyOptions): IImageUploaderS3UploadStrategy => {
    return {
        getUploadParameters: async (file: unknown) => {
            const mappedFile = toImageUploaderFile(file as IUppyFileLike | undefined);

            if (!mappedFile) {
                throw new Error('Uppy file is not available');
            }

            return getUploadParameters(mappedFile);
        },
    };
};

const IMAGE_UPLOADER_EVENT_NAME_MAP: Record<keyof IImageUploaderDriverEventMap, ImageUploaderUppyEventName> = {
    'upload-start': 'upload',
    progress: 'progress',
    'upload-success': 'upload-success',
    'upload-error': 'upload-error',
    error: 'error',
    'file-removed': 'file-removed',
    complete: 'complete',
};

const createDriverEventHandlers = (uppy: IUppyLike) => {
    const listenerMap = new Map<ImageUploaderDriverEventName, Map<DriverEventCallback, UppyEventCallback>>();

    const on: IImageUploaderDriver['on'] = (eventName, callback) => {
        const uppyEventName = IMAGE_UPLOADER_EVENT_NAME_MAP[eventName];
        let eventListeners = listenerMap.get(eventName);
        if (!eventListeners) {
            eventListeners = new Map<DriverEventCallback, UppyEventCallback>();
            listenerMap.set(eventName, eventListeners);
        }

        const callbackKey = callback as DriverEventCallback;
        const existingWrappedCallback = eventListeners.get(callbackKey);
        if (existingWrappedCallback) {
            uppy.off(uppyEventName, existingWrappedCallback);
        }

        const wrappedCallback: UppyEventCallback = (...args) => {
            switch (eventName) {
                case 'upload-start': {
                    (callback as IImageUploaderDriverEventMap['upload-start'])();
                    return;
                }
                case 'progress': {
                    const [progress] = args as [number];
                    (callback as IImageUploaderDriverEventMap['progress'])(progress);
                    return;
                }
                case 'upload-success': {
                    const [uppyFile, response] = args as [IUppyFileLike | undefined, unknown];
                    const file = toImageUploaderFile(uppyFile);
                    if (!file) {
                        return;
                    }

                    (callback as IImageUploaderDriverEventMap['upload-success'])(file, response);
                    return;
                }
                case 'upload-error': {
                    const [uppyFile, error] = args as [IUppyFileLike | undefined, unknown];
                    const file = toImageUploaderFile(uppyFile);
                    (callback as IImageUploaderDriverEventMap['upload-error'])(file, error);
                    return;
                }
                case 'error': {
                    const [error] = args as [unknown];
                    (callback as IImageUploaderDriverEventMap['error'])(error);
                    return;
                }
                case 'file-removed': {
                    const [uppyFile] = args as [IUppyFileLike | undefined];
                    const file = toImageUploaderFile(uppyFile);
                    if (!file) {
                        return;
                    }

                    (callback as IImageUploaderDriverEventMap['file-removed'])(file);
                    return;
                }
                case 'complete': {
                    (callback as IImageUploaderDriverEventMap['complete'])();
                    return;
                }
                default: {
                    return;
                }
            }
        };

        eventListeners.set(callbackKey, wrappedCallback);
        uppy.on(uppyEventName, wrappedCallback);

        return () => {
            const currentEventListeners = listenerMap.get(eventName);
            if (!currentEventListeners) {
                return;
            }

            const currentWrappedCallback = currentEventListeners.get(callbackKey);
            if (currentWrappedCallback !== wrappedCallback) {
                return;
            }

            uppy.off(uppyEventName, wrappedCallback);
            currentEventListeners.delete(callbackKey);
            if (currentEventListeners.size === 0) {
                listenerMap.delete(eventName);
            }
        };
    };

    const off: IImageUploaderDriver['off'] = (eventName, callback) => {
        const uppyEventName = IMAGE_UPLOADER_EVENT_NAME_MAP[eventName];
        const eventListeners = listenerMap.get(eventName);
        if (!eventListeners) {
            return;
        }

        const callbackKey = callback as DriverEventCallback;
        const wrappedCallback = eventListeners.get(callbackKey);
        if (!wrappedCallback) {
            return;
        }

        uppy.off(uppyEventName, wrappedCallback);
        eventListeners.delete(callbackKey);
        if (eventListeners.size === 0) {
            listenerMap.delete(eventName);
        }
    };

    return {on, off};
};

const destroyReactRoot = (state: {root: IReactRootLike; destroyed: boolean}) => {
    if (state.destroyed) {
        return;
    }

    state.destroyed = true;
    deferTask(() => {
        state.root.unmount();
    });
};

export const createUppyDriver = (uppy: IUppyLike, options: ICreateUppyDriverOptions = {}): IImageUploaderDriver => {
    const imageEditorPluginId = options.imageEditorPluginId || DEFAULT_IMAGE_EDITOR_PLUGIN_ID;
    const resolvedImageEditorOptions = getImageEditorOptions(options.imageEditor);
    const registeredImageEditorPluginId = ensureImageEditorPlugin(
        uppy,
        imageEditorPluginId,
        resolvedImageEditorOptions,
    );
    const {on, off} = createDriverEventHandlers(uppy);

    return {
        mountInline: (container, mountOptions) => {
            const dashboard = mountDashboard(
                uppy,
                'inline',
                container,
                mountOptions,
                options,
                registeredImageEditorPluginId,
            );

            return createDashboardMountHandle(uppy, dashboard, 'inline', options, registeredImageEditorPluginId);
        },
        mountModal: (container, mountOptions) => {
            const dashboard = mountDashboard(
                uppy,
                'modal',
                container,
                mountOptions,
                options,
                registeredImageEditorPluginId,
            );

            return createDashboardMountHandle(uppy, dashboard, 'modal', options, registeredImageEditorPluginId);
        },
        on,
        off,
        upload: async () => {
            await uppy.upload();
        },
        cancelAll: () => {
            uppy.cancelAll();
        },
        destroy: () => {
            uppy.destroy();
        },
    };
};

export const createReactUppyDriver = (
    uppy: IUppyLike,
    options: ICreateReactUppyDriverOptions = {},
): IImageUploaderDriver => {
    const runtime = loadReactDashboardRuntime();
    const imageEditorPluginId = options.imageEditorPluginId || DEFAULT_IMAGE_EDITOR_PLUGIN_ID;
    const resolvedImageEditorOptions = getImageEditorOptions(options.imageEditor);
    const registeredImageEditorPluginId = ensureImageEditorPlugin(
        uppy,
        imageEditorPluginId,
        resolvedImageEditorOptions,
    );
    const {on, off} = createDriverEventHandlers(uppy);

    const getCommonDashboardProps = (mountOptions: IImageUploaderDriverMountOptions): Record<string, unknown> => {
        const pluginIds = buildPluginIds(registeredImageEditorPluginId, options.plugins, options.dashboard?.plugins);

        return buildDashboardCommonOptions(mountOptions, pluginIds, options.dashboard);
    };

    return {
        mountInline: (container, mountOptions) => {
            const rootState = {root: runtime.createRoot(container), destroyed: false};
            let currentOptions = mountOptions;

            const render = () => {
                if (rootState.destroyed) {
                    return;
                }

                const commonProps = getCommonDashboardProps(currentOptions);
                rootState.root.render(
                    React.createElement(runtime.DashboardComponent, {
                        uppy,
                        ...commonProps,
                        height: currentOptions.dashboardHeight,
                    }),
                );
            };

            render();

            return {
                cleanup: () => destroyReactRoot(rootState),
                setOptions: (nextOptions) => {
                    currentOptions = nextOptions;
                    render();
                },
                destroy: () => destroyReactRoot(rootState),
            };
        },
        mountModal: (container, mountOptions) => {
            const rootState = {root: runtime.createRoot(container), destroyed: false};
            let currentOptions = mountOptions;
            let isOpen = false;

            const render = () => {
                if (rootState.destroyed) {
                    return;
                }

                const commonProps = getCommonDashboardProps(currentOptions);
                rootState.root.render(
                    React.createElement(runtime.DashboardModalComponent, {
                        uppy,
                        ...commonProps,
                        open: isOpen,
                        onRequestClose: () => {
                            isOpen = false;
                            currentOptions.onRequestClose?.();
                            render();
                        },
                        closeModalOnClickOutside: resolveCloseModalOnClickOutside(options.dashboard),
                    }),
                );
            };

            render();

            return {
                cleanup: () => destroyReactRoot(rootState),
                setOptions: (nextOptions) => {
                    currentOptions = nextOptions;
                    render();
                },
                open: () => {
                    isOpen = true;
                    render();
                },
                close: () => {
                    isOpen = false;
                    render();
                },
                destroy: () => destroyReactRoot(rootState),
            };
        },
        on,
        off,
        upload: async () => {
            await uppy.upload();
        },
        cancelAll: () => {
            uppy.cancelAll();
        },
        destroy: () => {
            uppy.destroy();
        },
    };
};

const createUppyInstance = (options: ICreateUppyInstanceOptions): IUppyLike => {
    const uppyConstructor = Uppy as unknown as {new (uppyOptions?: Record<string, unknown>): IUppyLike};

    return options.uppy || options.createUppy?.() || new uppyConstructor(options.uppyOptions);
};

const createImageUploaderBundleFromDriver = (uppy: IUppyLike, driver: IImageUploaderDriver): IImageUploaderBundle => {
    return {
        uppy,
        driver,
        destroy: () => {
            uppy.destroy();
        },
    };
};

export const createReactImageUploaderBundle = (
    options: ICreateReactImageUploaderBundleOptions = {},
): IReactImageUploaderBundle => {
    const uppy = createUppyInstance(options);
    const driver = createReactUppyDriver(uppy, options.driverOptions);

    return createImageUploaderBundleFromDriver(uppy, driver);
};

export const createImageUploaderBundle = (options: ICreateImageUploaderBundleOptions = {}): IImageUploaderBundle => {
    const uppy = createUppyInstance(options);
    const driver = createUppyDriver(uppy, options.driverOptions);

    return createImageUploaderBundleFromDriver(uppy, driver);
};
