import {IFile, IUploadcareConfig, IUploadFile} from './UploadInput.types';

export class UploadApiService {
    private config: IUploadcareConfig = {} as IUploadcareConfig;
    xhr: XMLHttpRequest | null = null;
    private static instance: UploadApiService | null = null;

    constructor(config: IUploadcareConfig) {
        if (UploadApiService.instance && typeof UploadApiService.instance === 'object') {
            return UploadApiService.instance;
        }
        this.config = config;
        UploadApiService.instance = this;
        return this;
    }

    async fetchFile(formData: FormData, onUploadProgressHandler: (event: ProgressEvent) => void): Promise<IFile> {
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = new XMLHttpRequest();

        return new Promise<IFile>((resolve, reject) => {
            if (!this.xhr) {
                return reject(new Error('xhr is not initialized'));
            }

            this.xhr.upload.onprogress = onUploadProgressHandler;

            this.xhr.onreadystatechange = () => {
                if (this.xhr?.readyState === XMLHttpRequest.DONE) {
                    if (this.xhr.status >= 200 && this.xhr.status < 300) {
                        try {
                            const response: IFile = JSON.parse(this.xhr.responseText);
                            resolve(response);
                        } catch (e) {
                            reject(new Error('Failed to parse response'));
                        }
                    } else {
                        reject(new Error(`HTTP error! status: ${this.xhr.status}`));
                    }
                }
            };
            this.xhr.onerror = () => {
                reject(new Error('Network error occurred'));
            };

            this.xhr.onabort = () => {
                reject(new Error('Request aborted'));
            };

            formData.append('UPLOADCARE_PUB_KEY', this.config.UPLOADCARE_PUBLIC_KEY);
            formData.append('UPLOADCARE_STORE', '1');

            this.xhr.open('POST', this.config.STATIC_UPLOAD_URL);
            this.xhr.send(formData);
        });
    }

    uploadFile = async ({event, setProgress, onLoad, onUpload, onError}: IUploadFile): Promise<void> => {
        setProgress(0);

        const target = event.target;
        const files = target.files;
        if (files?.length) {
            const file = files[0];

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = function (event) {
                onLoad(event);
            };

            const formData = new FormData();
            formData.append('file', file);

            try {
                const result = await this.fetchFile(formData, this.updateProgress(setProgress));
                if (result) {
                    const fileUrl = this.config.STATIC_BASE_URL + result.file + '/';
                    onUpload(fileUrl);
                }
            } catch (err) {
                setProgress(0);
                !this.xhr?.UNSENT && onError('Произошла ошибка при загрузке, попробуйте еще раз.');
            }
        }
    };

    getFileName = (event: React.ChangeEvent<HTMLInputElement>): string | null => {
        const target = event.target;

        const files = target.files;
        if (files?.length) {
            const file = files[0];
            return file?.name;
        }
        return null;
    };

    private updateProgress = (setProgress: IUploadFile['setProgress']) => (event: ProgressEvent) => {
        const percentCompleted = Math.floor((event.loaded * 100) / event.total);
        setProgress(percentCompleted);
    };
}
