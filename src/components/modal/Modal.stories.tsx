import * as React from 'react';
import {action} from '@storybook/addon-actions';
import {Modal} from './Modal';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import '../../assets/css/bundle.less';

export default {
    title: 'Modal',
    component: Modal,
} as Meta;

const Child = () => <div style={{width: '100px', height: '100px'}} />;

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Simple Modal Example</StoryTitle>
            <Modal isOpen={true} title="Модальное окно">
                <Child />
            </Modal>
        </>
    );
};

export const Basic = () => {
    return (
        <Modal isOpen={true} title="Модальное окно">
            <Child />
        </Modal>
    );
};

export const WithDescription = () => {
    return (
        <Modal isOpen={true} title="Модальное окно" description="Описание заголовка">
            <Child />
        </Modal>
    );
};

export const Closable = () => {
    return (
        <Modal isOpen={true} title="Модальное окно" onRequestClose={action('close-button-click')}>
            <Child />
        </Modal>
    );
};

export const WithBackButton = () => {
    return (
        <Modal isOpen={true} title="Модальное окно" backHandler={action('back-button-click')}>
            <Child />
        </Modal>
    );
};

export const WithButtons = () => {
    return (
        <Modal
            isOpen={true}
            title="Модальное окно"
            submitLabel="OK"
            submitHandler={action('submit-button-click')}
            cancelLabel="Cancel"
            cancelHandler={action('cancel-button-click')}
        >
            <Child />
        </Modal>
    );
};

export const WithDisabledButtons = () => {
    return (
        <Modal
            isOpen={true}
            title="Модальное окно"
            submitLabel="OK"
            submitHandler={action('submit-button-click')}
            submitDisabled={true}
            cancelLabel="Cancel"
            cancelHandler={action('cancel-button-click')}
            cancelDisabled={true}
        >
            <Child />
        </Modal>
    );
};
