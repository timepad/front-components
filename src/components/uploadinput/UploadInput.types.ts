export interface IUploadcareConfig {
    UPLOADCARE_PUBLIC_KEY: string;
    STATIC_BASE_URL: string;
    STATIC_UPLOAD_URL: string;
}
export interface IFile {
    file: string;
}

export interface IUploadFile {
    event: React.ChangeEvent;
    setProgress: (value: number) => void;
    onLoad: (e: Event) => void | boolean;
    onUpload: (url: string) => void;
    onError: (error: string) => void;
}
