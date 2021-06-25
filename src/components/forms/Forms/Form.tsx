import * as React from 'react';
import {PropsWithChildren} from 'react';
import cx from 'classnames';
import {Title} from './Title';
import {component} from '../../../services/helpers/classHelpers';
import {Footer} from './Footer';
import {Unit} from './Unit';
import {Label} from './Label';
import {Description} from './Description';
import {SubTitle} from './SubTitle';

export interface IFormProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>> {
    variant?: 'white';
}

const FormBase: React.FC<IFormProps> = ({children, className, variant, ...props}) => {
    const formClassName = cx(
        component('form')({
            white: variant === 'white',
        }),
        className,
    );
    return (
        <form className={formClassName} {...props}>
            {children}
        </form>
    );
};

const listChildren = {
    Title,
    Footer,
    Unit,
    Label,
    Description,
    SubTitle,
};

export const Form = Object.assign(FormBase, listChildren);
