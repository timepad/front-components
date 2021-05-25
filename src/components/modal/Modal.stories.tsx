import * as React from 'react';
import {action} from '@storybook/addon-actions';
import {Modal} from './Modal';
import {Meta} from '@storybook/react/types-6-0';
import '../../assets/css/bundle.less';

export default {
    title: 'Modal',
    component: Modal,
} as Meta;

const Child: React.FC = () => <div style={{width: '100px', height: '100px'}} />;

export const Basic: React.FC = () => {
    return (
        <Modal isOpen={true}>
            <Modal.Header title="Модальное окно" />
            <Modal.Body>
                <Child />
            </Modal.Body>
        </Modal>
    );
};

export const WithDescription: React.FC = () => {
    return (
        <Modal isOpen={true}>
            <Modal.Header title="Модальное окно" description="Описание заголовка" />
            <Modal.Body>
                <Child />
            </Modal.Body>
        </Modal>
    );
};

export const Closable: React.FC = () => {
    return (
        <Modal isOpen={true} onRequestClose={action('close-button-click')}>
            <Modal.Header title="Модальное окно" />
            <Modal.Body>
                <Child />
            </Modal.Body>
        </Modal>
    );
};

export const WithBackButto: React.FC = () => {
    return (
        <Modal isOpen={true}>
            <Modal.Header title="Модальное окно" backHandler={action('back-button-click')} />
            <Modal.Body>
                <Child />
            </Modal.Body>
        </Modal>
    );
};

export const WithButtons: React.FC = () => {
    return (
        <Modal isOpen={true}>
            <Modal.Header title="Модальное окно" />
            <Modal.Body>
                <Child />
            </Modal.Body>
            <Modal.Footer
                submitLabel="OK"
                submitHandler={action('submit-button-click')}
                cancelLabel="Cancel"
                cancelHandler={action('cancel-button-click')}
            />
        </Modal>
    );
};

export const WithDisabledButtons: React.FC = () => {
    return (
        <Modal isOpen={true}>
            <Modal.Header title="Модальное окно" />
            <Modal.Body>
                <Child />
            </Modal.Body>
            <Modal.Footer
                submitLabel="OK"
                submitHandler={action('submit-button-click')}
                submitDisabled={true}
                cancelLabel="Cancel"
                cancelHandler={action('cancel-button-click')}
                cancelDisabled={true}
            />
        </Modal>
    );
};
