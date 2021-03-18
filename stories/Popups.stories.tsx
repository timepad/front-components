import React from 'react';
import StoryRouter from 'storybook-react-router';

// import {Provider} from 'mobx-react';
import {action} from '@storybook/addon-actions';
import {Modal} from '../src';
import {withKnobs} from '@storybook/addon-knobs';

const argTypes = {
    title: {
        type: {required: false},
        table: {
            type: {summary: 'string'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    description: {
        type: {required: false},
        table: {
            type: {summary: 'string'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    headerContent: {
        type: {required: false},
        table: {
            type: {summary: 'ReactNode'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    className: {
        type: {required: false},
        table: {
            type: {summary: 'string'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    overlayClassName: {
        type: {required: false},
        table: {
            type: {summary: 'string'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    isOpen: {
        type: {required: true},
        table: {
            type: {summary: 'boolean'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    blockCloseOnOutsideClick: {
        type: {required: false},
        table: {
            type: {summary: 'boolean'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    onRequestClose: {
        type: {required: false},
        table: {
            type: {summary: '() => void'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    backHandler: {
        type: {required: false},
        table: {
            type: {summary: '() => void'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    submitLabel: {
        type: {required: false},
        table: {
            type: {summary: 'string'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    submitHandler: {
        type: {required: false},
        table: {
            type: {summary: '() => void'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    submitDisabled: {
        type: {required: false},
        table: {
            type: {summary: 'boolean'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    cancelLabel: {
        type: {required: false},
        table: {
            type: {summary: 'string'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    cancelHandler: {
        type: {required: false},
        table: {
            type: {summary: '() => void'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
    cancelDisabled: {
        type: {required: false},
        table: {
            type: {summary: 'boolean'},
            defaultValue: {summary: 'null'},
        },
        control: {type: null},
    },
};

export default {
    title: 'Popups',
    decorators: [withKnobs, StoryRouter(undefined, {initialEntries: ['/event/2247535']})],
    argTypes,
};

const Child = () => <div style={{width: '100px', height: '100px'}} />;

export const Basic = (): React.ReactElement => {
    return (
        <Modal isOpen={true} title="Модальное окно">
            <Child />
        </Modal>
    );
};

export const WithDescription = (): React.ReactElement => {
    return (
        <Modal isOpen={true} title="Модальное окно" description="Описание заголовка">
            <Child />
        </Modal>
    );
};

export const Closable = (): React.ReactElement => {
    return (
        <Modal isOpen={true} title="Модальное окно" onRequestClose={action('close-button-click')}>
            <Child />
        </Modal>
    );
};

export const WithBackButton = (): React.ReactElement => {
    return (
        <Modal isOpen={true} title="Модальное окно" backHandler={action('back-button-click')}>
            <Child />
        </Modal>
    );
};

export const WithButtons = (): React.ReactElement => {
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

export const WithDisabledButtons = (): React.ReactElement => {
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
