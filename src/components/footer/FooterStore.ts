import {action, computed, observable} from 'mobx';
import axios from 'axios';
import {IFooterLinksItem} from './FooterLinks';
import {FeedbackStore} from './Feedback/FeedbackStore';

export class FooterStore {
    constructor() {
        this.feedback = new FeedbackStore();
        this.modals = new FooterModalStore();

        this.defaultLinks = [
            {
                title: 'Афиша событий',
                items: {'Найти событие': '', Рекомендуемое: '', Подписки: ''},
            },
            {
                title: 'Организаторам',
                items: {'Создать событие': '', Возможности: '', Тарифы: '', Реклама: ''},
            },
            {
                title: 'Timepad',
                items: {'О нас': '', Блог: '', Вакансии: '', Контакты: '', Документы: ''},
            },
            {
                title: 'Помощь',
                items: {'Задать вопрос': this.modals.toggleModal, 'База знаний': '', Разработчикам: ''},
            },
        ];
    }

    private readonly defaultLinks: Array<IFooterLinksItem>;
    feedback: FeedbackStore;
    modals: FooterModalStore;

    @observable
    footerData?: FooterLinks;

    @action.bound
    async fetchFooterData(): Promise<void> {
        const {
            data: {
                data: {links},
            },
        } = await axios.get<IFooterResponse>('https://timepad.local/about/links/');
        this.footerData = links;
    }

    @computed
    get normalizedLinks(): Array<IFooterLinksItem> {
        if (!this.footerData) {
            return this.defaultLinks;
        }
        const specialActions: Record<string, string | (() => void)> = {
            'Задать вопрос': this.modals.toggleModal,
        };
        return Object.entries(this.footerData).map(([name, value]) => {
            const valueCopy: typeof specialActions = {...value};

            Object.keys(specialActions).forEach((el) => {
                if (Object.keys(value).includes(el)) {
                    valueCopy[el] = specialActions[el];
                }
            });
            return {
                title: name,
                items: valueCopy,
            };
        });
    }

    @computed
    get inlineLinks(): Array<IFooterLinksItem> {
        return this.normalizedLinks?.filter((el) => el.title !== 'misc');
    }

    @computed
    get miscLinks(): MiscLinks {
        return (this.normalizedLinks?.filter((el) => el.title === 'misc')[0]?.items as MiscLinks) ?? {};
    }
}

export type MiscLinks = Record<'apple' | 'vk' | 'telegram' | 'rules' | 'google', string>;

export interface IFooterResponse {
    data: {
        links: FooterLinks;
    };
}

export type FooterLinks = Record<string, Record<string, string>>;

class FooterModalStore {
    @observable isFeedbackModalOpen = false;

    @action.bound
    toggleModal() {
        this.isFeedbackModalOpen = !this.isFeedbackModalOpen;
    }
}
