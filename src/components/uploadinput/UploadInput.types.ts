export interface IUploadcareEnv {
    UPLOADCARE_PUBLIC_KEY: string;
    STATIC_BASE_URL: string;
    STATIC_UPLOAD_URL: string;
}
export interface IFile {
    file: string;
}

export interface IUploadFile {
    e: Event;
    setProgress: (value: number) => void;
    onLoad: (e: Event) => void | boolean;
    onUpload: (url: string) => void;
    onError: (error: string) => void;
}
