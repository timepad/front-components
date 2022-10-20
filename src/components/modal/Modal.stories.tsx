import * as React from 'react';
import {action} from '@storybook/addon-actions';
import {Modal} from './Modal';
import {Meta} from '@storybook/react/types-6-0';
import '../../assets/css/bundle.less';
import {Button} from '../button';

export default {
    title: 'Modal',
    component: Modal,
} as Meta;

const Child: React.FC<React.PropsWithChildren<unknown>> = () => <div style={{width: '100px', height: '100px'}} />;

export const Basic: React.FC<React.PropsWithChildren<unknown>> = () => {
    return (
        <Modal isOpen={true}>
            <Modal.Header>
                <Modal.Title>Модальное окно</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Child />
            </Modal.Body>
        </Modal>
    );
};

export const WithDescription: React.FC<React.PropsWithChildren<unknown>> = () => {
    return (
        <Modal isOpen={true}>
            <Modal.Header>
                <Modal.Title>Модальное окно</Modal.Title>
                <Modal.Description>Описание заголовка</Modal.Description>
            </Modal.Header>
            <Modal.Body>
                <Child />
            </Modal.Body>
        </Modal>
    );
};

export const Closable: React.FC<React.PropsWithChildren<unknown>> = () => {
    return (
        <Modal isOpen={true} onClose={action('close-button-click')}>
            <Modal.Header closeHandler={action('close-button-click')}>
                <Modal.Title>Модальное окно</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Child />
            </Modal.Body>
        </Modal>
    );
};

export const WithBackButton: React.FC<React.PropsWithChildren<unknown>> = () => {
    return (
        <Modal isOpen={true}>
            <Modal.Header backHandler={action('back-button-click')}>
                <Modal.Title>Модальное окно</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Child />
            </Modal.Body>
        </Modal>
    );
};

export const WithBackAndCloseButton: React.FC<React.PropsWithChildren<unknown>> = () => {
    return (
        <Modal isOpen={true} onClose={action('close-button-click')}>
            <Modal.Header backHandler={action('back-button-click')} closeHandler={action('close-button-click')}>
                <Modal.Title>Модальное окно</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Child />
            </Modal.Body>
        </Modal>
    );
};

export const WithButtons: React.FC<React.PropsWithChildren<unknown>> = () => {
    return (
        <Modal isOpen={true}>
            <Modal.Header>
                <Modal.Title>Модальное окно</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Child />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={Button.variant.primary}
                    label="OK"
                    onClick={action('submit-button-click')}
                    fixed
                    large
                />
                <Button
                    variant={Button.variant.secondary}
                    label="Cancel"
                    onClick={action('cancel-button-click')}
                    fixed
                    large
                />
            </Modal.Footer>
        </Modal>
    );
};
