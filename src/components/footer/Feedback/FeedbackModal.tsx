import React, {FC, Fragment, useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Formik, Form as FormikForm} from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import {FeedbackForm, FormValues} from './FeedbackForm';
import {Typography, IModalProps, Modal, Form, SubmitButton, Brick} from 'index';
import {FeedbackStore} from './FeedbackStore';
import {FormikHelpers} from 'formik/dist/types';

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
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(store.sendingForm);
    }, [store.sendingForm]);

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
            })
            .required('Это обязательное поле'),
        email: Yup.string().email('Неверный email').required('Это обязательное поле'),
        // TODO: Сделать нормальную регулярку
        phone: Yup.string().phone('RU', 'Неверный формат номера').required('Это обязательное поле'),
        subject: Yup.string().required('Это обязательное поле'),
        message: Yup.string().required('Это обязательное поле'),
    });

    const handleSubmit = async (
        values: FormValues<FeedbackFields>,
        {validateForm}: FormikHelpers<FormValues<FeedbackFields>>,
    ) => {
        const errors = await validateForm(values);
        // console.log('errors', errors);
        // console.log('Object.keys(errors)', Object.keys(errors));
        if (Object.keys(errors).length === 0) {
            store.sendFeedback({
                ['fb_user_role']: values.role,
                ['fb_fromname']: values.name,
                ['fb_from']: values.email,
                ['fb_from_f']: values.phone,
                ['fb_subject']: values.subject,
                ['fb_message']: values.message,
                ['fb_ata']: values.fileUrl,
            });
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Header closeHandler={onClose}>
                <Modal.Title>Есть вопросы?</Modal.Title>
                <Fragment>
                    <Brick />
                    <Typography.Small responsive noPadding>
                        Напишите нам, и мы обязательно вам ответим. Много интересного уже есть в нашей{' '}
                        <a className="cfooter__link" href="http://help.timepad.ru/">
                            базе знаний
                        </a>
                        .
                    </Typography.Small>
                </Fragment>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={true}
                    onSubmit={handleSubmit}
                >
                    {({status, isValid}) => (
                        <FormikForm className="lflex--y-axis lflex" style={{padding: '8px'}}>
                            <Form.Unit>
                                <FeedbackForm />
                                {store.response && (
                                    <Typography.Small responsive noPadding>
                                        {store.response}
                                    </Typography.Small>
                                )}
                                {store.error && (
                                    <Typography variant="small" className="cform__error-block">
                                        {store.error.toString()}
                                    </Typography>
                                )}
                            </Form.Unit>
                            <Brick />
                            <SubmitButton
                                type="submit"
                                label={'Отправить вопрос'}
                                disabled={!!status || !isValid}
                                loading={isLoading}
                            />
                        </FormikForm>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
});
