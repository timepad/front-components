import React, {FC} from 'react';
import {FeedbackFields} from './FeedbackModal';
import {Button, Form, Typography} from 'index';
import {Field, useFormikContext} from 'formik';

type V = FormValues<FeedbackFields>;

export const FeedbackForm: FC = () => {
    const {setFieldValue, errors, values} = useFormikContext<V>();

    const fields: IFields<V> = {
        [FeedbackFields.role]: null,
        [FeedbackFields.name]: {
            label: 'Ваше имя',
            type: FieldType.text,
        },
        [FeedbackFields.email]: {
            label: 'Ваш email',
            type: FieldType.text,
        },
        [FeedbackFields.phone]: {
            label: 'Ваш телефон',
            type: FieldType.phone,
        },
        [FeedbackFields.subject]: {
            label: 'Тема',
            type: FieldType.text,
        },
        [FeedbackFields.message]: {
            label: 'Текст вопроса',
            type: FieldType.bigtext,
        },
        [FeedbackFields.fileUrl]: {
            label: 'Файл',
            type: FieldType.upload,
        },
    };

    return (
        <>
            <Field key={FeedbackFields.role} name={FeedbackFields.role}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*@ts-ignore*/}
                {({field: {name, value}}) => (
                    <>
                        <Typography.Small responsive className="t-color-gray-50">
                            Вы организуете события или ходите на них?
                        </Typography.Small>
                        <div className="lbrick-0-5" />
                        <div className="lflex">
                            <Button
                                variant={value === 'Участник' ? Button.variant.primary : Button.variant.stroke}
                                label="Участник"
                                onClick={() => setFieldValue(name, 'Участник')}
                            />
                            <div className="lgap-0-5" />
                            <Button
                                variant={value === 'Организатор' ? Button.variant.primary : Button.variant.stroke}
                                label="Организатор"
                                onClick={() => setFieldValue(name, 'Организатор')}
                            />
                        </div>
                        <div className="lbrick-0-5" />
                    </>
                )}
            </Field>
            {(Object.entries(fields) as [FeedbackFields, IFieldConfig][]).map(
                ([key, field]) =>
                    field && (
                        <Form.TextLightField
                            success={!errors[key] && !!values[key]}
                            name={key}
                            type={field.type}
                            placeholder={field.label}
                            multiline={field.type === FieldType.bigtext}
                        />

                        // <FormFieldWithContext key={key} field={key}>
                        //     {({name, value, touched, error, setHideError}) => (
                        //         <AdaptiveInput
                        //             name={name}
                        //             label={field?.label}
                        //             type={field?.type}
                        //             tag={field?.tag}
                        //             value={value}
                        //             touched={touched}
                        //             error={error}
                        //             onErrorTruncation={(truncated) => setHideError(!truncated)}
                        //             {...mutators}
                        //         />
                        //     )}
                        // </FormFieldWithContext>
                    ),
            )}
        </>
    );
};

// TODO: вынести типы

export type FormValues<V extends string> = {
    [key in V]: string;
};

type IFields<V> = {
    [K in keyof V]: IFieldConfig | null;
};

interface IFieldConfig {
    label?: string;
    type?: FieldType;
}

export enum FieldType {
    text = 'text',
    bigtext = 'bigtext',
    phone = 'phone',
    radio = 'radio',
    multivar = 'multivar',
    upload = 'upload',
}
