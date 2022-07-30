import axios, {AxiosResponse, CancelTokenSource} from 'axios';

export class UploadApiService {
    call?: CancelTokenSource;

    async uploadFile(formData: FormData, onProgressHandler: (event: ProgressEvent) => void): Promise<IFile> {
        if (this.call) {
            this.call.cancel();
        }

        this.call = axios.CancelToken.source();

        formData.append('UPLOADCARE_PUB_KEY', process.env.UPLOADCARE_PUBLIC_KEY);
        formData.append('UPLOADCARE_STORE', '1');
        const response: AxiosResponse<IFile> = await axios.post(process.env.STATIC_UPLOAD_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: onProgressHandler,
            cancelToken: this.call.token,
        });

        return response.data as IFile;
    }
}

export interface IFile {
    file: string;
}
