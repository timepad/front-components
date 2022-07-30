import {observable, action, computed} from 'mobx';
import axios from 'axios';

export class FeedbackStore {
    @observable sendingForm = false;

    @observable error?: any;

    @observable result?: IFeedbackResponse;
    // TODO: типизировать это и заполнять данными
    @observable user = {
        name: '',
        email: '',
        phone: '',
    };
    @computed
    get response(): string | null {
        if (!this.error && this.result?.text) {
            return this.result?.text;
        } else {
            return null;
        }
    }

    @action.bound
    async sendFeedback(request: IFeedbackRequest): Promise<void> {
        this.sendingForm = true;
        this.error = null;

        try {
            this.result = await axios.post('https://ontp.timepad.ru/api/feedback', request);
        } catch (err: any) {
            this.error = err;
        } finally {
            this.sendingForm = false;
        }
    }
}

export interface IFeedbackRequest {
    fb_user_role: string;
    fb_fromname: string;
    fb_from: string;
    fb_from_f: string;
    fb_subject: string;
    fb_message: string;
    fb_ata?: string;
}

export interface IFeedbackResponse {
    result: string;
    text?: string;
    ticket?: number;
}
