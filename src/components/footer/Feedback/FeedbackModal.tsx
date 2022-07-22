import React, {FC, Fragment} from 'react';
import {observer, Observer} from 'mobx-react';
import {Formik, Form as FormikForm} from 'formik';
import * as Yup from 'yup';
import {FeedbackForm, FormValues} from './FeedbackForm';
import {Typography, IModalProps, Modal, Form, Button} from 'index';
import {FeedbackStore} from './FeedbackStore';

export enum FeedbackFields {
    role = 'role',
    name = 'name',
    email = 'email',
    phone = 'phone',
    subject = 'subject',
    message = 'message',
    fileUrl = 'fileUrl',
}

interface IFeedbackModalProps extends IModalProps {
    feedbackStore: FeedbackStore;
}

export const FeedbackModal: FC<IFeedbackModalProps> = observer(({isOpen, onClose, feedbackStore: store}) => {
    const initialValues: FormValues<FeedbackFields> = {
        // TODO: типизировать role
        role: 'Участник',
        name: store.user.name,
        email: store.user.email,
        phone: store.user.phone,
        subject: '',
        message: '',
        fileUrl: '',
    };

    const validationSchema = Yup.object().shape({
        role: Yup.string().required('Это обязательное поле'),
        name: Yup.string()
            .min(2, 'Слишком короткое имя')
            .matches(/^[A-ZА-ЯёЁ -]+$/i, {
                message: 'Имя содержит недопустимые символы',
            }),
        email: Yup.string().email('Неверный email'),
        // TODO: Сделать нормальную регулярку
        phone: Yup.string().matches(/\d.*\d{3}.*\d{3}.*\d{2}.*\d{2}/, {message: 'Это обязательное поле'}),
        subject: Yup.string().required('Это обязательное поле'),
        message: Yup.string().required('Это обязательное поле'),
    });

    const handleSubmit = (values: FormValues<FeedbackFields>) =>
        store.sendFeedback({
            ['fb_user_role']: values.role,
            ['fb_fromname']: values.name,
            ['fb_from']: values.email,
            ['fb_from_f']: values.phone,
            ['fb_subject']: values.subject,
            ['fb_message']: values.message,
            ['fb_ata']: values.fileUrl,
        });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Header closeHandler={onClose}>
                <Modal.Title>Есть вопросы?</Modal.Title>
                <Fragment>
                    <div className="lbrick" />
                    <Typography.Small responsive noPadding>
                        Напишите нам, и мы обязательно вам ответим. Много интересного уже есть в нашей{' '}
                        <a href="http://help.timepad.ru/">базе знаний</a>.
                    </Typography.Small>
                </Fragment>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnMount
                    onSubmit={handleSubmit}
                >
                    {({status, isValid}) => (
                        <FormikForm className="mform lflex--y-axis lflex">
                            <Form.Unit>
                                <FeedbackForm />
                                {store.response && (
                                    <Typography.Small responsive noPadding>
                                        {store.response}
                                    </Typography.Small>
                                )}
                            </Form.Unit>
                            <div className="lbrick" />
                            <Observer>
                                {() => (
                                    // TODO: найти способ иначе бороться с необзервностью
                                    // TODO: заменить на SubmitButton
                                    <Button
                                        type="submit"
                                        label={'Отправить вопрос'}
                                        // disabled={!!status || !isValid}
                                        // loading={store.loading}
                                    />
                                )}
                            </Observer>
                        </FormikForm>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
});
