import React, {FC, PropsWithChildren} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import './cform.less';
import {FormText} from '../Text';

export interface IFormProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>> {
    variant?: 'white';
}

export const Form: FC<IFormProps> & {
    Text: typeof FormText;
} = (props) => {
    const formClassName = cx(
        component('form')({
            white: props.variant === 'white',
        }),
        props.className,
    );

    return (
        <form {...props} className={formClassName}>
            {props.children}
        </form>
    );
};

Form.Text = FormText;
