import React from 'react';
import type {ButtonVariant, IButtonProps} from '../button';
import type {IModalProps} from '../modal';

/**
 * Режим запуска загрузки.
 *
 * `manual` показывает управляющую кнопку вне Dashboard или нативную кнопку внутри Dashboard.
 * `auto` ожидает, что driver начнет загрузку сам, например через Uppy `autoProceed`.
 */
export type FileUploaderUploadStrategy = 'manual' | 'auto';

/**
 * Вариант отображения uploader-а.
 *
 * `inline` монтирует область загрузки сразу в компоненте.
 * `modal` монтирует модалку и открывает ее через trigger, переданный в `children`.
 */
export type FileUploaderViewMode = 'inline' | 'modal';

/**
 * Какая модалка используется в `viewMode="modal"`.
 *
 * `driver` делегирует модалку uploader driver-у, например Uppy DashboardModal.
 * `library` открывает модалку из `front-components`, а внутри монтирует inline uploader.
 */
export type FileUploaderModalRenderer = 'driver' | 'library';

/**
 * Нормализованный результат успешной загрузки, который компонент отдает наружу.
 */
export interface IFileUploaderResult {
    /** Внутренний id файла из driver-а. */
    fileId: string;
    /** Имя файла, если оно известно driver-у. */
    fileName: string;
    /** MIME-тип файла. */
    mimeType?: string;
    /** Размер файла в байтах. */
    size?: number;
    /** Финальный URL загруженного файла, если uploader его вернул. */
    uploadURL?: string;
    /** Оригинальный ответ upload-адаптера. */
    response?: unknown;
}

/**
 * Нормализованная ошибка загрузки.
 */
export interface IFileUploaderError {
    /** Сообщение, подходящее для логирования или показа пользователю. */
    message: string;
    /** Оригинальная ошибка или ответ driver-а. */
    cause?: unknown;
}

/**
 * Дополнительные метаданные файла, которые приходят от driver-а.
 */
export interface IFileUploaderFileMeta {
    [key: string]: unknown;
}

/**
 * Минимальный файл, с которым работает абстрактный driver.
 */
export interface IFileUploaderFile {
    /** Внутренний id файла. */
    id: string;
    /** Имя файла. */
    name?: string;
    /** MIME-тип файла. */
    type?: string;
    /** Размер файла в байтах. */
    size?: number;
    /** URL preview, если driver умеет его отдавать. */
    preview?: string;
    /** Финальный URL после загрузки. */
    uploadURL?: string;
    /** Дополнительные метаданные файла. */
    meta?: IFileUploaderFileMeta;
}

/**
 * События, которые driver должен нормализовать для `FileUploader`.
 */
export interface IFileUploaderDriverEventMap {
    /** Старт нового upload batch. */
    'upload-start': () => void;
    /** Общий прогресс загрузки в процентах от 0 до 100. */
    progress: (progress: number) => void;
    /** Успешная загрузка отдельного файла. */
    'upload-success': (file: IFileUploaderFile, response?: unknown) => void;
    /** Ошибка загрузки отдельного файла. */
    'upload-error': (file: IFileUploaderFile | undefined, error: unknown) => void;
    /** Общая ошибка driver-а. */
    error: (error: unknown) => void;
    /** Удаление файла из очереди. */
    'file-removed': (file: IFileUploaderFile) => void;
    /** Завершение upload batch, включая batch с ошибками. */
    complete: () => void;
}

/**
 * Функция отписки или очистки ресурсов, возвращаемая driver-ом.
 */
export type FileUploaderDriverCleanup = () => void;

/**
 * Опции, которые `FileUploader` передает driver-у при монтировании UI.
 */
export interface IFileUploaderDriverMountOptions {
    /** Подсказка внутри области загрузки. */
    note?: string;
    /** Высота inline Dashboard. */
    dashboardHeight?: number;
    /** Флаг блокировки uploader-а. */
    disabled?: boolean;
    /** Нужно ли показывать нативную кнопку загрузки внутри Dashboard. */
    showNativeUploadButton?: boolean;
    /** Обработчик кнопки Done внутри Dashboard. */
    doneButtonHandler?: () => void;
    /** Запрос на закрытие модалки из driver-а. */
    onRequestClose?: () => void;
}

/**
 * Объект управления смонтированным UI driver-а.
 */
export interface IFileUploaderDriverMountHandle {
    /** Очистка ресурсов mount-а. */
    cleanup?: FileUploaderDriverCleanup;
    /** Обновление mount options без полного remount. */
    setOptions?: (options: IFileUploaderDriverMountOptions) => void;
    /** Открыть модалку, если mount поддерживает modal mode. */
    open?: () => void;
    /** Закрыть модалку, если mount поддерживает modal mode. */
    close?: () => void;
    /** Полное уничтожение mount-а. */
    destroy?: () => void;
}

/**
 * Абстрактный driver для подключения любого uploader UI.
 *
 * Компонент не знает про Uppy напрямую: ему достаточно уметь смонтировать inline/modal UI,
 * подписаться на события и запустить/отменить загрузку.
 */
export interface IFileUploaderDriver {
    /** Смонтировать inline UI в переданный контейнер. */
    mountInline?: (
        container: HTMLElement,
        options: IFileUploaderDriverMountOptions,
    ) => void | FileUploaderDriverCleanup | IFileUploaderDriverMountHandle;
    /** Смонтировать modal UI в переданный контейнер. */
    mountModal?: (
        container: HTMLElement,
        options: IFileUploaderDriverMountOptions,
    ) => void | FileUploaderDriverCleanup | IFileUploaderDriverMountHandle;
    /** Подписаться на событие driver-а. */
    on?: <K extends keyof IFileUploaderDriverEventMap>(
        eventName: K,
        callback: IFileUploaderDriverEventMap[K],
    ) => void | FileUploaderDriverCleanup;
    /** Отписаться от события driver-а. */
    off?: <K extends keyof IFileUploaderDriverEventMap>(eventName: K, callback: IFileUploaderDriverEventMap[K]) => void;
    /** Запустить загрузку вручную. */
    upload?: () => void | Promise<void>;
    /** Отменить загрузки и очистить очередь. */
    cancelAll?: () => void;
    /** Уничтожить driver и его внутренние ресурсы. */
    destroy?: () => void;
}

/**
 * Аргументы render-prop trigger-а для modal mode.
 */
export interface IFileUploaderModalTriggerOptions {
    /** Uploader заблокирован. */
    disabled?: boolean;
    /** Открыть модалку загрузки. */
    open: () => void;
    /** Сейчас идет загрузка. */
    uploading: boolean;
}

/**
 * Render-prop для кастомного trigger-а модалки.
 */
export type FileUploaderModalTriggerChildren = (options: IFileUploaderModalTriggerOptions) => React.ReactNode;

/**
 * Props компонента `FileUploader`.
 */
export interface IFileUploaderProps {
    /** Дополнительный CSS-класс корневого элемента. */
    className?: string;
    /** Кастомный trigger для modal mode. */
    children?: FileUploaderModalTriggerChildren;
    /** Блокирует trigger, Dashboard и кнопку ручной загрузки. */
    disabled?: boolean;
    /** Подсказка внутри области загрузки. */
    note?: string;
    /** Высота inline Dashboard. */
    dashboardHeight?: number;
    /** Inline-дропзона или модалка. */
    viewMode?: FileUploaderViewMode;
    /** Renderer модалки для `viewMode="modal"`. */
    modalRenderer?: FileUploaderModalRenderer;
    /** Заголовок модалки библиотеки. Используется только при `modalRenderer="library"`. */
    modalTitle?: React.ReactNode;
    /** Описание под заголовком модалки библиотеки. */
    modalDescription?: React.ReactNode;
    /** Дополнительные props для модалки библиотеки. `isOpen` и `onClose` контролирует `FileUploader`. */
    modalProps?: Omit<IModalProps, 'isOpen' | 'onClose'>;
    /** Текст дефолтной кнопки открытия модалки. */
    openModalButtonText?: string;
    /** Текст внешней кнопки ручной загрузки. */
    uploadButtonText?: string;
    /** Вариант внешней кнопки ручной загрузки. */
    uploadButtonVariant?: ButtonVariant;
    /** Fixed-режим внешней кнопки ручной загрузки. */
    uploadButtonFixed?: IButtonProps['fixed'];
    /** Large-режим внешней кнопки ручной загрузки. */
    uploadButtonLarge?: IButtonProps['large'];
    /** Показывать кнопку загрузки внутри Dashboard вместо кнопки библиотеки. */
    showNativeUploadButton?: boolean;
    /** Ручная или автоматическая стратегия запуска загрузки. */
    uploadStrategy?: FileUploaderUploadStrategy;
    /** Driver, который инкапсулирует конкретную uploader-библиотеку. */
    driver: IFileUploaderDriver;
    /** Уничтожить driver при unmount компонента. */
    destroyDriverOnUnmount?: boolean;
    /** Компонент готов и получил driver. */
    onReady?: (driver: IFileUploaderDriver) => void;
    /** Началась загрузка batch-а. */
    onUploadStart?: () => void;
    /** Изменился общий прогресс загрузки. */
    onProgress?: (progress: number) => void;
    /** Успешно загрузился отдельный файл. */
    onSuccess?: (result: IFileUploaderResult) => void;
    /** Произошла ошибка загрузки или настройки driver-а. */
    onError?: (error: IFileUploaderError) => void;
    /** Файл удален из очереди. */
    onFileRemove?: (fileId: string) => void;
}
