import React from 'react';

import {Dashboard, Uppy} from './FileUploader.uppyRuntime';

import {
    IFileUploaderDriver,
    IFileUploaderDriverEventMap,
    IFileUploaderDriverMountHandle,
    IFileUploaderDriverMountOptions,
} from './FileUploader.types';
import {IFileUploaderSourceFile, normalizeFileUploaderFile} from './FileUploader.fileNormalizer';

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
type DashboardMountMode = 'inline' | 'modal';

/**
 * Опции Uppy ImageEditor.
 */
export interface IUppyImageEditorOptions {
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
export interface IUppyDashboardOptions {
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
    /** Скрывать детали прогресса загрузки. */
    hideProgressDetails?: boolean;
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
export const DEFAULT_IMAGE_EDITOR_OPTIONS: IUppyImageEditorOptions = {
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
 * `vanilla` использует plugin API `@uppy/dashboard`.
 * React runtime передается из отдельного entry point `uppyReact`, чтобы vanilla-драйвер
 * не зависел от `@uppy/react` и `react-dom/client`.
 */
export type UppyDashboardRenderer = 'vanilla' | IUppyReactRendererRuntime;

/**
 * Runtime React renderer-а, изолированный в отдельном entry point.
 */
export interface IUppyReactRendererRuntime {
    type: 'react';
    createRoot: (container: HTMLElement) => IReactRootLike;
    flushSync?: (callback: () => void) => void;
    DashboardComponent: React.ComponentType<Record<string, unknown>>;
    DashboardModalComponent: React.ComponentType<Record<string, unknown>>;
}

/**
 * Опции создания driver-а поверх Uppy.
 */
export interface ICreateUppyFileUploaderDriverOptions {
    /** Renderer Dashboard UI. */
    dashboardRenderer?: UppyDashboardRenderer;
    /** Базовый id Dashboard plugin-а. */
    dashboardPluginId?: string;
    /** Id ImageEditor plugin-а. */
    imageEditorPluginId?: string;
    /** Конфиг ImageEditor. `false` отключает ImageEditor. */
    imageEditor?: IUppyImageEditorOptions | false;
    /** ImageEditor plugin из отдельного entry point `uppyImageEditor`. */
    imageEditorPlugin?: unknown;
    /** Опции Dashboard. */
    dashboard?: IUppyDashboardOptions;
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
 * Опции создания интеграции `uppy + driver`.
 */
export interface ICreateUppyFileUploaderIntegrationOptions {
    /** Готовый Uppy-инстанс из проекта. */
    uppy?: IUppyLike;
    /** Опции для создания Uppy, если `uppy` и `createUppy` не переданы. */
    uppyOptions?: Record<string, unknown>;
    /** Фабрика Uppy-инстанса из проекта. */
    createUppy?: () => IUppyLike;
    /** Опции driver-а поверх Uppy. */
    driverOptions?: ICreateUppyFileUploaderDriverOptions;
}

/**
 * Готовая Uppy-интеграция для подключения `FileUploader`.
 */
export interface IUppyFileUploaderIntegration {
    /** Uppy-инстанс, созданный или переданный проектом. */
    uppy: IUppyLike;
    /** Абстрактный driver для компонента `FileUploader`. */
    driver: IFileUploaderDriver;
    /** Уничтожает Uppy-инстанс и связанные ресурсы. */
    destroy: () => void;
}

interface IDashboardPluginLike {
    setOptions: (options: Record<string, unknown>) => void;
    openModal: () => Promise<void> | void;
    closeModal: (options?: Record<string, unknown>) => Promise<void> | void;
}

export interface IReactRootLike {
    render: (node: React.ReactElement) => void;
    unmount: () => void;
}

let dashboardMountCounter = 0;

type IUppyDashboardConfig = Pick<ICreateUppyFileUploaderDriverOptions, 'dashboard' | 'plugins'>;
type UppyDashboardMountMethods = Pick<IFileUploaderDriver, 'mountInline' | 'mountModal'>;

interface ICreateUppyInstanceOptions {
    uppy?: IUppyLike;
    uppyOptions?: Record<string, unknown>;
    createUppy?: () => IUppyLike;
}

interface ICreateDashboardMountsContext {
    uppy: IUppyLike;
    options: ICreateUppyFileUploaderDriverOptions;
    registeredImageEditorPluginId: string | null;
}

type UppyDashboardMountFactory = (context: ICreateDashboardMountsContext) => UppyDashboardMountMethods;

const deferTask = (callback: () => void) => {
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(() => {
            callback();
        });
        return;
    }

    setTimeout(callback, 0);
};

const getImageEditorOptions = (
    imageEditorOptions: IUppyImageEditorOptions | false | undefined,
): IUppyImageEditorOptions | false => {
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

const createDashboardPluginId = (basePluginId: string, mode: DashboardMountMode): string => {
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
    dashboardOptions: IUppyDashboardOptions | undefined,
): IUppyDashboardOptions => {
    return {
        ...dashboardOptions,
        note: mountOptions.note ?? dashboardOptions?.note,
        disabled: mountOptions.disabled ?? dashboardOptions?.disabled,
        plugins: pluginIds,
        hideUploadButton: !mountOptions.showDriverUploadButton,
        doneButtonHandler: mountOptions.onDone,
    };
};

const resolveCloseModalOnClickOutside = (dashboardOptions: IUppyDashboardOptions | undefined): boolean => {
    return dashboardOptions?.closeModalOnClickOutside ?? true;
};

const ensureImageEditorPlugin = (
    uppy: IUppyLike,
    imageEditorPluginId: string,
    imageEditorOptions: IUppyImageEditorOptions | false,
    imageEditorPlugin: unknown,
): string | null => {
    if (imageEditorOptions === false) {
        return null;
    }

    const existingPlugin = uppy.getPlugin(imageEditorPluginId);
    if (existingPlugin) {
        return imageEditorPluginId;
    }

    if (!imageEditorPlugin) {
        throw new Error(
            'FileUploader: imageEditorPlugin is required when ImageEditor is enabled. Import it from "uppyImageEditor".',
        );
    }

    uppy.use(imageEditorPlugin, {
        id: imageEditorPluginId,
        ...imageEditorOptions,
    });

    return imageEditorPluginId;
};

const mountDashboard = (
    uppy: IUppyLike,
    mode: DashboardMountMode,
    container: HTMLElement,
    mountOptions: IFileUploaderDriverMountOptions,
    config: IUppyDashboardConfig & {dashboardPluginId?: string},
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
                  height: mountOptions.contentHeight,
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
    mode: DashboardMountMode,
    mountOptions: IFileUploaderDriverMountOptions,
    config: IUppyDashboardConfig,
    imageEditorPluginId: string | null,
): void => {
    const pluginIds = buildPluginIds(imageEditorPluginId, config.plugins, config.dashboard?.plugins);
    const commonOptions = buildDashboardCommonOptions(mountOptions, pluginIds, config.dashboard);

    if (mode === 'inline') {
        dashboard.setOptions({
            ...commonOptions,
            inline: true,
            height: mountOptions.contentHeight,
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
    mode: DashboardMountMode,
    config: IUppyDashboardConfig,
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
                    const [uppyFile, response] = args as [IFileUploaderSourceFile | undefined, unknown];
                    const file = normalizeFileUploaderFile(uppyFile);
                    if (!file) {
                        return;
                    }

                    (callback as IFileUploaderDriverEventMap['upload-success'])(file, response);
                    return;
                }
                case 'upload-error': {
                    const [uppyFile, error] = args as [IFileUploaderSourceFile | undefined, unknown];
                    const file = normalizeFileUploaderFile(uppyFile);
                    (callback as IFileUploaderDriverEventMap['upload-error'])(file, error);
                    return;
                }
                case 'error': {
                    const [error] = args as [unknown];
                    (callback as IFileUploaderDriverEventMap['error'])(error);
                    return;
                }
                case 'file-removed': {
                    const [uppyFile] = args as [IFileUploaderSourceFile | undefined];
                    const file = normalizeFileUploaderFile(uppyFile);
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
        // Host renderers such as Storybook may still be completing their own React teardown here.
        // Leave that lifecycle before unmounting the nested Dashboard root.
        setTimeout(() => {
            state.root.unmount();
        }, 0);
    });
};

interface IReactRootState {
    root: IReactRootLike;
    destroyed: boolean;
}

interface IReactMountRenderContext {
    mountOptions: IFileUploaderDriverMountOptions;
    render: () => void;
    rootState: IReactRootState;
}

type ReactMountControlsFactory = (render: () => void) => Pick<IFileUploaderDriverMountHandle, 'open' | 'close'>;

const createReactMountHandle = (
    reactRuntime: IUppyReactRendererRuntime,
    container: HTMLElement,
    initialMountOptions: IFileUploaderDriverMountOptions,
    renderDashboard: (context: IReactMountRenderContext) => void,
    createControls?: ReactMountControlsFactory,
): IFileUploaderDriverMountHandle => {
    const rootState: IReactRootState = {root: reactRuntime.createRoot(container), destroyed: false};
    let currentMountOptions = initialMountOptions;

    const render = () => {
        if (rootState.destroyed) {
            return;
        }

        renderDashboard({mountOptions: currentMountOptions, render, rootState});
    };
    const destroy = () => destroyReactRoot(rootState);
    const mountHandle: IFileUploaderDriverMountHandle = {
        setOptions: (nextOptions) => {
            currentMountOptions = nextOptions;
            render();
        },
        destroy,
        ...createControls?.(render),
    };

    render();

    return mountHandle;
};

const buildUppyFileUploaderDriver = (
    uppy: IUppyLike,
    options: ICreateUppyFileUploaderDriverOptions,
    createDashboardMounts: UppyDashboardMountFactory,
): IFileUploaderDriver => {
    const imageEditorPluginId = options.imageEditorPluginId || DEFAULT_IMAGE_EDITOR_PLUGIN_ID;
    const resolvedImageEditorOptions = getImageEditorOptions(options.imageEditor);
    const registeredImageEditorPluginId = ensureImageEditorPlugin(
        uppy,
        imageEditorPluginId,
        resolvedImageEditorOptions,
        options.imageEditorPlugin,
    );
    const {on, off} = createDriverEventHandlers(uppy);
    const dashboardMounts = createDashboardMounts({
        uppy,
        options,
        registeredImageEditorPluginId,
    });

    return {
        ...dashboardMounts,
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

const createVanillaDashboardMounts: UppyDashboardMountFactory = ({uppy, options, registeredImageEditorPluginId}) => {
    const createMount = (mode: DashboardMountMode) => {
        return (container: HTMLElement, mountOptions: IFileUploaderDriverMountOptions) => {
            const dashboard = mountDashboard(
                uppy,
                mode,
                container,
                mountOptions,
                options,
                registeredImageEditorPluginId,
            );

            return createDashboardMountHandle(uppy, dashboard, mode, options, registeredImageEditorPluginId);
        };
    };

    return {
        mountInline: createMount('inline'),
        mountModal: createMount('modal'),
    };
};

const createReactDashboardMounts: UppyDashboardMountFactory = ({uppy, options, registeredImageEditorPluginId}) => {
    const reactRuntime = options.dashboardRenderer;
    if (!reactRuntime || reactRuntime === 'vanilla') {
        throw new Error('FileUploader: React renderer runtime is not configured');
    }

    const getCommonDashboardProps = (mountOptions: IFileUploaderDriverMountOptions): Record<string, unknown> => {
        const pluginIds = buildPluginIds(registeredImageEditorPluginId, options.plugins, options.dashboard?.plugins);

        return buildDashboardCommonOptions(mountOptions, pluginIds, options.dashboard);
    };

    return {
        mountInline: (container, mountOptions) => {
            return createReactMountHandle(
                reactRuntime,
                container,
                mountOptions,
                ({mountOptions: currentOptions, rootState}) => {
                    const commonProps = getCommonDashboardProps(currentOptions);
                    rootState.root.render(
                        React.createElement(reactRuntime.DashboardComponent, {
                            uppy,
                            ...commonProps,
                            height: currentOptions.contentHeight,
                        }),
                    );
                },
            );
        },
        mountModal: (container, mountOptions) => {
            let isOpen = false;
            let renderRevision = 0;

            return createReactMountHandle(
                reactRuntime,
                container,
                mountOptions,
                ({mountOptions: currentOptions, render, rootState}) => {
                    renderRevision += 1;
                    const currentRenderRevision = renderRevision;
                    const commonProps = getCommonDashboardProps(currentOptions);
                    const dashboardModal = React.createElement(reactRuntime.DashboardModalComponent, {
                        uppy,
                        ...commonProps,
                        open: isOpen,
                        onRequestClose: () => {
                            isOpen = false;
                            currentOptions.onRequestClose?.();
                            render();
                        },
                        closeModalOnClickOutside: resolveCloseModalOnClickOutside(options.dashboard),
                    });

                    deferTask(() => {
                        if (rootState.destroyed || currentRenderRevision !== renderRevision) {
                            return;
                        }

                        if (reactRuntime.flushSync) {
                            reactRuntime.flushSync(() => {
                                rootState.root.render(dashboardModal);
                            });
                            return;
                        }

                        rootState.root.render(dashboardModal);
                    });
                },
                (render) => ({
                    open: () => {
                        isOpen = true;
                        render();
                    },
                    close: () => {
                        isOpen = false;
                        render();
                    },
                }),
            );
        },
    };
};

/**
 * Создает `FileUploader` driver поверх существующего Uppy-инстанса.
 *
 * Driver адаптирует Uppy events к абстрактным событиям компонента и монтирует Dashboard
 * через выбранный renderer.
 *
 * @example
 * const driver = createUppyFileUploaderDriver(uppy, {
 *     dashboard: {proudlyDisplayPoweredByUppy: false},
 * });
 *
 * // Для React renderer-а используйте createReactUppyFileUploaderDriver
 * // из отдельного entry point `uppyReact`.
 */
export const createUppyFileUploaderDriver = (
    uppy: IUppyLike,
    options: ICreateUppyFileUploaderDriverOptions = {},
): IFileUploaderDriver => {
    const createDashboardMounts =
        !options.dashboardRenderer || options.dashboardRenderer === 'vanilla'
            ? createVanillaDashboardMounts
            : createReactDashboardMounts;

    return buildUppyFileUploaderDriver(uppy, options, createDashboardMounts);
};

const createUppyInstance = (options: ICreateUppyInstanceOptions): IUppyLike => {
    const uppyConstructor = Uppy as unknown as {new (uppyOptions?: Record<string, unknown>): IUppyLike};

    return options.uppy || options.createUppy?.() || new uppyConstructor(options.uppyOptions);
};

/**
 * Создает готовую Uppy-интеграцию для быстрого подключения `FileUploader`.
 *
 * Если проект уже управляет Uppy-инстансом сам, передайте `uppy` или `createUppy`.
 * Если нет, helper создаст Uppy из `uppyOptions`.
 *
 * @example
 * const integration = createUppyFileUploaderIntegration({
 *     uppyOptions: {autoProceed: false},
 *     driverOptions: {imageEditor: false},
 * });
 *
 * // Для React renderer-а используйте createReactUppyFileUploaderIntegration
 * // из отдельного entry point `uppyReact`.
 */
export const createUppyFileUploaderIntegration = (
    options: ICreateUppyFileUploaderIntegrationOptions = {},
): IUppyFileUploaderIntegration => {
    const uppy = createUppyInstance(options);
    const driver = createUppyFileUploaderDriver(uppy, options.driverOptions);

    return {
        uppy,
        driver,
        destroy: () => {
            uppy.destroy();
        },
    };
};
