import type {IFileUploaderFile} from './FileUploader.types';

const FILE_PRESIGN_ENDPOINT = '/file/presign/';
const FILE_PRESIGN_DEFAULT_CONTENT_TYPE = 'application/octet-stream';
const BYTES_IN_MEGABYTE = 1024 * 1024;

/**
 * Intent backend presign API `/file/presign/`.
 *
 * Конкретный список intent-ов живет в проекте-потребителе. При необходимости
 * передайте свой union как generic в `createFilePresignUploadStrategy<TIntent>()`.
 */
export type FileUploaderPresignIntent = string;

/**
 * Дополнительный `kind` для intent-ов, где backend требует уточнить тип файла.
 *
 * Конкретный список kind-ов живет в проекте-потребителе.
 */
export type FileUploaderPresignKind = string;

/**
 * Готовый union для текущего passport scan сценария.
 */
export type FileUploaderPassportScanKind = 'identity' | 'registration';

export type FileUploaderPresignOptionValue<T> = T | ((file: IFileUploaderFile) => T | Promise<T>);

export type FileUploaderPresignPredicate<TIntent extends string = FileUploaderPresignIntent> = (
    intent: TIntent,
    file: IFileUploaderFile,
) => boolean | Promise<boolean>;

/**
 * Тело запроса `POST /file/presign/`.
 */
export interface IFileUploaderPresignPayload<
    TIntent extends string = FileUploaderPresignIntent,
    TKind extends string = FileUploaderPresignKind,
> {
    /** Назначение файла на backend. */
    intent: TIntent;
    /** MIME-тип файла. */
    content_type: string;
    /** Id сущности для intent-ов, которые уже привязаны к сущности. */
    entity_id?: string | number;
    /** Имя исходного файла для intent-ов, которым backend передает исходное имя файла. */
    original_filename?: string;
    /** Дополнительный тип файла для intent-ов, которым это нужно. */
    kind?: TKind;
}

/**
 * Ответ `POST /file/presign/`.
 */
export interface IFileUploaderPresignResponse {
    /** Presigned PUT URL на S3-compatible storage. */
    upload_url: string;
    /** Подписанный token сессии, который нужно передать при сохранении сущности. */
    session_id: string;
    /** Срок жизни session_id. Presigned URL живет меньше, обычно 15 минут. */
    expires_at: string;
    /** Заголовки, которые backend требует передать при PUT-загрузке. */
    headers?: Record<string, string>;
    /** Максимальный размер файла, разрешенный upload-сессией. */
    size_limit_in_mb?: number;
}

/**
 * Нормализованная upload-сессия, которую можно сохранить рядом с результатом загрузки.
 */
export interface IFileUploaderPresignSession<
    TIntent extends string = FileUploaderPresignIntent,
    TKind extends string = FileUploaderPresignKind,
> {
    /** Внутренний id файла из uploader-а. */
    fileId: string;
    /** Presigned PUT URL. */
    uploadUrl: string;
    /** session_id для последующего bind/save запроса. */
    sessionId: string;
    /** Срок жизни session_id. */
    expiresAt: string;
    /** Payload, с которым был вызван backend presign endpoint. */
    payload: IFileUploaderPresignPayload<TIntent, TKind>;
    /** Оригинальный ответ backend-а. */
    response: IFileUploaderPresignResponse;
}

/**
 * Опции создания payload-а для `POST /file/presign/`.
 */
export interface ICreateFileUploaderPresignPayloadOptions<
    TIntent extends string = FileUploaderPresignIntent,
    TKind extends string = FileUploaderPresignKind,
> {
    /** Intent загрузки. */
    intent: FileUploaderPresignOptionValue<TIntent>;
    /** Id сущности для intent-ов, которые уже привязаны к сущности. */
    entityId?: FileUploaderPresignOptionValue<string | number | undefined>;
    /** Дополнительный тип файла для intent-ов, которым это нужно. */
    kind?: FileUploaderPresignOptionValue<TKind | undefined>;
    /** Переопределение исходного имени файла для intent-ов, которым backend передает исходное имя файла. */
    originalFilename?: FileUploaderPresignOptionValue<string | undefined>;
    /** Intent-ы, для которых нужно отправлять `original_filename`. */
    originalFilenameIntents?: readonly TIntent[];
    /** Кастомное правило отправки `original_filename`. Имеет приоритет над `originalFilenameIntents`. */
    shouldSendOriginalFilename?: FileUploaderPresignPredicate<TIntent>;
    /** Intent-ы, для которых нужно отправлять `kind`. */
    kindIntents?: readonly TIntent[];
    /** Кастомное правило отправки `kind`. Имеет приоритет над `kindIntents`. */
    shouldSendKind?: FileUploaderPresignPredicate<TIntent>;
}

/**
 * Опции backend-specific helper-а `createFilePresignUploadStrategy`.
 */
export interface ICreateFilePresignUploadStrategyOptions<
    TIntent extends string = FileUploaderPresignIntent,
    TKind extends string = FileUploaderPresignKind,
> extends ICreateFileUploaderPresignPayloadOptions<TIntent, TKind> {
    /** Endpoint presign API. По умолчанию `/file/presign/`. */
    endpoint?: string;
    /** Дополнительные headers для JSON presign-запроса, например CSRF. */
    headers?: FileUploaderPresignOptionValue<Record<string, string> | undefined>;
    /** Fetch credentials для presign-запроса. */
    credentials?: RequestCredentials;
    /** Кастомный fetch, если проект использует свой HTTP client. */
    fetcher?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
    /** Полностью кастомный presign-запрос. Имеет приоритет над `endpoint`/`fetcher`. */
    requestPresign?: (
        payload: IFileUploaderPresignPayload<TIntent, TKind>,
        file: IFileUploaderFile,
    ) => Promise<IFileUploaderPresignResponse>;
}

/**
 * Параметры загрузки в S3-compatible storage.
 *
 * Backend `/file/presign/` возвращает presigned PUT URL, на который uploader
 * отправляет файл напрямую.
 */
export interface IFileUploaderS3UploadParameters<
    TIntent extends string = FileUploaderPresignIntent,
    TKind extends string = FileUploaderPresignKind,
> {
    /** HTTP-метод загрузки. */
    method?: 'PUT';
    /** Presigned PUT URL. */
    url: string;
    /** Заголовки для PUT-загрузки. */
    headers?: Record<string, string>;
    /** session_id из backend presign API, если он есть. */
    sessionId?: string;
    /** Срок жизни session_id, если он есть. */
    expiresAt?: string;
    /** Нормализованная presign-сессия. */
    presignSession?: IFileUploaderPresignSession<TIntent, TKind>;
}

/**
 * Стратегия presign-загрузки, которую можно передать upload-плагину проекта.
 */
export interface IFileUploaderS3UploadStrategy<
    TIntent extends string = FileUploaderPresignIntent,
    TKind extends string = FileUploaderPresignKind,
> {
    /** Возвращает presign-параметры для файла из конкретной uploader-библиотеки. */
    getUploadParameters: (file: unknown) => Promise<IFileUploaderS3UploadParameters<TIntent, TKind>>;
    /** Возвращает сохраненную presign-сессию по файлу или file id. */
    getUploadSession?: (file: unknown) => IFileUploaderPresignSession<TIntent, TKind> | undefined;
    /** Удаляет сохраненную presign-сессию, если она больше не нужна. */
    clearUploadSession?: (file: unknown) => void;
}

interface IFileUploaderFileLike {
    id: string;
    name?: string;
    type?: string;
    size?: number;
    preview?: string;
    uploadURL?: string;
    meta?: Record<string, unknown>;
}

const toFileUploaderFile = (file: IFileUploaderFileLike | undefined): IFileUploaderFile | undefined => {
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

const resolvePresignOptionValue = async <T>(
    value: FileUploaderPresignOptionValue<T> | undefined,
    file: IFileUploaderFile,
): Promise<T | undefined> => {
    if (typeof value === 'function') {
        return (value as (file: IFileUploaderFile) => T | Promise<T>)(file);
    }

    return value;
};

const hasPresignIntent = <TIntent extends string>(
    intents: readonly TIntent[] | undefined,
    intent: TIntent,
): boolean => {
    return Boolean(intents?.includes(intent));
};

const shouldSendOriginalFilename = async <TIntent extends string>(
    intent: TIntent,
    file: IFileUploaderFile,
    options: ICreateFileUploaderPresignPayloadOptions<TIntent>,
): Promise<boolean> => {
    if (options.shouldSendOriginalFilename) {
        return options.shouldSendOriginalFilename(intent, file);
    }

    return hasPresignIntent(options.originalFilenameIntents, intent);
};

const shouldSendKind = async <TIntent extends string>(
    intent: TIntent,
    file: IFileUploaderFile,
    options: ICreateFileUploaderPresignPayloadOptions<TIntent>,
): Promise<boolean> => {
    if (options.shouldSendKind) {
        return options.shouldSendKind(intent, file);
    }

    return hasPresignIntent(options.kindIntents, intent);
};

const getUploadSessionFileId = (file: unknown): string | undefined => {
    if (typeof file === 'string') {
        return file;
    }

    return toFileUploaderFile(file as IFileUploaderFileLike | undefined)?.id;
};

const assertFilePresignResponse = (response: unknown): IFileUploaderPresignResponse => {
    if (!response || typeof response !== 'object') {
        throw new Error('FileUploader: invalid file presign response');
    }

    const presignResponse = response as Partial<IFileUploaderPresignResponse>;
    if (!presignResponse.upload_url || !presignResponse.session_id || !presignResponse.expires_at) {
        throw new Error('FileUploader: file presign response must contain upload_url, session_id and expires_at');
    }

    return {
        upload_url: presignResponse.upload_url,
        session_id: presignResponse.session_id,
        expires_at: presignResponse.expires_at,
        headers: presignResponse.headers,
        size_limit_in_mb: presignResponse.size_limit_in_mb,
    };
};

const requestFilePresign = async <
    TIntent extends string = FileUploaderPresignIntent,
    TKind extends string = FileUploaderPresignKind,
>(
    file: IFileUploaderFile,
    payload: IFileUploaderPresignPayload<TIntent, TKind>,
    options: ICreateFilePresignUploadStrategyOptions<TIntent, TKind>,
): Promise<IFileUploaderPresignResponse> => {
    if (options.requestPresign) {
        return assertFilePresignResponse(await options.requestPresign(payload, file));
    }

    const fetcher = options.fetcher || (typeof fetch === 'function' ? fetch.bind(globalThis) : undefined);
    if (!fetcher) {
        throw new Error('FileUploader: fetch is unavailable, pass requestPresign or fetcher');
    }

    const headers = (await resolvePresignOptionValue(options.headers, file)) || {};
    const response = await fetcher(options.endpoint || FILE_PRESIGN_ENDPOINT, {
        method: 'POST',
        credentials: options.credentials,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`FileUploader: file presign request failed with status ${response.status}`);
    }

    return assertFilePresignResponse(await response.json());
};

/**
 * Создает payload для backend endpoint-а `POST /file/presign/`.
 *
 * Helper добавляет только те поля, которые нужны backend-контракту:
 * `content_type` всегда, `original_filename` и `kind` только по правилам,
 * переданным из проекта.
 */
export const createFileUploaderPresignPayload = async <
    TIntent extends string = FileUploaderPresignIntent,
    TKind extends string = FileUploaderPresignKind,
>(
    file: IFileUploaderFile,
    options: ICreateFileUploaderPresignPayloadOptions<TIntent, TKind>,
): Promise<IFileUploaderPresignPayload<TIntent, TKind>> => {
    const intent = await resolvePresignOptionValue(options.intent, file);
    if (!intent) {
        throw new Error('FileUploader: file presign intent is required');
    }

    const entityId = await resolvePresignOptionValue(options.entityId, file);
    const payload: IFileUploaderPresignPayload<TIntent, TKind> = {
        intent,
        content_type: file.type || FILE_PRESIGN_DEFAULT_CONTENT_TYPE,
    };

    if (entityId !== undefined && entityId !== null) {
        payload.entity_id = entityId;
    }

    if (await shouldSendOriginalFilename(intent, file, options)) {
        const originalFilename = (await resolvePresignOptionValue(options.originalFilename, file)) || file.name;
        if (!originalFilename) {
            throw new Error(`FileUploader: original_filename is required for intent "${intent}"`);
        }

        payload.original_filename = originalFilename;
    }

    const kind = await resolvePresignOptionValue(options.kind, file);
    if (kind !== undefined || (await shouldSendKind(intent, file, options))) {
        if (!kind) {
            throw new Error(`FileUploader: kind is required for intent "${intent}"`);
        }

        payload.kind = kind;
    }

    return payload;
};

/**
 * Создает upload strategy для backend flow:
 *
 * 1. `POST /file/presign/` получает `upload_url`, `session_id`, `expires_at`.
 * 2. Uploader делает прямой `PUT` файла на `upload_url`.
 * 3. Проект забирает `session_id` через `getUploadSession(fileId)` и передает его
 *    при сохранении сущности.
 *
 * @example
 * const uploadStrategy = createFilePresignUploadStrategy({
 *     intent: projectIntent,
 *     entityId: eventId,
 *     originalFilenameIntents: [intentWithOriginalFilename],
 *     headers: () => ({'X-CSRFToken': csrfToken}),
 * });
 */
export const createFilePresignUploadStrategy = <
    TIntent extends string = FileUploaderPresignIntent,
    TKind extends string = FileUploaderPresignKind,
>(
    options: ICreateFilePresignUploadStrategyOptions<TIntent, TKind>,
): IFileUploaderS3UploadStrategy<TIntent, TKind> => {
    const uploadSessions = new Map<string, IFileUploaderPresignSession<TIntent, TKind>>();

    return {
        getUploadParameters: async (file: unknown) => {
            const mappedFile = toFileUploaderFile(file as IFileUploaderFileLike | undefined);

            if (!mappedFile) {
                throw new Error('Uploader file is not available');
            }

            const payload = await createFileUploaderPresignPayload(mappedFile, options);
            const presignResponse = await requestFilePresign(mappedFile, payload, options);
            const sizeLimitInBytes = presignResponse.size_limit_in_mb
                ? presignResponse.size_limit_in_mb * BYTES_IN_MEGABYTE
                : undefined;

            if (sizeLimitInBytes && mappedFile.size && mappedFile.size > sizeLimitInBytes) {
                throw new Error(`File size exceeds the ${presignResponse.size_limit_in_mb} MB limit`);
            }

            const presignSession: IFileUploaderPresignSession<TIntent, TKind> = {
                fileId: mappedFile.id,
                uploadUrl: presignResponse.upload_url,
                sessionId: presignResponse.session_id,
                expiresAt: presignResponse.expires_at,
                payload,
                response: presignResponse,
            };

            uploadSessions.set(mappedFile.id, presignSession);

            return {
                method: 'PUT',
                url: presignResponse.upload_url,
                headers: {
                    'Content-Type': payload.content_type,
                    ...presignResponse.headers,
                },
                sessionId: presignResponse.session_id,
                expiresAt: presignResponse.expires_at,
                presignSession,
            };
        },
        getUploadSession: (file: unknown) => {
            const fileId = getUploadSessionFileId(file);

            return fileId ? uploadSessions.get(fileId) : undefined;
        },
        clearUploadSession: (file: unknown) => {
            const fileId = getUploadSessionFileId(file);
            if (fileId) {
                uploadSessions.delete(fileId);
            }
        },
    };
};
