import {IFile, IUploadcareEnv, IUploadFile} from './UploadInput.types';

export class UploadApiService {
    private env: IUploadcareEnv;
    xhr: XMLHttpRequest | null = null;

    constructor(env: IUploadcareEnv) {
        this.env = env;
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

            formData.append('UPLOADCARE_PUB_KEY', this.env.UPLOADCARE_PUBLIC_KEY);
            formData.append('UPLOADCARE_STORE', '1');

            this.xhr.open('POST', this.env.STATIC_UPLOAD_URL);
            this.xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            this.xhr.send(formData);
        });
    }

    /** Хелпер для загрузки файлов асинхронно от формы.
     * Предполагается, что будет обёрнут в useCallback и передан в метод addEventListener или, как проп в onChange */
    uploadFile = async ({e, setProgress, onLoad, onUpload, onError}: IUploadFile): Promise<void> => {
        setProgress(0);

        const target = e.target as HTMLInputElement;
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
                    const fileUrl = this.env.STATIC_BASE_URL + result.file + '/';
                    onUpload(fileUrl);
                }
            } catch (err) {
                setProgress(0);
                !this.xhr?.UNSENT && onError('Произошла ошибка при загрузке, попробуйте еще раз.');
            }
        }
    };

    getFileName = (e: React.ChangeEvent): string | null => {
        const target = e.target as HTMLInputElement;

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
