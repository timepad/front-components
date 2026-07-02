import type {IFileUploaderFile} from './FileUploader.types';

const FILE_PRESIGN_ENDPOINT = '/file/presign/';
const FILE_PRESIGN_DEFAULT_CONTENT_TYPE = 'application/octet-stream';
const FILE_PRESIGN_INTENTS_WITH_ORIGINAL_FILENAME = new Set<FileUploaderPresignIntent>([
    'act_signed_file',
    'passport_scan',
]);

/**
 * Intent нового backend presign API `/file/presign/`.
 */
export type FileUploaderPresignIntent =
    | 'event_poster'
    | 'import_csv'
    | 'diploma_pdf'
    | 'passport_scan'
    | 'act_signed_file'
    | 'org_logo'
    | 'org_poster'
    | 'event_collection_poster'
    | 'event_collection_bg_web'
    | 'event_collection_bg_mobile'
    | 'category_image'
    | 'service_icon'
    | 'user_avatar'
    | 'content_preview_image';

/**
 * Тип passport scan для intent `passport_scan`.
 */
export type FileUploaderPassportScanKind = 'identity' | 'registration';

export type FileUploaderPresignOptionValue<T> = T | ((file: IFileUploaderFile) => T | Promise<T>);

/**
 * Тело запроса `POST /file/presign/`.
 */
export interface IFileUploaderPresignPayload {
    /** Назначение файла на backend. */
    intent: FileUploaderPresignIntent;
    /** MIME-тип файла. */
    content_type: string;
    /** Id сущности для intent-ов, которые уже привязаны к сущности. */
    entity_id?: string | number;
    /** Имя исходного файла для intent-ов `act_signed_file` и `passport_scan`. */
    original_filename?: string;
    /** Вид passport scan. Используется только для `passport_scan`. */
    kind?: FileUploaderPassportScanKind;
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
}

/**
 * Нормализованная upload-сессия, которую можно сохранить рядом с результатом загрузки.
 */
export interface IFileUploaderPresignSession {
    /** Внутренний id файла из uploader-а. */
    fileId: string;
    /** Presigned PUT URL. */
    uploadUrl: string;
    /** session_id для последующего bind/save запроса. */
    sessionId: string;
    /** Срок жизни session_id. */
    expiresAt: string;
    /** Payload, с которым был вызван backend presign endpoint. */
    payload: IFileUploaderPresignPayload;
    /** Оригинальный ответ backend-а. */
    response: IFileUploaderPresignResponse;
}

/**
 * Опции создания payload-а для `POST /file/presign/`.
 */
export interface ICreateFileUploaderPresignPayloadOptions {
    /** Intent загрузки. */
    intent: FileUploaderPresignOptionValue<FileUploaderPresignIntent>;
    /** Id сущности для intent-ов, которые уже привязаны к сущности. */
    entityId?: FileUploaderPresignOptionValue<string | number | undefined>;
    /** Вид passport scan. Обязателен для `passport_scan`. */
    kind?: FileUploaderPresignOptionValue<FileUploaderPassportScanKind | undefined>;
    /** Переопределение исходного имени файла для `act_signed_file` и `passport_scan`. */
    originalFilename?: FileUploaderPresignOptionValue<string | undefined>;
}

/**
 * Опции backend-specific helper-а `createFilePresignUploadStrategy`.
 */
export interface ICreateFilePresignUploadStrategyOptions extends ICreateFileUploaderPresignPayloadOptions {
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
        payload: IFileUploaderPresignPayload,
        file: IFileUploaderFile,
    ) => Promise<IFileUploaderPresignResponse>;
}

/**
 * Параметры загрузки в S3-compatible storage.
 *
 * Backend `/file/presign/` возвращает presigned PUT URL, на который uploader
 * отправляет файл напрямую.
 */
export interface IFileUploaderS3UploadParameters {
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
    presignSession?: IFileUploaderPresignSession;
}

/**
 * Стратегия presign-загрузки, которую можно передать upload-плагину проекта.
 */
export interface IFileUploaderS3UploadStrategy {
    /** Возвращает presign-параметры для файла из конкретной uploader-библиотеки. */
    getUploadParameters: (file: unknown) => Promise<IFileUploaderS3UploadParameters>;
    /** Возвращает сохраненную presign-сессию по файлу или file id. */
    getUploadSession?: (file: unknown) => IFileUploaderPresignSession | undefined;
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
    };
};

const requestFilePresign = async (
    file: IFileUploaderFile,
    payload: IFileUploaderPresignPayload,
    options: ICreateFilePresignUploadStrategyOptions,
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
 * `content_type` всегда, `kind` только для `passport_scan`, `original_filename`
 * только для `passport_scan` и `act_signed_file`.
 */
export const createFileUploaderPresignPayload = async (
    file: IFileUploaderFile,
    options: ICreateFileUploaderPresignPayloadOptions,
): Promise<IFileUploaderPresignPayload> => {
    const intent = await resolvePresignOptionValue(options.intent, file);
    if (!intent) {
        throw new Error('FileUploader: file presign intent is required');
    }

    const entityId = await resolvePresignOptionValue(options.entityId, file);
    const payload: IFileUploaderPresignPayload = {
        intent,
        content_type: file.type || FILE_PRESIGN_DEFAULT_CONTENT_TYPE,
    };

    if (entityId !== undefined && entityId !== null) {
        payload.entity_id = entityId;
    }

    if (FILE_PRESIGN_INTENTS_WITH_ORIGINAL_FILENAME.has(intent)) {
        const originalFilename = (await resolvePresignOptionValue(options.originalFilename, file)) || file.name;
        if (!originalFilename) {
            throw new Error(`FileUploader: original_filename is required for intent "${intent}"`);
        }

        payload.original_filename = originalFilename;
    }

    if (intent === 'passport_scan') {
        const kind = await resolvePresignOptionValue(options.kind, file);
        if (!kind) {
            throw new Error('FileUploader: kind is required for intent "passport_scan"');
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
 *     intent: 'event_poster',
 *     entityId: eventId,
 *     headers: () => ({'X-CSRFToken': csrfToken}),
 * });
 */
export const createFilePresignUploadStrategy = (
    options: ICreateFilePresignUploadStrategyOptions,
): IFileUploaderS3UploadStrategy => {
    const uploadSessions = new Map<string, IFileUploaderPresignSession>();

    return {
        getUploadParameters: async (file: unknown) => {
            const mappedFile = toFileUploaderFile(file as IFileUploaderFileLike | undefined);

            if (!mappedFile) {
                throw new Error('Uploader file is not available');
            }

            const payload = await createFileUploaderPresignPayload(mappedFile, options);
            const presignResponse = await requestFilePresign(mappedFile, payload, options);
            const presignSession: IFileUploaderPresignSession = {
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
