import React from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import ImageEditor from '@uppy/image-editor';

import {
    IFileUploaderDriver,
    IFileUploaderDriverEventMap,
    IFileUploaderDriverMountHandle,
    IFileUploaderDriverMountOptions,
    IFileUploaderFile,
} from './FileUploader.types';

const DEFAULT_DASHBOARD_PLUGIN_ID = 'FileUploaderDashboard';
const DEFAULT_IMAGE_EDITOR_PLUGIN_ID = 'ImageEditor';

type FileUploaderUppyEventName =
    | 'upload'
    | 'progress'
    | 'upload-success'
    | 'upload-error'
    | 'error'
    | 'file-removed'
    | 'complete';
type FileUploaderDriverEventName = keyof IFileUploaderDriverEventMap;
type UppyEventCallback = (...args: unknown[]) => void;
type DriverEventCallback = IFileUploaderDriverEventMap[keyof IFileUploaderDriverEventMap];

/**
 * Параметры загрузки в S3-compatible storage.
 *
 * Обычно эти данные возвращает backend после presign-запроса.
 */
export interface IFileUploaderS3UploadParameters {
    /** HTTP-метод загрузки. */
    method?: 'POST' | 'PUT';
    /** Presigned URL или endpoint формы. */
    url: string;
    /** Поля multipart/form-data для POST-загрузки. */
    fields?: Record<string, string>;
    /** Заголовки для PUT/POST-загрузки. */
    headers?: Record<string, string>;
}

/**
 * Получает presign-параметры для конкретного файла.
 */
export type FileUploaderS3GetUploadParameters = (file: IFileUploaderFile) => Promise<IFileUploaderS3UploadParameters>;

/**
 * Опции helper-а `createS3UploadStrategy`.
 */
export interface ICreateS3UploadStrategyOptions {
    /** Функция, которая обращается к backend и возвращает параметры загрузки. */
    getUploadParameters: FileUploaderS3GetUploadParameters;
}

/**
 * Стратегия presign-загрузки, которую можно передать upload-плагину проекта.
 */
export interface IFileUploaderS3UploadStrategy {
    /** Возвращает presign-параметры для файла из конкретной uploader-библиотеки. */
    getUploadParameters: (file: unknown) => Promise<IFileUploaderS3UploadParameters>;
}

/**
 * Опции Uppy ImageEditor.
 */
export interface IImageEditorPluginOptions {
    /** Качество итогового изображения после редактирования. */
    quality?: number;
    /** Опции cropper-а внутри ImageEditor. */
    cropperOptions?: Record<string, unknown>;
    /** Дополнительные опции Uppy ImageEditor. */
    [key: string]: unknown;
}

/**
 * Опции Dashboard, которые прокидываются в Uppy Dashboard или @uppy/react Dashboard.
 */
export interface IFileUploaderDashboardOptions {
    /** Текст подсказки внутри Dashboard. */
    note?: string | null;
    /** Блокировка Dashboard. */
    disabled?: boolean;
    /** Список plugin id, которые Dashboard должен показывать в панели. */
    plugins?: string[];
    /** Скрыть нативную кнопку загрузки Uppy. */
    hideUploadButton?: boolean;
    /** Обработчик кнопки Done. `null` скрывает Done в Uppy Dashboard. */
    doneButtonHandler?: () => void;
    /** Показывать подпись Powered by Uppy. */
    proudlyDisplayPoweredByUppy?: boolean;
    /** Показывать детали прогресса загрузки. */
    showProgressDetails?: boolean;
    /** Скрыть кнопку cancel. */
    hideCancelButton?: boolean;
    /** Скрыть progress bar после завершения загрузки. */
    hideProgressAfterFinish?: boolean;
    /** Закрывать модалку по клику вне Dashboard. */
    closeModalOnClickOutside?: boolean;
    /** Дополнительные опции конкретной версии Dashboard. */
    [key: string]: unknown;
}

/**
 * Базовый конфиг ImageEditor для сценария обрезки изображений.
 */
export const DEFAULT_IMAGE_EDITOR_OPTIONS: IImageEditorPluginOptions = {
    quality: 0.9,
    cropperOptions: {
        viewMode: 1,
        background: false,
        autoCropArea: 1,
    },
};

/**
 * Способ рендера Dashboard.
 *
 * `uppy` использует vanilla `@uppy/dashboard`.
 * `react` использует компоненты `@uppy/react/dashboard` и `@uppy/react/dashboard-modal`.
 */
export type FileUploaderDriverRenderer = 'uppy' | 'react';

/**
 * Опции создания driver-а поверх Uppy.
 */
export interface ICreateFileUploaderDriverOptions {
    /** Renderer Dashboard UI. */
    renderer?: FileUploaderDriverRenderer;
    /** Базовый id Dashboard plugin-а. */
    dashboardPluginId?: string;
    /** Id ImageEditor plugin-а. */
    imageEditorPluginId?: string;
    /** Конфиг ImageEditor. `false` отключает ImageEditor. */
    imageEditor?: IImageEditorPluginOptions | false;
    /** Опции Dashboard. */
    dashboard?: IFileUploaderDashboardOptions;
    /** Дополнительные plugin id для Dashboard. */
    plugins?: string[];
}

/**
 * Минимальный контракт Uppy-инстанса, который нужен helper-ам.
 */
export interface IUppyLike {
    /** Зарегистрировать Uppy plugin. */
    use: (plugin: unknown, options?: Record<string, unknown>) => void;
    /** Получить Uppy plugin по id. */
    getPlugin: <T = unknown>(id: string) => T | undefined;
    /** Удалить Uppy plugin. */
    removePlugin: (plugin: unknown) => void;
    /** Подписаться на Uppy event. */
    on: (eventName: FileUploaderUppyEventName, callback: UppyEventCallback) => void;
    /** Отписаться от Uppy event. */
    off: (eventName: FileUploaderUppyEventName, callback: UppyEventCallback) => void;
    /** Запустить upload batch. */
    upload: () => Promise<unknown>;
    /** Отменить загрузки и очистить очередь. */
    cancelAll: () => void;
    /** Уничтожить Uppy-инстанс. */
    destroy: () => void;
}

/**
 * Опции создания bundle-а `uppy + driver`.
 */
export interface ICreateFileUploaderBundleOptions {
    /** Готовый Uppy-инстанс из проекта. */
    uppy?: IUppyLike;
    /** Опции для создания Uppy, если `uppy` и `createUppy` не переданы. */
    uppyOptions?: Record<string, unknown>;
    /** Фабрика Uppy-инстанса из проекта. */
    createUppy?: () => IUppyLike;
    /** Опции driver-а поверх Uppy. */
    driverOptions?: ICreateFileUploaderDriverOptions;
}

/**
 * Готовый bundle для подключения `FileUploader`.
 */
export interface IFileUploaderBundle {
    /** Uppy-инстанс, созданный или переданный проектом. */
    uppy: IUppyLike;
    /** Абстрактный driver для компонента `FileUploader`. */
    driver: IFileUploaderDriver;
    /** Уничтожает Uppy-инстанс и связанные ресурсы. */
    destroy: () => void;
}

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

type IDriverDashboardConfig = Pick<ICreateFileUploaderDriverOptions, 'dashboard' | 'plugins'>;
type FileUploaderDriverMountMethods = Pick<IFileUploaderDriver, 'mountInline' | 'mountModal'>;

interface ICreateUppyInstanceOptions {
    uppy?: IUppyLike;
    uppyOptions?: Record<string, unknown>;
    createUppy?: () => IUppyLike;
}

interface ICreateDriverRendererContext {
    uppy: IUppyLike;
    options: ICreateFileUploaderDriverOptions;
    registeredImageEditorPluginId: string | null;
}

type FileUploaderDriverRendererFactory = (context: ICreateDriverRendererContext) => FileUploaderDriverMountMethods;

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
            `FileUploader: failed to load "react-dom/client". Uppy React driver requires React 18+ and react-dom/client. ${
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
            `FileUploader: failed to load "@uppy/react/dashboard(-modal)". Install @uppy/react in the host project. ${
                error instanceof Error ? error.message : ''
            }`,
        );
    }

    if (typeof createRootFn !== 'function') {
        throw new Error('FileUploader: react-dom/client.createRoot is unavailable');
    }

    if (!dashboardComponent || !dashboardModalComponent) {
        throw new Error('FileUploader: @uppy/react components are unavailable');
    }

    reactDashboardRuntime = {
        createRoot: createRootFn,
        DashboardComponent: dashboardComponent,
        DashboardModalComponent: dashboardModalComponent,
    };

    return reactDashboardRuntime;
};

const toFileUploaderFile = (file: IUppyFileLike | undefined): IFileUploaderFile | undefined => {
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
    if (imageEditorOptions === false || imageEditorOptions === undefined) {
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
    mountOptions: IFileUploaderDriverMountOptions,
    pluginIds: string[],
    dashboardOptions: IFileUploaderDashboardOptions | undefined,
): IFileUploaderDashboardOptions => {
    return {
        ...dashboardOptions,
        note: mountOptions.note ?? dashboardOptions?.note,
        disabled: mountOptions.disabled ?? dashboardOptions?.disabled,
        plugins: pluginIds,
        hideUploadButton: !mountOptions.showNativeUploadButton,
        doneButtonHandler: mountOptions.doneButtonHandler,
    };
};

const resolveCloseModalOnClickOutside = (dashboardOptions: IFileUploaderDashboardOptions | undefined): boolean => {
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
    mountOptions: IFileUploaderDriverMountOptions,
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
    mountOptions: IFileUploaderDriverMountOptions,
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
): IFileUploaderDriverMountHandle => {
    let isDestroyed = false;

    const destroy = () => {
        if (isDestroyed) {
            return;
        }

        isDestroyed = true;
        unmountDashboard(uppy, dashboard);
    };

    const mountHandle: IFileUploaderDriverMountHandle = {
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

/**
 * Создает adapter для S3-compatible presign flow.
 *
 * Helper нормализует Uppy file в `IFileUploaderFile`, чтобы backend-слой проекта
 * не зависел от внутреннего типа файла конкретной версии Uppy.
 *
 * @example
 * const s3UploadStrategy = createS3UploadStrategy({
 *     getUploadParameters: (file) => api.getPresignedUploadUrl(file.name),
 * });
 */
export const createS3UploadStrategy = ({
    getUploadParameters,
}: ICreateS3UploadStrategyOptions): IFileUploaderS3UploadStrategy => {
    return {
        getUploadParameters: async (file: unknown) => {
            const mappedFile = toFileUploaderFile(file as IUppyFileLike | undefined);

            if (!mappedFile) {
                throw new Error('Uppy file is not available');
            }

            return getUploadParameters(mappedFile);
        },
    };
};

const FILE_UPLOADER_EVENT_NAME_MAP: Record<keyof IFileUploaderDriverEventMap, FileUploaderUppyEventName> = {
    'upload-start': 'upload',
    progress: 'progress',
    'upload-success': 'upload-success',
    'upload-error': 'upload-error',
    error: 'error',
    'file-removed': 'file-removed',
    complete: 'complete',
};

const createDriverEventHandlers = (uppy: IUppyLike) => {
    const listenerMap = new Map<FileUploaderDriverEventName, Map<DriverEventCallback, UppyEventCallback>>();

    const on: IFileUploaderDriver['on'] = (eventName, callback) => {
        const uppyEventName = FILE_UPLOADER_EVENT_NAME_MAP[eventName];
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
                    (callback as IFileUploaderDriverEventMap['upload-start'])();
                    return;
                }
                case 'progress': {
                    const [progress] = args as [number];
                    (callback as IFileUploaderDriverEventMap['progress'])(progress);
                    return;
                }
                case 'upload-success': {
                    const [uppyFile, response] = args as [IUppyFileLike | undefined, unknown];
                    const file = toFileUploaderFile(uppyFile);
                    if (!file) {
                        return;
                    }

                    (callback as IFileUploaderDriverEventMap['upload-success'])(file, response);
                    return;
                }
                case 'upload-error': {
                    const [uppyFile, error] = args as [IUppyFileLike | undefined, unknown];
                    const file = toFileUploaderFile(uppyFile);
                    (callback as IFileUploaderDriverEventMap['upload-error'])(file, error);
                    return;
                }
                case 'error': {
                    const [error] = args as [unknown];
                    (callback as IFileUploaderDriverEventMap['error'])(error);
                    return;
                }
                case 'file-removed': {
                    const [uppyFile] = args as [IUppyFileLike | undefined];
                    const file = toFileUploaderFile(uppyFile);
                    if (!file) {
                        return;
                    }

                    (callback as IFileUploaderDriverEventMap['file-removed'])(file);
                    return;
                }
                case 'complete': {
                    (callback as IFileUploaderDriverEventMap['complete'])();
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

    const off: IFileUploaderDriver['off'] = (eventName, callback) => {
        const uppyEventName = FILE_UPLOADER_EVENT_NAME_MAP[eventName];
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

const createBaseUppyDriver = (
    uppy: IUppyLike,
    options: ICreateFileUploaderDriverOptions,
    createRenderer: FileUploaderDriverRendererFactory,
): IFileUploaderDriver => {
    const imageEditorPluginId = options.imageEditorPluginId || DEFAULT_IMAGE_EDITOR_PLUGIN_ID;
    const resolvedImageEditorOptions = getImageEditorOptions(options.imageEditor);
    const registeredImageEditorPluginId = ensureImageEditorPlugin(
        uppy,
        imageEditorPluginId,
        resolvedImageEditorOptions,
    );
    const {on, off} = createDriverEventHandlers(uppy);
    const renderer = createRenderer({
        uppy,
        options,
        registeredImageEditorPluginId,
    });

    return {
        ...renderer,
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

const createUppyDashboardRenderer: FileUploaderDriverRendererFactory = ({
    uppy,
    options,
    registeredImageEditorPluginId,
}) => {
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
    };
};

const createReactDashboardRenderer: FileUploaderDriverRendererFactory = ({
    uppy,
    options,
    registeredImageEditorPluginId,
}) => {
    const runtime = loadReactDashboardRuntime();

    const getCommonDashboardProps = (mountOptions: IFileUploaderDriverMountOptions): Record<string, unknown> => {
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
    };
};

const FILE_UPLOADER_DRIVER_RENDERERS: Record<FileUploaderDriverRenderer, FileUploaderDriverRendererFactory> = {
    uppy: createUppyDashboardRenderer,
    react: createReactDashboardRenderer,
};

/**
 * Создает `FileUploader` driver поверх существующего Uppy-инстанса.
 *
 * Driver адаптирует Uppy events к абстрактным событиям компонента и монтирует Dashboard
 * через выбранный renderer.
 *
 * @example
 * const driver = createFileUploaderDriver(uppy, {
 *     renderer: 'react',
 *     dashboard: {proudlyDisplayPoweredByUppy: false},
 * });
 */
export const createFileUploaderDriver = (
    uppy: IUppyLike,
    options: ICreateFileUploaderDriverOptions = {},
): IFileUploaderDriver => {
    const renderer = FILE_UPLOADER_DRIVER_RENDERERS[options.renderer || 'uppy'];

    return createBaseUppyDriver(uppy, options, renderer);
};

const createUppyInstance = (options: ICreateUppyInstanceOptions): IUppyLike => {
    const uppyConstructor = Uppy as unknown as {new (uppyOptions?: Record<string, unknown>): IUppyLike};

    return options.uppy || options.createUppy?.() || new uppyConstructor(options.uppyOptions);
};

/**
 * Создает полный bundle для быстрого подключения `FileUploader`.
 *
 * Если проект уже управляет Uppy-инстансом сам, передайте `uppy` или `createUppy`.
 * Если нет, helper создаст Uppy из `uppyOptions`.
 *
 * @example
 * const bundle = createFileUploaderBundle({
 *     uppyOptions: {autoProceed: false},
 *     driverOptions: {renderer: 'react'},
 * });
 */
export const createFileUploaderBundle = (options: ICreateFileUploaderBundleOptions = {}): IFileUploaderBundle => {
    const uppy = createUppyInstance(options);
    const driver = createFileUploaderDriver(uppy, options.driverOptions);

    return {
        uppy,
        driver,
        destroy: () => {
            uppy.destroy();
        },
    };
};
