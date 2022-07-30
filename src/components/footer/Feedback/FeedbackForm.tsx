import React, {FC} from 'react';
import {FeedbackFields} from './FeedbackModal';
import {Brick, Button, Form, Gap, Typography} from 'index';
import {Field, FieldProps, useFormikContext} from 'formik';
import {UploadInput} from './UploadInput/UploadInput';

type V = FormValues<FeedbackFields>;

export const FeedbackForm: FC = () => {
    const {setFieldValue, setStatus, errors, values, touched} = useFormikContext<V>();

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
                {({field: {value, name}}: FieldProps) => (
                    <>
                        <Typography.Small responsive className="t-color-gray-50">
                            Вы организуете события или ходите на них?
                        </Typography.Small>
                        <Brick size={0.5} />
                        <div className="lflex">
                            <Button
                                variant={value === 'Участник' ? Button.variant.primary : Button.variant.stroke}
                                label="Участник"
                                onClick={() => setFieldValue(name, 'Участник')}
                            />
                            <Gap size={0.5} />
                            <Button
                                variant={value === 'Организатор' ? Button.variant.primary : Button.variant.stroke}
                                label="Организатор"
                                onClick={() => setFieldValue(name, 'Организатор')}
                            />
                        </div>
                        <Brick size={0.5} />
                    </>
                )}
            </Field>
            {(Object.entries(fields) as [FeedbackFields, IFieldConfig][]).map(
                ([key, field]) =>
                    field &&
                    (field.type !== FieldType.upload ? (
                        <Form.TextLightField
                            error={errors[key] && touched[key] ? errors[key] : undefined}
                            success={!errors[key] && !!values[key] && field.type !== FieldType.bigtext}
                            name={key}
                            type={field.type}
                            placeholder={field.label}
                            multiline={field.type === FieldType.bigtext}
                        />
                    ) : (
                        <UploadInput name={key} label={field.label} setStatus={setStatus} onChange={setFieldValue} />
                    )),
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
