export interface IUploadcareConfig {
    UPLOADCARE_PUBLIC_KEY: string;
    STATIC_BASE_URL: string;
    STATIC_UPLOAD_URL: string;
}
export interface IFile {
    file: string;
}

export interface IUploadFile {
    event: React.ChangeEvent<HTMLInputElement>;
    setProgress: (value: number) => void;
    onLoad: (e: Event) => void | boolean;
    onUpload: (url: string) => void;
    onError: (error: string) => void;
}

export interface IUploadInputProps {
    name: string;
    config: IUploadcareConfig;
    label?: string;
    onChange: (name: string, value: string) => void;
    setStatus: (status: string) => void;
    onLoad?: IUploadFile['onLoad'];
    setProgress?: IUploadFile['setProgress'];
    onError?: IUploadFile['onError'];
}
